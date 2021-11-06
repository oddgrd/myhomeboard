#!/bin/bash

#In the folder of your svg image
for x in 72 96 120 128 144 152 192 384 512
do inkscape --export-type="png" -o logo${x}.png -w ${x} -h ${x} Logo-simple.svg
done

#Print json for PWA manifest.json
for x in 72 96 120 128 144 152 192 384 512
do echo "{\"src\": \"/icons/logo${x}.png\", \"sizes\": \"${x}x${x}\", \"type\": \"image/png\"},"
done
