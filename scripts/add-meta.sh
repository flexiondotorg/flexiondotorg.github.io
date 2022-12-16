#!/usr/bin/env bash
# Add metadata required by Freelancer theme to the posts

POSTS_IN="${HOME}/Websites/wimpress.com/content/posts"

for DIR in $(ls -1 "${POSTS_IN}/"); do
    POST="${POSTS_IN}/${DIR}/index.md"

    # Only add metadata if it doesn't exist
    if ! grep -q ^hero "${POST}"; then
        echo "Processing ${POST}"
        sed -i '/summary:/a hero: hero.png' "${POST}"
        sed -i '/summary:/a images: hero.png' "${POST}"
        sed -i '/summary:/a sidebar: true' "${POST}"
    fi
done
