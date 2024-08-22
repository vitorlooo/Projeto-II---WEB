import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class EmprestimoEntity{
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string){
        this.validatesInformation(livroId, usuarioId, dataEmprestimo, dataDevolucao);
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }

    private validatesInformation(livroId: any, usuarioId: any, dataEmprestimo: any, dataDevolucao: any){
        let error ='';
        if (typeof livroId !== 'number' || typeof usuarioId !== 'number' || typeof dataEmprestimo !== 'string' || typeof dataDevolucao !== 'string'){
            error += ("Informações incompletas ou incorretas. ");
        }

        if(!verificaFormatoData(dataDevolucao || dataEmprestimo)){
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
        
}
