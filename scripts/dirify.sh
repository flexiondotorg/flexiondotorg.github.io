#!/usr/bin/env bash
# Convert single markdown files to directories

POSTS_IN="${HOME}/Websites/wimpress.com/content/posts"

for MD in "${POSTS_IN}/"*.md; do
    echo "Processing ${MD}"
    BASE=$(basename "${MD}" .md)

    # Create the directory
    mkdir -p "${POSTS_IN}/${BASE}"
    mv "${MD}" "${POSTS_IN}/${BASE}/index.md"
done
