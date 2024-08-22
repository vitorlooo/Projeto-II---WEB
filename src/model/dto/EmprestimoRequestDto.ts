export class EmprestimoRequestDto{
    livroId: number;
    usuarioId: number;
    dataEmprestimo: string;
    dataDevolucao: string;

    constructor(livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string){
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = (dataEmprestimo || '');
        this.dataDevolucao =(dataDevolucao || '');
    }
}