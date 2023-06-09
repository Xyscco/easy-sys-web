export class Produto {
    id?: string | null;
    descricao?: string | null;
    valor?: number;
    estoque?: number;

    constructor() {
        this.id = null;
        this.descricao = null;
        this.valor = 0;
        this.estoque = 0;
    }
}