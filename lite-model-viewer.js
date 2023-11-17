/* eslint-disable no-undef */
import '@google/model-viewer';

// eslint-disable-next-line @cloudfour/n/file-extension-in-import
import styles from './style.css?raw';

console.log(styles);

class LiteModelViewer extends HTMLElement {
  connectedCallback() {
    // Set up the click handler so it can be added and removed
    this._clickHandler = () => this._activate();

    // Check if there's a poster attribute
    const poster = this.getAttribute('poster');

    // If so, set that as a property so we can display it as
    // a background image
    if (poster) {
      this.style.setProperty('--poster', `url(${poster})`);
    }

    // Wait to activate until `model-viewer` is available
    customElements.whenDefined('model-viewer').then(() => this._init());
  }

  _init() {
    // Allow clicks anywhere in the element
    this.addEventListener('click', this._clickHandler);
    // Add a styling hook for when we're ready to interact
    this.classList.add('is-ready');
  }

  _activate() {
    // Remove click event so it doesn't conflict with model viewer
    this.removeEventListener('click', this._clickHandler);

    // Create the actual model viewer
    const modelViewer = document.createElement('model-viewer');

    // Reproduce all of this element's attributes on the model viewer
    for (const attr of this.attributes) {
      modelViewer.setAttribute(attr.name, attr.value);
    }

    // Query for an inner template (if any)
    const template = this.querySelector('template');

    // If it exists, insert that into the model viewer
    if (template) {
      modelViewer.insertAdjacentHTML('beforeend', template.innerHTML);
    }

    // Start listening for loading progress so we can update a
    // custom property for styling
    modelViewer.addEventListener('progress', (event) => {
      event.target.style.setProperty('--progress', event.detail.totalProgress);
      event.target.classList.toggle(
        'is-loaded',
        event.detail.totalProgress === 1,
      );
    });

    // Wipe the previous contents
    this.innerHTML = '';

    // Append the model viewer
    this.append(modelViewer);

    // Add a style hook for that state
    this.classList.add('is-active');
  }
}

customElements.define('lite-model-viewer', LiteModelViewer);
