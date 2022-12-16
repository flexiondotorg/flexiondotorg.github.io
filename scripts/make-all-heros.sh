#!/usr/bin/env bash
# Create hero images for all posts

POSTS_IN="${HOME}/Websites/wimpress.com/content/posts"

for INDEX in "${POSTS_IN}"/*/index.md; do
    echo "Processing ${INDEX}"
    scripts/make-hero.sh "${INDEX}"
done
