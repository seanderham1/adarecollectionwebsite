#!/bin/bash

# Image compression script using ffmpeg
# Usage: ./compress_images.sh /path/to/image/directory

if [ $# -eq 0 ]; then
    echo "Usage: $0 /path/to/image/directory"
    echo "Example: $0 '/Users/seanderham/Downloads/Web pics house 1'"
    exit 1
fi

IMAGE_DIR="$1"

if [ ! -d "$IMAGE_DIR" ]; then
    echo "Error: Directory '$IMAGE_DIR' does not exist"
    exit 1
fi

# Create backup directory
BACKUP_DIR="${IMAGE_DIR}_backup"
echo "Creating backup in: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Create compressed directory
COMPRESSED_DIR="${IMAGE_DIR}_compressed"
echo "Creating compressed directory: $COMPRESSED_DIR"
mkdir -p "$COMPRESSED_DIR"

# Function to compress image
compress_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local extension="${filename##*.}"
    local output_file="$COMPRESSED_DIR/${name}_compressed.${extension}"
    
    echo "Compressing: $filename"
    
    # Copy original to backup
    cp "$input_file" "$BACKUP_DIR/"
    
    # Compress based on file type
    case "${extension,,}" in
        jpg|jpeg)
            ffmpeg -i "$input_file" -q:v 2 -qmin 2 -qmax 2 -c:v mjpeg "$output_file" -y
            ;;
        png)
            ffmpeg -i "$input_file" -c:v png -compression_level 6 "$output_file" -y
            ;;
        webp)
            ffmpeg -i "$input_file" -c:v libwebp -quality 80 "$output_file" -y
            ;;
        *)
            echo "Unsupported format: $extension"
            cp "$input_file" "$COMPRESSED_DIR/"
            ;;
    esac
    
    # Show compression results
    if [ -f "$output_file" ]; then
        original_size=$(stat -f%z "$input_file")
        compressed_size=$(stat -f%z "$output_file")
        reduction=$(( (original_size - compressed_size) * 100 / original_size ))
        echo "  Original: $(numfmt --to=iec $original_size)"
        echo "  Compressed: $(numfmt --to=iec $compressed_size)"
        echo "  Reduction: ${reduction}%"
    fi
    echo ""
}

# Process all image files
echo "Starting image compression..."
echo "=================================="

# Find and process all image files
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r file; do
    compress_image "$file"
done

echo "=================================="
echo "Compression complete!"
echo ""
echo "Original files backed up to: $BACKUP_DIR"
echo "Compressed files saved to: $COMPRESSED_DIR"
echo ""
echo "To replace originals with compressed versions:"
echo "mv '$COMPRESSED_DIR'/* '$IMAGE_DIR'/"

# Show summary
echo ""
echo "Summary:"
echo "Total files processed: $(find "$COMPRESSED_DIR" -type f | wc -l)"
echo "Total original size: $(du -sh "$BACKUP_DIR" | cut -f1)"
echo "Total compressed size: $(du -sh "$COMPRESSED_DIR" | cut -f1)"
