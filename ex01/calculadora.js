import { LightningElement } from 'lwc';

export default class calculatora extends LightningElement {
  result = '';

  handleClick(event) {
    const value = event.target.value;
    this.result += value;
  }

  handleClear() {
    this.result = '';
  }

  handleEquals() {
    try {
        // Avalia a expressão matemática usando a função eval e armazena o resultado em 'result'
        const result = eval(this.result);
        // Verifica se o resultado não é um número (NaN) ou se é infinito (!isFinite)
        if (isNaN(result) || !isFinite(result)) {
            // Lança um erro com a mensagem 'Não é possível' caso a expressão resulte em NaN ou infinito
            throw new Error('Não é possivi');
        }
        // Define o valor de 'result' como o resultado da expressão avaliada
        this.result = result;
    } catch (error) {
        // Em caso de erro durante a avaliação da expressão, define 'result' como 'Não é possível'
        this.result = 'Não é possivi';
    }
}
}