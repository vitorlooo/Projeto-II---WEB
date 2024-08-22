export class UsuarioDto{
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id: any, idPessoa: any, senha: any){
        this.id = id;
        this.idPessoa = idPessoa;
        this.senha = senha;
    }
}