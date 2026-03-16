import os
from PIL import Image, ImageOps

def optimize_images():
    dirs = ['static/deporte', 'static/eventos', 'static/images']
    max_size = (1200, 1200)

    for d in dirs:
        if not os.path.exists(d):
            continue
        for f in os.listdir(d):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                path = os.path.join(d, f)
                try:
                    img = Image.open(path)
                    
                    # Fix EXIF orientation
                    img = ImageOps.exif_transpose(img)
                    
                    original_size = img.size
                    
                    if f == "hero_bg.jpg" or f == "profile.jpg":
                        # They want the cover image to be horizontal so black borders aren't visible.
                        # We can simply crop out a 16:9 responsive shape or, if it's currently a portrait
                        # orientation with black letterbox, we can crop the letterboxes.
                        # Wait, what if they meant they want to *rotate* it so it's landscape?
                        if original_size[0] < original_size[1]: # Portrait
                            print(f"{f} is portrait, rotating")
                            img = img.rotate(90, expand=True)

                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                    # optimize size
                    img.save(path, quality=80, optimize=True)
                    print(f"Optimized {path}: {original_size} -> {img.size}")
                except Exception as e:
                    print(f"Error on {path}: {e}")

if __name__ == '__main__':
    optimize_images()
