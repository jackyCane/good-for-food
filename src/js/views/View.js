import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render the received obkect to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render = true] if false create markup string instead of rendering to the DOM
   * @returns {undefined | string } A string is retured if render is false
   * @this {OBject} View intsance
   * @author Denys Ocherentyy
   * @todo Finish the implementation
   */

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
              <svg>
                  <use href="${icons}#icon-loader"></use>
              </svg>
          </div> -->
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
      <svg>
      <use href="${icons}/icons.svg#icon-alert-triangle"></use>
        </svg>
        </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
      <div>
      <svg>
      <use href="${icons}/icons.svg#icon-smile-triangle"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    // MAking new markup to compare it to the old one
    const newMarkup = this._generateMarkup();

    // Converting a string markup into the DOM Node-Object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // console.log(newDOM);

    // Selecting all the element in the new and current DOM
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));

    // Looping over the new DOM to check if the elements are equal
    newElements.forEach((newEl, ind) => {
      const currEl = currElements[ind];
      // console.log(currEl, newEl.isEqualNode(currEl));

      // UPDATE CHENGED TEXT
      // if the currentEl is not equal to the new one and if the nodeValue of the firstChild of the new El is not equal to empty string
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("!", newEl.firstChild.nodeValue.trim());
        currEl.textContent = newEl.textContent;
      }

      // UPDATE CHENGED ATTRIBUTES
      if (!newEl.isEqualNode(currEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
