#!/usr/bin/env bash
# Create a hero image

if [ -n "${1}" ]; then
    POST="${1}"
    if [ -f "${POST}" ]; then
        DIR=$(dirname "${POST}")
        # Does DIR have projects or posts in it?
        TYPE=$(echo "${DIR}" | awk -F'/' '{print $(NF-1)}')
        TITLE=$(grep "^title:" "${POST}" | cut -d':' -f2 | tr -d '"' | awk '{$1=$1};1')
        echo " - ${TITLE} in ${DIR} (${TYPE})"

        # Do not reprocess if the hero image already exists
        if [ -e "${DIR}/hero.webp" ]; then
            echo " - Found hero.webp image already exists"
            exit 0
        fi

        if [ -e "${DIR}/hero.png" ] && [ ! -e "${DIR}/hero.webp" ]; then
            echo " - Found hero.png. Creating hero.webp image"
            convert "${DIR}/hero.png" "${DIR}/hero.webp"
            exit 0
        fi
    fi
else
    echo "Usage: $(basename "${0}") <path-to-post>"
    exit 1
fi

COLORS=("#F95935" "#FFC300" "#6BB345" "#7FCAB6" "#297FB8" "#333B48" "#5A3992" "#571845" "#930A3E" "#C70039")
COLOR=${COLORS[ ${RANDOM} % ${#COLORS[@]} ]}

convert -size 1920x1080 xc:"${COLOR}" "/tmp/background.png"

case "${TYPE}" in
    posts)
        convert -size 1800x1000 -background transparent -pointsize 180 -gravity center -fill white -stroke black -strokewidth 8 -font /usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf caption:"${TITLE}" -trim "/tmp/text.png"

        if [ -f "${DIR}/icon.png" ]; then
            convert -resize 720x720^ -background "${COLOR}" -blur 0x8 "${DIR}/icon.png" "/tmp/icon.png"
            composite -gravity center "/tmp/icon.png" "/tmp/background.png" "/tmp/background-icon.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-icon.png" "${DIR}/hero.webp"
        else
            convert -size 1800x1000 -background transparent -pointsize 180 -gravity center -fill white -stroke black -strokewidth 8 -font /usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf caption:"${TITLE}" -trim -blur 0x8 "/tmp/text-blur.png"
            composite -gravity center "/tmp/text-blur.png" "/tmp/background.png" "/tmp/background-text.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-text.png" "${DIR}/hero.webp"
        fi
        ;;
    projects)
        if [ -f "${DIR}/icon.png" ]; then
            convert -resize 720x720^ -background "${COLOR}" "${DIR}/icon.png" "/tmp/icon.png"
            composite -gravity center "/tmp/icon.png" "/tmp/background.png" "${DIR}/hero.webp"
        else
            convert -size 1800x1000 -background transparent -pointsize 180 -gravity center -fill white -stroke black -strokewidth 8 -font /usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf caption:"${TITLE}" -trim "/tmp/text.png"
            convert -size 1800x1000 -background transparent -pointsize 180 -gravity center -fill white -stroke black -strokewidth 8 -font /usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf caption:"${TITLE}" -trim -blur 0x8 "/tmp/text-blur.png"
            composite -gravity center "/tmp/text-blur.png" "/tmp/background.png" "/tmp/background-text.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-text.png" "${DIR}/hero.webp"
        fi
        ;;
    *)
        echo "Unknown type: ${TYPE}"
        exit 1
        ;;
esac

rm "/tmp/background*.png" 2>/dev/null
rm "/tmp/text*.png"  2>/dev/null
rm "/tmp/icon.png"  2>/dev/null
