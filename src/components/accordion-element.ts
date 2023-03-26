import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("accordion-element")
class Accordion extends LitElement {
  // @property({ type: Boolean }) open = false;
  private _open = false;

  get open() {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    this.requestUpdate();
  }

  static get styles() {
    return css`
      .accordion {
        border: 1px solid;
      }

      .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .accordion-body {
        display: none;
      }

      .logo {
        width: 20px;
        height: 20px;
      }

      .open {
        display: block;
      }

      .open .logo {
        transform: rotate(180deg);
      }
    `;
  }

  toggleOpen() {
    this.open = !this.open;
    console.log(this.open ? "open" : "close");
  }

  render() {
    return this.open
      ? html`
          <div class="accordion border-gray-400">
            <div
              class="accordion-header bg-gray-100 p-5 cursor-pointer hover:bg-gray-200"
              @click="${this.toggleOpen}"
            >
              <slot name="header"></slot>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="logo"
              >
                <path
                  fill="currentColor"
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
            <div class="accordion-body bg-gray-200 p-5 open">
              <slot name="body">adjfslkdjas</slot>
            </div>
          </div>
        `
      : html`<div class="accordion border-gray-400">
          <div
            class="accordion-header bg-gray-100 p-5 cursor-pointer hover:bg-gray-200"
            @click="${this.toggleOpen}"
          >
            <slot name="header"></slot>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="logo"
            >
              <path
                fill="currentColor"
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>`;
  }
}
