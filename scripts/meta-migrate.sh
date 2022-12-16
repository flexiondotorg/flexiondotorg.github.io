#!/usr/bin/env bash

POSTS_IN="${HOME}/Websites/flexion.org/posts"
POSTS_OUT="${HOME}/Websites/wimpress.com/content/posts"

for META in "${POSTS_IN}/"*.meta; do
    echo "Processing ${META}"
    BASE=$(basename "${META}" .meta)

    echo "---"                    > "${POSTS_OUT}/${BASE}.md"
    cat "${META}"                >> "${POSTS_OUT}/${BASE}.md"
    echo "---"                   >> "${POSTS_OUT}/${BASE}.md"
    echo ""                      >> "${POSTS_OUT}/${BASE}.md"
    cat "${POSTS_IN}/${BASE}.md" >> "${POSTS_OUT}/${BASE}.md"

    sed -i 's|^\.\. ||' "${POSTS_OUT}/${BASE}.md"
    sed -i 's|^slug: |aliases: /posts/|' "${POSTS_OUT}/${BASE}.md"
    sed -i 's|^tags: |tags: [|' "${POSTS_OUT}/${BASE}.md"
    sed -i '/^tags:/ s/$/ ]/' "${POSTS_OUT}/${BASE}.md"
    sed -i 's|^link:|#link:|' "${POSTS_OUT}/${BASE}.md"
    sed -i 's|^description:|#summary:|' "${POSTS_OUT}/${BASE}.md"


    head -n 15 "${POSTS_OUT}/${BASE}.md"
done
