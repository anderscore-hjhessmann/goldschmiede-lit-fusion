import {makeAutoObservable} from 'mobx';

import {
    login as serverLogin,
    logout as serverLogout,
} from '@hilla/frontend';
import {crmStore} from './app-store';

class Message {
    constructor(public text = '', public error = false, public open = false) {
    }
}

export class UiStore {
    loggedIn = true;
    message = new Message();

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async login(username: string, password: string) {
        const result = await serverLogin(username, password);
        if (!result.error) {
            this.setLoggedIn(true);
        } else {
            throw new Error(result.errorMessage || 'Login failed');
        }
    }

    async logout() {
        await serverLogout();
        this.setLoggedIn(false);
    }

    setLoggedIn(loggedIn: boolean) {
        this.loggedIn = loggedIn;
        if (loggedIn) {
            crmStore.initFromServer();
        }
    }

    showSuccess(message: string) {
        this.showMessage(message, false);
    }

    showError(message: string) {
        this.showMessage(message, true);
    }

    clearMessage() {
        this.message = new Message();
    }

    private showMessage(text: string, error: boolean) {
        this.message = new Message(text, error, true);
        setTimeout(() => this.clearMessage(), 5000);
    }
}