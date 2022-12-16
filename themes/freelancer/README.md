# Bootstrap Freelancer Hugo Theme

<div align="center"> 

[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/joseph-mccarthy_hugo-bootstrap-freelancer-template?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/project/overview?id=joseph-mccarthy_hugo-bootstrap-freelancer-template)
[![GitHub](https://img.shields.io/github/license/joseph-mccarthy/hugo-bootstrap-freelancer-template?style=for-the-badge)](https://github.com/joseph-mccarthy/hugo-bootstrap-freelancer-template/blob/main/LICENSE)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/joseph-mccarthy/hugo-bootstrap-freelancer-template?color=green&style=for-the-badge)](https://github.com/joseph-mccarthy/hugo-bootstrap-freelancer-template/releases/latest)
[![wakatime](https://wakatime.com/badge/github/joseph-mccarthy/hugo-bootstrap-freelancer-template.svg?style=for-the-badge)](https://wakatime.com/badge/github/joseph-mccarthy/hugo-bootstrap-freelancer-template)

</div>

## Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

---

## Description

This repository contains a [Hugo](https://github.com/gohugoio) theme that is based on the [Bootstrap](https://getbootstrap.com/) Freelancer template. I created this Hugo theme as I have always liked the [Freelancer](https://github.com/StartBootstrap/startbootstrap-freelancer) Bootstrap template, and my preference for Hugo for static site generation made it a no brainer to me. As the origional Freelancer theme was a single page template, I have used some creative licence when it comes to the post listing pages, and content pages. If you have any suggestions on how it can be made better, please commit. You can see an example site running it, like I said [my own site is using.](https://joseph-mccarthy.github.io/)

## Technologies

- [Hugo](https://github.com/gohugoio)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Forms](https://startbootstrap.com/solution/contact-forms)

[Back To The Top](#bootstrap-freelancer-hugo-theme)

---

## How To Use

---
You can use this theme like you would with any Hugo theme. The generally accepted way of using themes is to install them as a git sub module so you're able to keep them upto date with the theme repository.

```console
# inside your hugo directory clone this repository as a sub module
git submodule add https://github.com/joseph-mccarthy/hugo-bootstrap-freelancer-template themes/freelancer
# update your config to use new themem
echo theme = \"freelancer\" >> config.toml
```

This theme also comes with it's own default content type, and should be used also along with the idea of bundles. Here is an example command on how to use the default content type

```console
hugo new --kind default posts/my-post
```

This content type has some font matter that you'll be able to make use of as it's using bundles. There is a field named "hero" which would be the path to the banner image of the post, this image is also used in the post listing pages. The "sidebar" field states if to show the post as full width or with the meta sidebar which will show related posts and last 5 publised posts.

There are also some extra paramters that should be added to your config.toml in order to use the theme to it's full.

```toml
[params]
  tagLine = "Graphic Artist - Web Designer - Illustrator"
  homePosts = 3
  homeProjects = 3

  aboutLeft = "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization."
  aboutRight = "You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!"

[params.location]
  lineOne = "2215 John Daniel Drive"
  lineTwo = "Clark, MO 65243" 

[params.sbform]
      token = ""

[params.homebutton]
  text = "Free Donwload"
  link = "https://startbootstrap.com/theme/freelancer/" 
  icon = "fa-download"

[related]
  includeNewer = true
  threshold = 80
  toLower = false
[[related.indices]]
  name = 'tags'
  weight = 100
[[related.indices]]
  name = 'date'
  weight = 10
```

There are also some assumptions made on the content structure for this theme. I have created this with the idea of two areas __posts__ and __projects__ which will drive the menu, home page and content listing areas.

## References

- [Hugo](https://github.com/gohugoio)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Freelancer](https://github.com/StartBootstrap/startbootstrap-freelancer)
- [Bootstrap Forms](https://startbootstrap.com/solution/contact-forms)

[Back To The Top](#bootstrap-freelancer-hugo-theme)

---

## License

Copyright (c) 2022 Joseph McCarthy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

[Back To The Top](#bootstrap-freelancer-hugo-theme)

---

## Author Info

- [GitHub](https://github.com/joseph-mccarthy)
- [Website](https://joseph-mccarthy.github.io/)

[Back To The Top](#bootstrap-freelancer-hugo-theme)
