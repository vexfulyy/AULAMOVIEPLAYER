# AulaPlayer

A Windows desktop wrapper for the live Stellar website, with an Aula loading screen and icon.

## Build

Install Node.js and run:

```sh
npm install
npm run build
```

For a faster-starting unpacked Windows build, run:

```sh
npx electron-builder --win --dir
```

Keep all files in the unpacked output folder together. The app requires an internet connection; the catalog and playback are provided by Stellar.
