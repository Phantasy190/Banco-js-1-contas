class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoDataAniversario = document.querySelector('#data_aniversario');
        const elementoContas = document.querySelector('#contas');
    
        const tipoConta = elementoContas.value;

        let conta;

        if (tipoConta === 'conta') {
            conta = new Conta(elementoNumero.value, Number(elementoSaldo.value));
        }

        else if (tipoConta === 'conta_bonificada') {
            conta = new ContaBonificada(elementoNumero.value, Number(elementoSaldo.value), elementoDataAniversario.value);
        } 
        
        else if (tipoConta === 'poupança') {
            conta = new ContaPoupança(elementoNumero.value, Number(elementoSaldo.value), elementoDataAniversario.value);
        }

        console.log(conta);
        this.repositorioContas.adicionar(conta);
        this.inserirContaNoHTML(conta);
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
