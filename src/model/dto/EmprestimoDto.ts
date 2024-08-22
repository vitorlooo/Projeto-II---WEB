export class EmprestimoDto{
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id: any, livroId: any, usuarioId: any, dataEmprestimo: any, dataDevolucao: any){
        this.id = id;
        this.livroId = livroId;
        this.usuarioId = usuarioId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
    }
}