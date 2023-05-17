export class Endereco {

    id?: string | null;
    clienteId?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    cep?: string | null;

    constructor() {
        this.id = null;
        this.clienteId = null;
        this.logradouro = null;
        this.numero = null;
        this.complemento = null;
        this.bairro = null;
        this.cidade = null;
        this.estado = null;
        this.cep = null;
    }
}