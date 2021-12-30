import {css, html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {DatePicker, DatePickerDate} from "@vaadin/vaadin-date-picker";
import {format as dateFnsFormat, parse as dateFnsParse} from 'date-fns'

type ToDoItem = {
    text: string,
    completed: boolean,
    due: Date | undefined
}

/**
 * Sources form the Lit tutorial.
 */
@customElement('todo-due')
export class ToDoDueList extends LitElement {
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
    listItems: ToDoItem[] = [
        {text: 'Start Lit tutorial', completed: true, due: new Date()},
        {text: 'Make to-do list', completed: false, due: undefined}
    ];


    @query("#newitem")
    input!: HTMLInputElement;

    @query("#due")
    datePicker!: DatePicker;

    @property()
    hideCompleted = false;

    override firstUpdated() {
        const formatDate = (dateParts: DatePickerDate): string => {
            const {year, month, day} = dateParts;
            const date = new Date(year, month, day);

            return dateFnsFormat(date, 'dd.MM.yyyy');
        };

        const parseDate = (inputValue: string): DatePickerDate => {
            const date = dateFnsParse(inputValue, 'dd.MM.yyyy', new Date());

            return {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()};
        };

        this.datePicker.i18n = {
            // An array with the full names of months starting
            // with January.
            monthNames: [
                'Januar', 'Februar', 'März', 'April', 'Mai',
                'Juni', 'Juli', 'August', 'September',
                'Oktober', 'November', 'Dezember'
            ],

            // An array of weekday names starting with Sunday. Used
            // in screen reader announcements.
            weekdays: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ],

            // An array of short weekday names starting with Sunday.
            // Displayed in the calendar.
            weekdaysShort: [
                'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'
            ],

            // An integer indicating the first day of the week
            // (0 = Sunday, 1 = Monday, etc.).
            firstDayOfWeek: 0,

            // Used in screen reader announcements along with week
            // numbers, if they are displayed.
            week: 'Woche',

            // Translation of the Calendar icon button title.
            calendar: 'Kalender',

            // Translation of the Today shortcut button text.
            today: 'Heute',

            // Translation of the Cancel button text.
            cancel: 'Abbruch',

            clear: 'Zurücksetzen',

            formatDate: formatDate,
            parseDate: parseDate,

            // A function to format given `monthName` and
            // `fullYear` integer as calendar title string.
            formatTitle: (monthName, fullYear) => {
                return monthName + ' ' + fullYear;
            }
        }
        this.datePicker.clearButtonVisible = true;
    }

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
                            >${item.text} ${this._due(item)}
                            </li>`
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
            <vaadin-date-picker id="due" placeholder="fällig bis"></vaadin-date-picker>
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

    private _due(item: ToDoItem) {
        return item.due ? `(${dateFnsFormat(item.due, 'dd.MM.yyyy')})` : '';
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
        const due = this.datePicker.value ? dateFnsParse(this.datePicker.value, 'yyyy-MM-dd', new Date()) : undefined;

        this.listItems.push({text: this.input.value, completed: false, due: due});
        this.input.value = '';
        this.requestUpdate();
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'todo-due': ToDoDueList;
    }
}
