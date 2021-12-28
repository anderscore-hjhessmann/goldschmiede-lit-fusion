var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Sources form the Lit tutorial.
 */
let MyHello = class MyHello extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Your name.';
        this.checked = false;
    }
    render() {
        return html `
      <div>
        <p>Hello, this is ${this.name}</p>
        <input placeholder="Enter your name" @input=${this._changeName} ?disabled="${!this.checked}">
      </div>
      <label><input type="checkbox" @change=${this._setChecked}> Enable editing</label>
    `;
    }
    _setChecked(event) {
        const input = event.target;
        this.checked = input.checked;
    }
    _changeName(event) {
        const input = event.target;
        this.name = input.value;
    }
};
__decorate([
    property()
], MyHello.prototype, "name", void 0);
__decorate([
    property()
], MyHello.prototype, "checked", void 0);
MyHello = __decorate([
    customElement('my-hello')
], MyHello);
export { MyHello };
//# sourceMappingURL=my-hello.js.map