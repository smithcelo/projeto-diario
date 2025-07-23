import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        // Submit do formulário
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });

        // Blur individual para validação por campo
        const emailInput = this.form.querySelector('input[name="email"]');
        const passwordInput = this.form.querySelector('input[name="password"]');
        const confirmPasswordInput = this.form.querySelector('input[name="confirmPassword"]');

        emailInput.addEventListener('blur', (e) => this.validateEmail(e));
        passwordInput.addEventListener('blur', (e) => this.validatePassword(e));
        confirmPasswordInput.addEventListener('blur', (e) => this.validateConfirmPassword(e));
    }

    validateEmail(e) {
        const emailInput = e.target; // já é o input
        this.clearErrors(emailInput.parentElement);

        if (!validator.isEmail(emailInput.value)) {
            this.showError(emailInput, 'Email inválido.');
        }
    }

    validatePassword(e) {
        const passwordInput = e.target;
        this.clearErrors(passwordInput.parentElement);

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.showError(passwordInput, 'A senha deve conter entre 3 a 50 caracteres.');
        }
    }

    validateConfirmPassword(e) {
        const confirmPasswordInput = e.target;
        const passwordInput = this.form.querySelector('input[name="password"]');

        this.clearErrors(confirmPasswordInput.parentElement);

        if (confirmPasswordInput.value !== passwordInput.value) {
            this.showError(confirmPasswordInput, 'As senhas devem ser iguais.');
        }
    }

    validate(e) {
        debugger;
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const confirmPasswordInput = el.querySelector('input[name="confirmPassword"]');

        let error = false;

        this.clearErrors(el);

        if (!validator.isEmail(emailInput.value)) {
            this.showError(emailInput, 'Email inválido.');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.showError(passwordInput, 'A senha deve conter entre 3 a 50 caracteres.');
            error = true;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            this.showError(confirmPasswordInput, 'As senhas devem ser iguais.');
            error = true;
        }

        if (!error) {
            el.submit();
            console.log('oie');
        }
    }

    showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.innerText = message;
        input.parentElement.appendChild(errorDiv);
    }

    clearErrors(form) {
        const errorMessages = form.querySelectorAll('.alert');
        errorMessages.forEach(error => error.remove());
    }
}

