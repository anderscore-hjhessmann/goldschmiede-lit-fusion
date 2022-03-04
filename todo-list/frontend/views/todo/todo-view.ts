import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../../views/view';
import '@vaadin/vaadin-date-picker'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-grid/vaadin-grid'
import TaskEntity from "Frontend/generated/com/anderscore/samples/tasks/entity/TaskEntity";
import {getAllTasks, save} from "Frontend/generated/TaskEndpoint";
import {Binder, field} from "@hilla/form";
import TaskEntityModel from "Frontend/generated/com/anderscore/samples/tasks/entity/TaskEntityModel";

@customElement('todo-view')
export class TodoView extends View {

    @state()
    private tasks: TaskEntity[] = [];
    @state()
    private selectedTasks: TaskEntity[] = [];
    private binder = new Binder(this, TaskEntityModel);

    render() {
        return html`
            <vaadin-grid theme="column-borders" .items="${this.tasks}" 
                         .selectedItems="${this.selectedTasks}" 
                         @active-item-changed="${this.handleGridSelection}">
                <vaadin-grid-column path="name" header="Name" resizable></vaadin-grid-column>
                <vaadin-grid-column path="due" header="Due"></vaadin-grid-column>
                <vaadin-grid-column path="done" header="Done"></vaadin-grid-column>
            </vaadin-grid>
            <div>
                <vaadin-text-field ${field(this.binder.model.name)} label="Name"></vaadin-text-field>
                <vaadin-date-picker ${field(this.binder.model.due)} label="Due"></vaadin-date-picker>
                <vaadin-checkbox ${field(this.binder.model.done)} label="Done"></vaadin-checkbox>
                <vaadin-button theme="primary" @click=${this.addTask} ?disabled="${this.binder.invalid}">Add</vaadin-button>
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

    private handleGridSelection(ev: CustomEvent) {
        const task = ev.detail.value;
        this.binder.read(task);
    }

    async addTask() {
        const task = await this.binder.submitTo(save);
        if (task) {
            this.tasks = [...this.tasks, task];
            this.binder.clear();
        }
    }

    async firstUpdated() {
        const tasks = await getAllTasks();
        this.tasks = tasks;
    }
}
