import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../../views/view';
import '@vaadin/vaadin-date-picker'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-grid/vaadin-grid'
import TaskEntity from "Frontend/generated/com/anderscore/samples/tasks/entity/TaskEntity";
import {getAllTasks, remove, save} from "Frontend/generated/TaskEndpoint";
import {Binder, field} from "@hilla/form";
import TaskEntityModel from "Frontend/generated/com/anderscore/samples/tasks/entity/TaskEntityModel";

@customElement('todo-view')
export class TodoView extends View {

    @state()
    private tasks: TaskEntity[] = [];
    @state()
    private selectedTask?: TaskEntity;
    private binder = new Binder(this, TaskEntityModel);

    render() {
        const modeAdd = !this.selectedTask;
        return html`
            <vaadin-grid class="grid" theme="column-borders" .items="${this.tasks}" 
                         .selectedItems="${[this.selectedTask]}" 
                         @active-item-changed="${this.handleGridSelection}">
                <vaadin-grid-column path="id" header="Id"></vaadin-grid-column>
                <vaadin-grid-column path="name" header="Name" resizable></vaadin-grid-column>
                <vaadin-grid-column path="due" header="Due"></vaadin-grid-column>
                <vaadin-grid-column path="done" header="Done"></vaadin-grid-column>
            </vaadin-grid>
            <div>
                <vaadin-text-field ${field(this.binder.model.name)} label="Name"></vaadin-text-field>
                <vaadin-date-picker ${field(this.binder.model.due)} label="Due"></vaadin-date-picker>
                <vaadin-checkbox ${field(this.binder.model.done)} label="Done"></vaadin-checkbox>
                <vaadin-button theme="primary" @click=${this.saveTask} ?disabled="${this.binder.invalid}">${modeAdd ? 'Add' : 'Save'}</vaadin-button>
                <vaadin-button theme="primary error" @click=${this.removeTask} ?disabled="${modeAdd}">Delete</vaadin-button>
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
        this.selectedTask = task;
        this.binder.read(task);
    }

    async saveTask() {
        const task = await this.binder.submitTo(save);
        if (task) {
            const index = this.tasks.findIndex(t => task.id === t.id);
            if (index >= 0) {
                this.tasks[index] = task;
                this.selectedTask = undefined;
                this.tasks = [...this.tasks]; // force update
            } else {
                this.tasks = [...this.tasks, task];
            }
            this.binder.clear();
        }
    }

    async removeTask() {
        const task = this.binder.model.valueOf();
        await remove(task);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.binder.clear();
        this.selectedTask = undefined;
    }

    async firstUpdated() {
        const tasks = await getAllTasks();
        this.tasks = tasks;
    }
}
