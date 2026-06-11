# Strona wizytówka — Aleksander Adamczuk, Ratownik Medyczny

Statyczna strona one-page (HTML + CSS + JS, bez zależności i procesu budowania).
Design: minimalistyczny swiss/grid — biel, czerń, cienkie linie, akcent petrol
(`#0f766e`) używany wyłącznie w przyciskach CTA i fokusach. Fonty: Archivo + Inter
(Google Fonts).

## Struktura

```
index.html             — strona główna (one-page)
css/style.css          — style
js/main.js             — menu mobilne, liczniki, parallax hero, rok w stopce
img/aleksander.webp    — zdjęcie do sekcji „O mnie" (generowane z photo.jpg)
img/og-cover.png       — grafika do udostępniania (Open Graph, 1200x630)
photo.jpg              — źródłowe zdjęcie (nie jest linkowane na stronie)
tools/prepare-images.py — kompresja zdjęcia + generowanie grafiki OG
robots.txt, sitemap.xml — pliki dla wyszukiwarek
```

Podmiana zdjęcia: nadpisz `photo.jpg` i uruchom `python tools/prepare-images.py`
(wymaga Pillow: `pip install pillow`).

Hero ma kinetyczne wejście (wersy H1 z masek, rysujące się hairline'y,
petrolowy finał na ramie liczników) i subtelny parallax H1 za kursorem.
Tempo choreografii reguluje się `animation-delay` w sekcji
„kinetyczne wejście hero" w `style.css`. Przy `prefers-reduced-motion`
i bez JS strona od razu pokazuje stan końcowy.

Strona nie zbiera żadnych danych i nie używa cookies (informacja w stopce) —
dlatego nie ma osobnej polityki prywatności. Nie ma też formularza kontaktowego:
kontakt wyłącznie przez bezpośrednie linki `tel:` i `mailto:`.

## Jak uruchomić lokalnie

Wystarczy otworzyć `index.html` w przeglądarce (dwuklik). Czcionki ładują się
z Google Fonts, więc pełny wygląd wymaga internetu (offline działa fallback systemowy).

## Publikacja

Strona jest opublikowana na GitHub Pages:

- **Adres:** https://adamczuk24.pl/ (zapasowo: https://andrewlampart.github.io/adamczuk24/)
- **Repozytorium:** https://github.com/andrewlampart/adamczuk24
- Deploy automatyczny: każdy `git push` na branch `main` publikuje zmiany
  (zwykle w ciągu 1–2 minut).
- Domena adamczuk24.pl: rejestracja w OVH, strefa DNS wskazuje na GitHub Pages
  (4× rekord A `185.199.108-111.153` + `CNAME www → andrewlampart.github.io.`).
  Plik `CNAME` w repo utrzymuje przypięcie domeny — nie usuwać go.
- Po weryfikacji DNS w Settings → Pages włączyć **Enforce HTTPS**.

## Placeholdery do uzupełnienia (checklist)

- [x] **Hero — statystyki**: 5 lat / 114+ wydarzeń / 9000+ przeszkolonych (animowane liczniki —
      wartości edytuje się w `data-target` i `data-suffix` w `index.html`)
- [ ] **O mnie**: 2–3 zdania o doświadczeniu (ZRM / SOR / zabezpieczenia) — oznaczone `[MIEJSCE NA...]`
- [x] **O mnie — zdjęcie**: `img/aleksander.webp` (podmiana: nadpisz `photo.jpg`
      i uruchom `python tools/prepare-images.py`; obecne zdjęcie wygląda na
      robocze — do weryfikacji przed publikacją)
- [x] **Wykształcenie**: licencjat 2019–2022, magister 2022–2024
- [ ] **Certyfikaty**: 6 wierszy `[Kurs ...] [Organizator] · [rok]` — wpisać prawdziwe
- [ ] **Usługi — BHP**: potwierdzić zakres szkoleń BHP (uprawnienia do szkoleń okresowych)
- [ ] **Realizacje**: 6 kafelków-placeholderów podmienić na `<img>` + podpisy
      (zdjęcia dostają automatycznie efekt czarno-biały → kolor na hover)
- [ ] **Opinie**: 3 przykładowe opinie podmienić na prawdziwe
- [ ] **FAQ**: czas wyceny `[24/48 h]`, wyprzedzenie rezerwacji `[2–4 tygodnie]`
- [ ] **Kontakt — dostępność**: czas odpowiedzi `[X h]`
- [ ] **Stopka**: `[NAZWA DZIAŁALNOŚCI]`, `[NIP]`, `[REGON]` (z CEIDG)
- [x] **OG-tagi**: `og:url`, `og:image` (img/og-cover.png) i twitter:card ustawione
- [ ] **Google Search Console**: zweryfikować własność (najprościej: metoda „prefiks
      adresu URL" + plik HTML, albo rekord TXT w DNS OVH) i zgłosić `sitemap.xml`
- [ ] **Profil Google Business**: założyć wizytówkę (usługa lokalna — duży wpływ
      na widoczność w Mapach i wynikach lokalnych)

## Gdyby kiedyś wrócił formularz

Na statycznym hostingu formularz wymaga zewnętrznej usługi, np.
[Formspree](https://formspree.io) (darmowy plan wystarczy). Uwaga: wtedy strona
zacznie przetwarzać dane osobowe i trzeba będzie dodać politykę prywatności.

## Dane kontaktowe użyte na stronie

- Telefon: **794 706 332** (`tel:+48794706332`)
- E-mail: **aleksander.adamczuk.00@gmail.com**
- Obszar: Trójmiasto i woj. pomorskie (+ dojazd w całej Polsce)
