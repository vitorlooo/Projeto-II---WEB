export class UsuarioRequestDto{
    idPessoa: number;
    senha: string;

    constructor(idPessoa?: number, senha?: string){
    this.idPessoa = idPessoa || 0;
    this.senha = senha || '';
    }
}