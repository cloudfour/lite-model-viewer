# Lite Model-Viewer

Lite Model-Viewer is a web component to lazy-load `<model-viewer>` for improved performance.

- [Demo](https://lite-model-viewer.netlify.app/)

## Installation

```shell
npm install @cloudfour/lite-model-viewer
```

## Usage

```html
<lite-model-viewer
  src="your-asset.glb"
  poster="your-poster.webp"
  ar
  camera-controls
  shadow-intensity="1"
>
  <button>View Model</button>
</lite-model-viewer>
<script type="module" src="lite-model-viewer.js"></script>
```

## Features

- Any attributes on `<lite-model-viewer>` will be applied to `<model-viewer>`.
  - See `<model-viewer>` docs for [more info on available attributes](https://modelviewer.dev).
- Provide an optional `<template>` element to pass content into `<model-viewer>`, to set a custom progress bar, etc.
- Set an optional `height` and `width` attribute, which will apply to both the `<lite-model-viewer>` preview and the lazy-loaded `<model-viewer>` element.
- See [Demo](https://lite-model-viewer.netlify.app/) for more details.
