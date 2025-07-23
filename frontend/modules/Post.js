export default class Post {
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

        const assuntoInput = this.form.querySelector('input[name="assunto"]');
        assuntoInput.addEventListener('blur', (e) => this.validateAssunto(e));
    }

    validateAssunto(e) {
        const assuntoInput = e.target; // já é o input
        this.clearErrors(assuntoInput.parentElement);

        if (assuntoInput.value.trim() === '') { //comparação do trim é diferente de lenght porque o trim '' elimina espaços vazios. espaços vazios no lenght contam como caractere 
            this.showError(assuntoInput, 'O assunto está vazio.');
        }
    }

    validate(e) {
        debugger;
        const el = e.target;
        const textoInput = el.querySelector('textarea[name="texto"]');
        const assuntoInput = el.querySelector('input[name="assunto"]'); //poderia ter feito colocando id no elemento. querySelector#id ou getElementById

        let error = false;

        this.clearErrors(el);

        if (assuntoInput.value.trim() === '') {
            this.showError(assuntoInput, 'O assunto não pode estar vazio.')
            error = true;
        }

        if (textoInput.value.trim() === '') {
            const flag = confirm('O corpo do post está vazio. Deseja prosseguir?');
            if (flag === false) 
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

