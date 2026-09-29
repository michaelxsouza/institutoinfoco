#!/usr/bin/env python3
"""
PROCESSA AS FOTOS DOS CURSOS — Instituto Infoco
-----------------------------------------------
Coloque a foto original em  assets/img/_originais/<nome-do-curso>.png  (ou .jpg / .webp)
e rode, na pasta do projeto:

    python scripts/processar-imagens.py            (só as fotos novas)
    python scripts/processar-imagens.py --todas    (refaz todas)

Para cada foto, cria em assets/img/cursos/:
    <nome-do-curso>.webp       1200 x 800  (topo e seção "Sobre" da página do curso)
    <nome-do-curso>-card.webp   720 x 480  (card do curso no site)

Depois rode  node scripts/gerar-lps.js  para colocar as fotos nas páginas.
Requer Pillow:  pip install pillow
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "img" / "_originais"
DST = ROOT / "assets" / "img" / "cursos"
SIZES = {"": (1200, 800, 80), "-card": (720, 480, 78)}
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def main():
    todas = "--todas" in sys.argv
    DST.mkdir(parents=True, exist_ok=True)
    feitas, puladas = [], []
    for f in sorted(SRC.iterdir()):
        if f.suffix.lower() not in EXTS or f.name.startswith("_"):
            continue
        slug = f.stem.lower()
        if not todas and (DST / f"{slug}.webp").exists() and (DST / f"{slug}-card.webp").exists():
            puladas.append(slug)
            continue
        with Image.open(f) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            for suf, (w, h, q) in SIZES.items():
                out = ImageOps.fit(im, (w, h), Image.LANCZOS, centering=(0.5, 0.45))
                out.save(DST / f"{slug}{suf}.webp", "WEBP", quality=q, method=6)
        feitas.append(slug)
    print(f"OK {len(feitas)} foto(s) processada(s)" + (": " + ", ".join(feitas) if feitas else ""))
    if puladas:
        print(f"-- {len(puladas)} já existiam (use --todas para refazer)")
    if feitas:
        print("Agora rode:  node scripts/gerar-lps.js")

if __name__ == "__main__":
    main()
