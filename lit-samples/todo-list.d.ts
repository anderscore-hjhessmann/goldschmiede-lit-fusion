import { LitElement } from 'lit';
/**
 * Sources form the Lit tutorial.
 */
export declare class ToDoList extends LitElement {
    static styles: import("lit").CSSResult;
    listItems: {
        text: string;
        completed: boolean;
    }[];
    input: HTMLInputElement;
    hideCompleted: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _setHideCompleted;
    private _toggleComplete;
    private _addToDo;
}
declare global {
    interface HTMLElementTagNameMap {
        'todo-list': ToDoList;
    }
}
//# sourceMappingURL=todo-list.d.ts.map