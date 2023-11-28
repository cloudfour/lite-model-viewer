# Lite Model-Viewer

Lite Model-Viewer is a web component to lazy-load `<model-viewer>` for improved performance.

- [Demo](#)

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
  loading="eager"
>
  <button>View Model</button>
</lite-model-viewer>
<script type="module" src="lite-model-viewer.js"></script>
```

## Features

- Any attributes on `<lite-model-viewer>` will be applied to `<model-viewer>`.
- Provide an optional `<template>` element to pass content into `<model-viewer>`, to set a custom progress bar, etc.
- Set an optional height and width.
- See [Demo](#) for more details.
