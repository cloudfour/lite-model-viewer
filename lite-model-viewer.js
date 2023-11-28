const styles = `
lite-model-viewer {
  background-image: var(--poster);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: grid;
  height: var(--height, 300px);
  place-items: center;
  width: var(--width, 100%);
}

lite-model-viewer:not(.is-ready) > * {
  display: none;
}

lite-model-viewer.is-active {
  display: contents;
}

model-viewer {
  height: var(--height, 300px);
  width: var(--width, 100%);
}
`;

class LiteModelViewer extends HTMLElement {
  connectedCallback() {
    // Load the model-viewer script if it hasn't been loaded yet
    if (!document.querySelector("#model-viewer-script")) {
      const script = document.createElement("script");
      script.id = "model-viewer-script";
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";
      document.body.append(script);
    }

    // Inject the styles if they haven't been yet
    if (!document.querySelector("#lite-model-viewer-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "lite-model-viewer-styles";
      stylesheet.textContent = styles;
      document.head.append(stylesheet);
    }

    // Check for styling attributes, to be set as custom properties
    const poster = this.getAttribute("poster");
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");
    if (poster) this.style.setProperty("--poster", `url(${poster})`);
    if (width) this.style.setProperty("--width", width);
    if (height) this.style.setProperty("--height", height);

    // Wait to add click listener until `model-viewer` is available
    customElements.whenDefined("model-viewer").then(() => this._init());
  }

  _init() {
    // Set up the click handler so it can be added and removed
    this.addEventListener("click", this._activate);

    // Add a styling hook for when we're ready to interact
    this.classList.add("is-ready");
  }

  _activate() {
    // Remove click event so it doesn't conflict with model-viewer
    this.removeEventListener("click", this._activate);

    // Create the actual model-viewer
    const modelViewer = document.createElement("model-viewer");

    // Reproduce all of this element's attributes on the model-viewer
    for (const attr of this.attributes) {
      modelViewer.setAttribute(attr.name, attr.value);
    }

    // The actual model-viewer should use eager loading, since we're handling
    // the lazy loading ourselves
    modelViewer.setAttribute("loading", "eager");

    // Query for an inner template (if any)
    const template = this.querySelector("template");

    // If it exists, insert that into the model-viewer
    if (template) {
      modelViewer.insertAdjacentHTML("beforeend", template.innerHTML);
    }

    // Start listening for loading progress so we can update a
    // custom property for styling
    modelViewer.addEventListener("progress", (event) => {
      event.target.style.setProperty("--progress", event.detail.totalProgress);
      event.target.classList.toggle(
        "is-loaded",
        event.detail.totalProgress === 1
      );
    });

    // Wipe the previous contents
    this.innerHTML = "";

    // Append the model-viewer
    this.append(modelViewer);

    // Add a style hook for that state
    this.classList.add("is-active");
  }
}

customElements.define("lite-model-viewer", LiteModelViewer);
