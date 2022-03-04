import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../../views/view';
import '@vaadin/vaadin-date-picker'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-grid/vaadin-grid'

@customElement('todo-view')
export class TodoView extends View {
    render() {
        return html`
            <div>
                <vaadin-grid theme="column-borders">
                    <vaadin-grid-column header="Name" resizable></vaadin-grid-column>
                    <vaadin-grid-column header="Due"></vaadin-grid-column>
                    <vaadin-grid-column header="Done"></vaadin-grid-column>
                </vaadin-grid>
                <vaadin-text-field label="Name"></vaadin-text-field>
                <vaadin-date-picker label="Due"></vaadin-date-picker>
                <vaadin-checkbox label="Done"></vaadin-checkbox>
            </div>`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'flex',
            'flex-col',
            'h-full',
            'p-l',
            'box-border'
        );
    }
}
