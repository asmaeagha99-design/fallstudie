# Kleiderbrücke

Angular-Frontend zur Fallstudie IPWA01-01, Aufgabe 1.3.

## Lokal starten

Voraussetzung ist Node.js 24 LTS mit npm.

```sh
npm install
npm start
```

Die Anwendung läuft unter http://localhost:4200/. Ein Produktionsbuild lässt sich mit `npm run build` erzeugen.

## Umsetzung

- `src/app.ts` enthält die Komponenten, das reaktive Formular und den temporären Zustand.
- Die Komponenten verwenden separate HTML-Templates. Globale Gestaltung und Formularstile liegen in separaten CSS-Dateien.
- Bei der Übergabe am Tablet sind Kleidungsart und Krisengebiet erforderlich. Bei der Abholung kommen Straße, Hausnummer, fünfstellige PLZ und Ort hinzu. Die ersten beiden PLZ-Ziffern müssen mit denen der fiktiven Geschäftsstelle (50667 Köln) übereinstimmen.
- Die Bestätigungsseite zeigt den Spendenweg, die Kleidungsart, das Krisengebiet, Datum und Uhrzeit der Registrierung sowie den Übergabe- oder Abholort. Datum und Uhrzeit verwenden die Zeitzone Europe/Berlin.
- Formulardaten bleiben im Arbeitsspeicher des Browsers. Die Anwendung verwendet kein Backend und beauftragt kein Fahrzeug.
- Krisengebiete sind als statische Beispiele hinterlegt. Quelle: [UN OCHA, CBPF Results Dashboard](https://cbpf.data.unocha.org/results).
- Das Foto wurde mit ImageGen für dieses Projekt erstellt.

## Ablauf prüfen

1. Übergabe auswählen, Kleidungsart und Krisengebiet angeben und die Bestätigung mit Adresse der Geschäftsstelle prüfen.
2. Abholung auswählen. Mit einer PLZ wie 10115 muss das Formular eine Fehlermeldung anzeigen. Mit 50670 und vollständiger Beispieladresse muss es zur Bestätigung mit der eingegebenen Adresse führen.
3. Die Registrierung mit leeren Pflichtfeldern, einer zu kurzen PLZ und bei schmaler Bildschirmbreite prüfen.

