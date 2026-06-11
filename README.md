# Strona wizytówka — Aleksander Adamczuk, Ratownik Medyczny

Statyczna strona one-page (HTML + CSS + JS, bez zależności i procesu budowania).
Design: minimalistyczny swiss/grid — biel, czerń, cienkie linie, akcent petrol
(`#0f766e`) używany wyłącznie w przyciskach CTA i fokusach. Fonty: Archivo + Inter
(Google Fonts).

## Struktura

```
index.html       — strona główna (one-page)
css/style.css    — style
js/main.js       — menu mobilne, rok w stopce
img/             — (do utworzenia) zdjęcia po podmianie placeholderów
```

Strona nie zbiera żadnych danych i nie używa cookies (informacja w stopce) —
dlatego nie ma osobnej polityki prywatności. Nie ma też formularza kontaktowego:
kontakt wyłącznie przez bezpośrednie linki `tel:` i `mailto:`.

## Jak uruchomić lokalnie

Wystarczy otworzyć `index.html` w przeglądarce (dwuklik). Czcionki ładują się
z Google Fonts, więc pełny wygląd wymaga internetu (offline działa fallback systemowy).

## Publikacja na GitHub Pages

1. Utwórz repozytorium na GitHub i wypchnij pliki (`git init`, `git add .`,
   `git commit`, `git push`) — pliki w katalogu głównym, bez podkatalogu.
2. W repozytorium: **Settings → Pages → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. Strona będzie dostępna pod `https://UZYTKOWNIK.github.io/NAZWA-REPO/`.
4. Po publikacji odkomentuj i uzupełnij w `index.html` tagi `og:url` i `og:image`.
5. (Opcjonalnie) własna domena: Settings → Pages → Custom domain.

## Placeholdery do uzupełnienia (checklist)

- [x] **Hero — statystyki**: 5 lat / 114+ wydarzeń / 9000+ przeszkolonych (animowane liczniki —
      wartości edytuje się w `data-target` i `data-suffix` w `index.html`)
- [ ] **O mnie**: 2–3 zdania o doświadczeniu (ZRM / SOR / zabezpieczenia) — oznaczone `[MIEJSCE NA...]`
- [x] **O mnie — zdjęcie**: `photo.jpg` (żeby podmienić, wystarczy nadpisać plik;
      obecne zdjęcie wygląda na robocze — do weryfikacji przed publikacją)
- [x] **Wykształcenie**: licencjat 2019–2022, magister 2022–2024
- [ ] **Certyfikaty**: 6 wierszy `[Kurs ...] [Organizator] · [rok]` — wpisać prawdziwe
- [ ] **Usługi — BHP**: potwierdzić zakres szkoleń BHP (uprawnienia do szkoleń okresowych)
- [ ] **Realizacje**: 6 kafelków-placeholderów podmienić na `<img>` + podpisy
      (zdjęcia dostają automatycznie efekt czarno-biały → kolor na hover)
- [ ] **Opinie**: 3 przykładowe opinie podmienić na prawdziwe
- [ ] **FAQ**: czas wyceny `[24/48 h]`, wyprzedzenie rezerwacji `[2–4 tygodnie]`
- [ ] **Kontakt — dostępność**: czas odpowiedzi `[X h]`
- [ ] **Stopka**: `[NAZWA DZIAŁALNOŚCI]`, `[NIP]`, `[REGON]` (z CEIDG)
- [ ] **OG-tagi**: po publikacji odkomentować i uzupełnić `og:url` + `og:image`

## Gdyby kiedyś wrócił formularz

Na statycznym hostingu formularz wymaga zewnętrznej usługi, np.
[Formspree](https://formspree.io) (darmowy plan wystarczy). Uwaga: wtedy strona
zacznie przetwarzać dane osobowe i trzeba będzie dodać politykę prywatności.

## Dane kontaktowe użyte na stronie

- Telefon: **794 706 332** (`tel:+48794706332`)
- E-mail: **aleksander.adamczuk.00@gmail.com**
- Obszar: Trójmiasto i woj. pomorskie (+ dojazd w całej Polsce)
