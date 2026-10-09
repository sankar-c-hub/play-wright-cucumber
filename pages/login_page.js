const { BasePage } = require('./base_page.js');

class LoginPage extends BasePage {

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

    get loginLink() {
        return this.getElement('Login', 'loginLinkXPATH');
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

    get userAccountLink() {
        return this.getElement('Login', 'userAccountLinkXPATH');
    }

    get customerInfoHeading() {
        return this.getElement('Login', 'customerInfoHeadingXPATH');
    }

    get logoutButton() {
        return this.getElement('Login', 'logoutButtonXPATH');
    }

    get errorMessage() {
        return this.getElement('Login', 'errorMessageXPATH');
    }

    get emailValidationError() {
        return this.getElement('Login', 'emailValidationErrorXPATH');
    }

    get rememberMeCheckbox() {
        return this.getElement('Login', 'rememberMeCheckboxXPATH');
    }

    get forgotPasswordLink() {
        return this.getElement('Login', 'forgotPasswordLinkXPATH');
    }

    getUserAccountLink(email) {
        if (email) {
            return this.page.locator(`//a[contains(@class,'account') and normalize-space()='${email}'] | //a[normalize-space()='${email}']`);
        }
        return this.userAccountLink;
    }
}

module.exports = { LoginPage };
