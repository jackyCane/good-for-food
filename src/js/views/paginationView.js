import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  insertButton(num) {
    if (num === 1)
      return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1} </span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
    return `
    <button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>
    `;
  }
  numberOfPages(num) {
    return `
    <span class = "pagination__number-of-pages">Number of pages: ${num}</span>
    `;
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 , and they are other pages
    if (this._data.page === 1 && numPages > 1) {
      return [this.numberOfPages(numPages), this.insertButton(1)].join("");
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return [this.insertButton(-1), this.numberOfPages(numPages)].join("");
    }

    // Other page
    if (this._data.page < numPages) {
      return [
        this.insertButton(-1),
        this.numberOfPages(numPages),
        this.insertButton(1),
      ].join("");
    }

    // Page 1 , and they are NO other pages
  }
}

export default new PaginationView();
