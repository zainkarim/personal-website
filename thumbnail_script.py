import os
import json

gallery_path = "art/night-car/images/medium"
output_file = "art/night-car/images/gallery.json"

# Filter to include only .webp files
images = [f for f in os.listdir(gallery_path) if f.lower().endswith('.webp')]

with open(output_file, 'w') as f:
    json.dump(images, f)

print("night-car.json generated with only .webp files!")
