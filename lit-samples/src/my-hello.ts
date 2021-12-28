import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Sources form the Lit tutorial.
 */
@customElement('my-hello')
export class MyHello extends LitElement {

  @property()
  name: string = 'Your name.';

  @property()
  checked: boolean = false;

  override render() {
    return html`
      <div>
        <p>Hello, this is ${this.name}</p>
        <input placeholder="Enter your name" @input=${this._changeName} ?disabled="${!this.checked}">
      </div>
      <label><input type="checkbox" @change=${this._setChecked}> Enable editing</label>
    `;
  }

  private _setChecked(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
  }

  private _changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-hello': MyHello;
  }
}
