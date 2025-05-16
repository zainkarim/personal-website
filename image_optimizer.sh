#!/bin/bash

# Base directories
ART_DIR="art"
OUTPUT_DIR="output"

# Iterate over all project folders within the art directory
for project in "$ART_DIR"/*; do
    # Skip if not a directory
    [ -d "$project" ] || continue
    
    # Define input and output directories for each project
    INPUT_DIR="$project/originals"
    PROJECT_NAME=$(basename "$project")
    THUMB_DIR="$project/$OUTPUT_DIR/thumbnails"
    MEDIUM_DIR="$project/$OUTPUT_DIR/medium"
    LARGE_DIR="$project/$OUTPUT_DIR/large"

    # Create output directories if they don't exist
    mkdir -p "$THUMB_DIR" "$MEDIUM_DIR" "$LARGE_DIR"

    # Function to process images
    process_image() {
        local file="$1"
        local filename=$(basename "$file")
        local name="${filename%.*}"
        local ext="${filename##*.}"

        echo "Processing: $filename in project: $PROJECT_NAME"

        # Thumbnail: max 400px on longest side
        magick "$file" -resize 400x400\> -quality 85 "$THUMB_DIR/${name}_thumb.jpg"
        magick "$file" -resize 400x400\> -quality 85 "$THUMB_DIR/${name}_thumb.webp"

        # Medium: max 1200px on longest side
        magick "$file" -resize 1200x1200\> -quality 85 "$MEDIUM_DIR/${name}_medium.jpg"
        magick "$file" -resize 1200x1200\> -quality 85 "$MEDIUM_DIR/${name}_medium.webp"

        # Large: max 1600px on longest side
        magick "$file" -resize 1600x1600\> -quality 85 "$LARGE_DIR/${name}_large.jpg"
        magick "$file" -resize 1600x1600\> -quality 85 "$LARGE_DIR/${name}_large.webp"

        echo "Completed: $filename for project: $PROJECT_NAME"
    }

    # Process each image in the input directory
    for ext in jpg jpeg png; do
        for file in "$INPUT_DIR"/*.$ext; do
            [ -e "$file" ] || continue
            process_image "$file"
        done
    done
done

echo "All image processing complete!"
