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

#blue: #0d6efd;
#indigo: #6610f2;
#purple: #6f42c1;
#pink: #d63384;
#red: #dc3545;
#orange: #fd7e14;
#yellow: #ffc107;
#green: #198754;
#teal: #1abc9c;
#cyan: #0dcaf0;
#gray: #6c757d;
#gray-dark: #343a40;

COLORS=("#0d6efd" "#6610f2" "#6f42c1" "#d63384" "#dc3545" "#fd7e14" "#ffc107" "#198754" "#1abc9c" "#0dcaf0" "#6c757d" "#343a40")
COLOR=${COLORS[ ${RANDOM} % ${#COLORS[@]} ]}

LARGE_X=1280
LARGE_Y=720
FRAME_X=$(( LARGE_X - (LARGE_X / 16) ))
FRAME_Y=$(( LARGE_Y - (LARGE_Y / 16) ))
SMALL_X=$((LARGE_X / 3)) #426
SMALL_Y=$((LARGE_Y / 3)) #240
ICON_SIZE=$(( LARGE_Y - (LARGE_Y / 3) ))
POINT_SIZE=$((LARGE_X / 12))
STROKE_WIDTH=4
FONT="Lato-Black"

convert -size ${LARGE_X}x${LARGE_Y} xc:"${COLOR}" "/tmp/background.png"

case "${TYPE}" in
    posts)
        convert -size ${FRAME_X}x${FRAME_Y} -background transparent -pointsize ${POINT_SIZE} -gravity center -fill white -stroke black -strokewidth ${STROKE_WIDTH} -font "${FONT}" caption:"${TITLE}" -trim "/tmp/text.png"
        if [ -f "${DIR}/icon.png" ]; then
            convert -resize ${ICON_SIZE}x${ICON_SIZE}^ -background "${COLOR}" -blur 0x8 "${DIR}/icon.png" "/tmp/icon.png"
            composite -gravity center "/tmp/icon.png" "/tmp/background.png" "/tmp/background-icon.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-icon.png" "${DIR}/hero.webp"
        else
            convert -size ${FRAME_X}x${FRAME_Y} -background transparent -pointsize ${POINT_SIZE} -gravity center -fill white -stroke black -strokewidth ${STROKE_WIDTH} -font "${FONT}" caption:"${TITLE}" -trim -blur 0x8 "/tmp/text-blur.png"
            composite -gravity center "/tmp/text-blur.png" "/tmp/background.png" "/tmp/background-text.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-text.png" "${DIR}/hero.webp"
        fi
        convert -resize ${SMALL_X}x${SMALL_Y} "${DIR}/hero.webp" "${DIR}/small-hero.webp"
        ;;
    projects)
        if [ -f "${DIR}/icon.png" ]; then
            convert -resize ${ICON_SIZE}x${ICON_SIZE}^ -background "${COLOR}" "${DIR}/icon.png" "/tmp/icon.png"
            composite -gravity center "/tmp/icon.png" "/tmp/background.png" "${DIR}/hero.webp"
        else
            convert -size ${FRAME_X}x${FRAME_Y} -background transparent -pointsize ${POINT_SIZE} -gravity center -fill white -stroke black -strokewidth ${STROKE_WIDTH} -font "${FONT}" caption:"${TITLE}" -trim "/tmp/text.png"
            convert -size ${FRAME_X}x${FRAME_Y} -background transparent -pointsize ${POINT_SIZE} -gravity center -fill white -stroke black -strokewidth ${STROKE_WIDTH} -font "${FONT}" caption:"${TITLE}" -trim -blur 0x8 "/tmp/text-blur.png"
            composite -gravity center "/tmp/text-blur.png" "/tmp/background.png" "/tmp/background-text.png"
            composite -gravity center "/tmp/text.png" "/tmp/background-text.png" "${DIR}/hero.webp"
        fi
        convert -resize ${SMALL_X}x${SMALL_Y} "${DIR}/hero.webp" "${DIR}/small-hero.webp"
        ;;
    *)
        echo "Unknown type: ${TYPE}"
        exit 1
        ;;
esac

rm "/tmp/background*.png" 2>/dev/null
rm "/tmp/text*.png"  2>/dev/null
rm "/tmp/icon.png"  2>/dev/null
