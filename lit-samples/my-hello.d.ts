import { LitElement } from 'lit';
/**
 * Sources form the Lit tutorial.
 */
export declare class MyHello extends LitElement {
    name: string;
    checked: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _setChecked;
    private _changeName;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-hello': MyHello;
    }
}
//# sourceMappingURL=my-hello.d.ts.map