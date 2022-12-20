---
title: Migrating Bazaar to Git
aliases: /posts/2012-10-migrating-bzr-to-git
date: 2012-10-23 11:50:00
tags: [ Bazaar,Git,GitHub ]
summary: A rough guide to migrating Bazaar repositories to GitHub
sidebar: true
images: hero.webp
hero: hero.webp
---

We have been using [Bazaar](http://bazaar.canonical.com) for source
control at [work](http://www.flightdataservices.com) for nearly five
years. We are about to [Open Source](http://opensource.org) most of our
core technologies and decided that [GitHub](https://github.com) is the
best way to encourage community participation. We have signed up for a
Silver plan at GitHub and will migrate all our Bazaar repositories to Git.

I have a few personal projects in Bazaar repositories hosted on
[Launchpad](http://www.launchpad.net). I decided to migrate my projects
to GitHub in order to learn the migration process. What follows is an
overview of how I did it using a fresh virtual machine running Ubuntu 10.04
LTS Server. I used a little project of mine called `nullserv` in the
examples below.

Add the Bazaar and Git PPAs.

```bash
sudo apt-get install python-software-properties
sudo apt-add-repository ppa:bzr/ppa
sudo apt-add-repository ppa:git-core/ppa
sudo apt-get update
```

Install `bzr` (and its requirements), `curl` and `git`.

```bash
sudo apt-get install bzr bzr-fastimport curl git python-paramiko
```

Add the SSH keys and identify yourself.

```bash
bzr whoami "Your Name <name@example.org>"
git config --global user.name "Your Name"
git config --global user.email you@example.org
```

If your Bazaar repository is hosted on Launchpad assert your
identity.

```bash
bzr launchpad-login flexiondotorg
```

Branch the Bazaar repository.

```bash
bzr branch lp:~flexiondotorg/+junk/nullserv
cd nullserv
git init
bzr fast-export --plain `pwd` | git fast-import
```

**This step is optional. It will delete and commit the deletions to the Bazaar repository.**

```bash
for FILE in *; do rm -rfv "${FILE}"; done
echo "This repository has been migrated to Git. https://github.com/flexiondotorg/nullserv" > README
bzr add README
bzr commit -m "This repository has been migrated to Git. https://github.com/flexiondotorg/nullserv"
bzr push :parent
```

Remove the Bazaar repository and reset the Git repository.

```bash
rm -rf .bzr README
git reset HEAD
```

Create `.gitattributes` to normalise line endings.

```bash
cat >.gitattributes<<ENDGITATTRIBS
# Normalise line endings:
* text=auto

# Prevent certain files from being exported:
.gitattributes  export-ignore
.gitignore      export-ignore
ENDGITATTRIBS

git add .gitattributes
```

Migrate `.bzrignore` to `.gitignore`.

```bash
git mv .bzrignore .gitignore
echo                             >> .gitignore
echo "# Keep empty directories:" >> .gitignore
echo "!*/.git*"                  >> .gitignore
```

Ensure empty directories are retained by git.

```bash
find -empty -type d -not -iwholename '*.git*' -exec touch '{}/.gitkeep' ";"
git add **/.gitkeep
```

Commit the migrated repository

```bash
git commit -a -m "Migrated from Bazaar to Git."
```

Thanks to Chris for pointing out `git filter-branch` in the comments. If you
need to modify the author info in your repository history, you can do so with
this, just replace the names and email addresses accordingly.

**BEWARE! This should not be performed on a repo that has been shared with others.
Use at your own risk.**

```bash
git filter-branch --commit-filter '
    if [ "$GIT_COMMITTER_NAME" = "Fred" ]; then
        GIT_COMMITTER_NAME="Fred Flintstone";
        GIT_AUTHOR_NAME="Fred Flintstone";
        GIT_COMMITTER_EMAIL="fred@example.org";
        GIT_AUTHOR_EMAIL="fred@example.org";
        git commit-tree "$@";
    elif [ "$GIT_COMMITTER_NAME" = "Barney" ]; then
        GIT_COMMITTER_NAME="Barney Rubble";
        GIT_AUTHOR_NAME="Barney Rubble";
        GIT_COMMITTER_EMAIL="barney@example.org";
        GIT_AUTHOR_EMAIL="barney@example.org";
        git commit-tree "$@";
    else
        git commit-tree "$@";
    fi' HEAD
```

If you want to delete any files from the commit history, you can optionally do that now.

```bash
git filter-branch -f --index-filter "git rm --cached --ignore-unmatch *.THIS *.THAT" \
--prune-empty --tag-name-filter cat -- --all
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
```

Resume here, regardless of whether you deleted any files from the commit history or not.
Remove everything from the index.

```bash
git rm --cached -r .
```

Write both the index and working directory from git's database.

```bash
git reset --hard
```

Prepare to make a commit by staging all the files that will get normalized.
This is your chance to inspect which files were never normalized. You may
get lots of messages like: `warning: CRLF will be replaced by LF in file.`

```bash
git add .
git commit -m "Forced line endings to eol=lf"
```

Aggressively pack the repository.

```bash
git gc --aggressive --prune=now
```

At this point you have a migrated git repository. You can poke about a check that
everything is present and correct.

Optionally you can create a new GitHub repository using their API. Replace `USER`
and `PASS` with your GitHub login crednetials.

```bash
curl -u 'USER:PASS' https://api.github.com/user/repos -d '{"name":"nullserv"}'
```

If you want to create repositories for an Organisation the following will
work. Replace `YourOrganisation` with the organisation name your are a
member of.

```bash
curl -u 'USER:PASS' https://api.github.com/orgs/YourOrganisation/repos -d '{"name":"nullserv"}'
```

Private repositories can be created, providing you have a paid GitHub account,
by changing the `POST` data as follows.

```json
'{"name":"nullserv","private":"true"}'
```

Lastly, push to the newly created GitHub repo.

```bash
git remote add origin git@github.com:flexiondotorg/nullserv.git
git push -u origin master
```

All done, the Bazaar repository has been crippled and the Git repository is
ready for use on GitHub.

#### References
* <https://gist.github.com/624941>
* <http://stackoverflow.com/questions/2423777/is-it-possible-to-create-a-remote-repo-on-github-from-the-cli-without-ssh>
* <http://stackoverflow.com/questions/750172/how-do-i-change-the-author-of-a-commit-in-git>
* <https://help.github.com/articles/changing-author-info>
* <http://developer.github.com/v3/repos/>
* <https://help.github.com/articles/dealing-with-line-endings#platform-all>
