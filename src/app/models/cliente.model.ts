import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";

export class Cliente {
    id?: string | null;
    nomeRazao?: string | null;
    fantasiaApelido?: string | null;
    cpfCnpj?: string | null;
    rg?: string | null;
    inscricaoEstadual?: string | null;
    dataNascimento?: string | null;
    sexo?: string | null;
    email?: string | null;
    telefones?: Array<Telefone>;
    enderecos?: Array<Endereco>;

    constructor() {
        this.id = null;
        this.nomeRazao = null;
        this.fantasiaApelido = null;
        this.cpfCnpj = null;
        this.inscricaoEstadual = '';
        this.dataNascimento = null;
        this.sexo = null;
        this.email = null;
        this.telefones = new Array<Telefone>();
        this.enderecos = new Array<Endereco>();
    }
}