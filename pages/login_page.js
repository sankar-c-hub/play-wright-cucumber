import { BasePage } from './base_page.js';

export class LoginPage extends BasePage {

    constructor(page) {
        super(page); // 🔥 very important
    }

    get Birthpop() {
        return this.getElement('Login', 'Birthpop');
    }
    get loginicon() {
        return this.getElement('Login', 'loginiconID');
    }

    get BeforeloginButton() {
        return this.getElement('Login', 'BeforeloginButtonXPATH');
    }

    get loginwithEmailButton() {
        return this.getElement('Login', 'loginwithEmailButtonXPATH');
    }

    get usernameInput() {
        return this.getElement('Login', 'usernameInputXPATH');
    }

    get passwordInput() {
        return this.getElement('Login', 'passwordInputXPATH');
    }

    get loginButton() {
        return this.getElement('Login', 'loginButtonXPATH');
    }

    get logoutButton() {
        return this.getElement('Login', 'logoutButtonXPATH');
    }
}
