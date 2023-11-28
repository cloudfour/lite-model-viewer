# Lite Model-Viewer

[![NPM version](http://img.shields.io/npm/v/@cloudfour/lite-model-viewer.svg)](https://www.npmjs.org/package/@cloudfour/lite-model-viewer)

Lite Model-Viewer is a web component to lazy-load `<model-viewer>` for improved performance.

- [Demo](https://lite-model-viewer.netlify.app/)

## How Does It Work?

The `<lite-model-viewer>` web component accepts all the same attributes as `<model-viewer>`, and will display a poster image if provided. When `<lite-model-viewer>` is clicked, it will inject the `<model-viewer>` element into the page, which will immediately activate and load the 3D file.

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

Note that although we're adding a `<button>` element, it's just a visual indicator. There is a click event listener applied to the entire `<lite-model-viewer>` element, so the user can click anywhere on the poster image to trigger the load event.

## Features

- Any attributes on `<lite-model-viewer>` will be applied to `<model-viewer>`.
  - See `<model-viewer>` docs for [more info on available attributes](https://modelviewer.dev).
- Provide an optional `<template>` element to pass content into `<model-viewer>`, to set a custom progress bar, etc.
- Set an optional `height` and `width` attribute, which will apply to both the `<lite-model-viewer>` preview and the lazy-loaded `<model-viewer>` element.
- By default, Lite Model-Viewer will load the Model Viewer script from [Google's CDN](https://developers.google.com/speed/libraries#model-viewer). If you'd prefer to self-host the script, you can do so by including the script in your page with the `id="model-viewer-script"` attribute. If Lite Model-Viewer detects this script, it will not load the script from Google's CDN.
- See [Demo](https://lite-model-viewer.netlify.app/) for more details.
