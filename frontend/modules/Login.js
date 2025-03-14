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
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
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
