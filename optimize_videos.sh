#!/bin/bash

# Video optimization script for web
# This script compresses videos to be web-friendly while maintaining good quality

echo "Starting video optimization..."

# Create optimized directory
mkdir -p client/public/videos/optimized

# Function to optimize a video
optimize_video() {
    local input_file="$1"
    local output_file="$2"
    local quality="$3"
    
    echo "Optimizing: $input_file -> $output_file"
    
    # Use ffmpeg to compress the video
    # -c:v libx264: Use H.264 codec
    # -crf 28: Constant Rate Factor (lower = better quality, higher = smaller file)
    # -preset slow: Better compression efficiency
    # -c:a aac: Use AAC audio codec
    # -b:a 128k: Audio bitrate
    # -movflags +faststart: Enable fast start for web streaming
    # -vf scale: Scale video to max 1920x1080 if larger
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -crf "$quality" \
        -preset slow \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -vf "scale=min(1920\,iw):min(1080\,ih):force_original_aspect_ratio=decrease" \
        -y \
        "$output_file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully optimized: $output_file"
        # Show file sizes
        original_size=$(du -h "$input_file" | cut -f1)
        new_size=$(du -h "$output_file" | cut -f1)
        echo "   Original: $original_size -> Optimized: $new_size"
    else
        echo "❌ Failed to optimize: $input_file"
    fi
}

# Optimize main videos (use higher quality for main videos)
echo "Optimizing main videos..."
optimize_video "client/public/videos/puttersway.mp4" "client/public/videos/optimized/puttersway.mp4" "26"
optimize_video "client/public/videos/thecaptains.mp4" "client/public/videos/optimized/thecaptains.mp4" "26"
optimize_video "client/public/videos/thefairways.mp4" "client/public/videos/optimized/thefairways.mp4" "26"
optimize_video "client/public/videos/rangeview.mp4" "client/public/videos/optimized/rangeview.mp4" "26"
optimize_video "client/public/videos/cragleighhouse.mp4" "client/public/videos/optimized/cragleighhouse.mp4" "26"

# Optimize backup videos (use lower quality since they're backups)
echo "Optimizing backup videos..."
optimize_video "client/public/videos/backup/puttersway.mp4" "client/public/videos/optimized/puttersway_backup.mp4" "30"
optimize_video "client/public/videos/backup/thecaptains.mp4" "client/public/videos/optimized/thecaptains_backup.mp4" "30"
optimize_video "client/public/videos/backup/thefairways.mp4" "client/public/videos/optimized/thefairways_backup.mp4" "30"
optimize_video "client/public/videos/backup/rangeview.mp4" "client/public/videos/optimized/rangeview_backup.mp4" "30"
optimize_video "client/public/videos/backup/cragleighhouse.mp4" "client/public/videos/optimized/cragleighhouse_backup.mp4" "30"

echo "Video optimization complete!"
echo "Optimized videos are in: client/public/videos/optimized/"

# Show total size comparison
echo ""
echo "Size comparison:"
echo "Original videos total size:"
du -sh client/public/videos/*.mp4 client/public/videos/backup/*.mp4 2>/dev/null | awk '{sum+=$1} END {print sum " total"}'

echo "Optimized videos total size:"
du -sh client/public/videos/optimized/*.mp4 2>/dev/null | awk '{sum+=$1} END {print sum " total"}'
