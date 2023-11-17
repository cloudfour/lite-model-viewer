import { resolve } from 'node:path';

// eslint-disable-next-line @cloudfour/n/no-unpublished-import
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lite-model-viewer.js'),
      name: 'liteModelViewer',
      fileName: 'lite-model-viewer',
    },
  },
});
