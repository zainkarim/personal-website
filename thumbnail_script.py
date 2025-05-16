import os
import json

gallery_path = "art/gallery/images/medium"
output_file = "art/gallery/images/gallery.json"

# Filter to include only .webp files
images = [f for f in os.listdir(gallery_path) if f.lower().endswith('.webp')]

with open(output_file, 'w') as f:
    json.dump(images, f)

print("gallery.json generated with only .webp files!")
