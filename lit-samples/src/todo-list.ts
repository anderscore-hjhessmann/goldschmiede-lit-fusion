import {css, html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';


type ToDoItem = {
    text: string,
    completed: boolean
}

/**
 * Sources form the Lit tutorial.
 */
@customElement('todo-list')
export class ToDoList extends LitElement {
    static override styles = css`
        :host {
          display: block;
          border: solid 1px gray;
          padding: 16px;
          max-width: 800px;
        }
        
        .completed {
          text-decoration-line: line-through;
          color: #777;
        }
    `;

    @property()
    listItems = [
        {text: 'Start Lit tutorial', completed: true},
        {text: 'Make to-do list', completed: false}
    ];


    @query("#newitem")
    input!: HTMLInputElement;

    @property()
    hideCompleted = false;

    override render() {
        const items = this.hideCompleted
            ? this.listItems.filter(item => !item.completed)
            : this.listItems;

        const todos = html`
            <ul>
                ${items.map((item) =>
                        html`
                            <li class=${item.completed ? 'completed' : ''}
                                @click=${() => this._toggleComplete(item)}
                            >${item.text}</li>`
                )}
            </ul>
        `;

        const caughtUpMessage = html`
            <p>You're all caught up!</p>
        `;

        const todosOrMessage = items.length > 0
            ? todos
            : caughtUpMessage;

        return html`
            <h2>To Do</h2>
            ${todosOrMessage}
            <input id="newitem" aria-label="New item">
            <button @click=${this._addToDo}>Add</button>
            <br>
            <label>
                <input type="checkbox"
                       @change=${this._setHideCompleted}
                       ?checked=${this.hideCompleted}>
                Hide completed
            </label>
        `;
    }

    private _setHideCompleted(event: Event) {
        const checkbox = event.target as HTMLInputElement
        this.hideCompleted = checkbox.checked;
    }

    private _toggleComplete(item: ToDoItem) {
        item.completed = !item.completed;
        this.requestUpdate();
    }

    private _addToDo() {
        this.listItems.push({text: this.input.value, completed: false});
        this.input.value = '';
        this.requestUpdate();
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'todo-list': ToDoList;
    }
}
