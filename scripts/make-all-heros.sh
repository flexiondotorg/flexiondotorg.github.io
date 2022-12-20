#!/usr/bin/env bash
# Create hero images for all posts

for INDEX in "${HOME}/Websites/flexiondotorg.github.io/content/posts"/*/index.md; do
    echo "Processing ${INDEX}"
    scripts/make-hero.sh "${INDEX}"
done

for INDEX in "${HOME}/Websites/flexiondotorg.github.io/content/projects"/*/index.md; do
    echo "Processing ${INDEX}"
    scripts/make-hero.sh "${INDEX}"
done
