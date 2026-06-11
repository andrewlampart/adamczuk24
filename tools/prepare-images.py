# Jednorazowe narzędzie: kompresja zdjęcia do WebP + generowanie grafiki OG (1200x630)
# Uruchomienie: python tools/prepare-images.py
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "img"
IMG.mkdir(exist_ok=True)

# paleta swiss strony
INK = (21, 24, 28)
MUTED = (98, 104, 111)
LINE = (227, 228, 224)
ACCENT = (15, 118, 110)
WHITE = (255, 255, 255)

# --- 1. photo.jpg -> img/aleksander.webp (wyświetlane ~380px, 2x retina = 760) ---
src = Image.open(ROOT / "photo.jpg").convert("RGB")
w, h = src.size  # 1536x2048
target_w = 760
target_h = round(h * target_w / w)
resized = src.resize((target_w, target_h), Image.LANCZOS)
out_webp = IMG / "aleksander.webp"
resized.save(out_webp, "WEBP", quality=82, method=6)
print(f"aleksander.webp: {target_w}x{target_h}, {out_webp.stat().st_size // 1024} KB (bylo 293 KB)")

# --- 2. img/og-cover.png (1200x630) — karta w stylu swiss ---
FONTS = Path(r"C:\Windows\Fonts")
def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)

bold = lambda s: font("segoeuib.ttf", s)      # Segoe UI Bold (najblizszy Archivo 600)
regular = lambda s: font("segoeui.ttf", s)

card = Image.new("RGB", (1200, 630), WHITE)
d = ImageDraw.Draw(card)

M = 80  # margines

# kicker uppercase z letter-spacingiem (rysowany znak po znaku)
def draw_tracked(xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=fnt, fill=fill)
        x += d.textlength(ch, font=fnt) + tracking
    return x

# górna hairline + kicker
d.rectangle([M, M, 1200 - M, M + 1], fill=LINE)
draw_tracked((M, M + 24), "RATOWNIK MEDYCZNY · TRÓJMIASTO I POMORSKIE", regular(22), MUTED, 3)

# nazwisko — duża typografia
d.text((M - 4, 180), "Aleksander", font=bold(110), fill=INK)
d.text((M - 4, 300), "Adamczuk", font=bold(110), fill=INK)

# zakres usług
d.text((M, 440), "Zabezpieczenie medyczne imprez · zabezpieczenia wodne", font=regular(30), fill=MUTED)
d.text((M, 480), "szkolenia z pierwszej pomocy · BHP", font=regular(30), fill=MUTED)

# dolny akcent: petrolowy prostokąt + domena
d.rectangle([M, 556, M + 56, 564], fill=ACCENT)
d.text((M + 76, 540), "adamczuk24.pl", font=bold(30), fill=INK)

out_og = IMG / "og-cover.png"
card.save(out_og, "PNG", optimize=True)
print(f"og-cover.png: 1200x630, {out_og.stat().st_size // 1024} KB")
