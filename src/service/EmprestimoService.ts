import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EmprestimoService{

    emprestimoRepository: EmprestimoRepository = new EmprestimoRepository();
    usuarioRepository: UsuarioRepository = new UsuarioRepository();
    livroRepository: LivroRepository = new LivroRepository();

    async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
       
        const usuario = await this.usuarioRepository.filterusuarioById(usuarioId);
        if (!usuario) {
            throw new Error(`usuario com ID ${usuarioId} não existe.`);
        }

        const livro = await this.livroRepository.filterLivroById(livroId);
        if (!livro) {
            throw new Error(`livro com ID ${livroId} não existe.`);
        }


        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao);
        return await this.emprestimoRepository.insertEmprestimo(emprestimo);
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao)

        await this.emprestimoRepository.updateEmprestimo(emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao)
        await this.emprestimoRepository.deleteEmprestimo(emprestimo)
        return emprestimo;
    }

    async filtrarEmprestimoById(id: number): Promise<EmprestimoEntity | null> {
        return await this.emprestimoRepository.filterEmprestimoById(id);
    }


    async listarTodosEmprestimo(): Promise<EmprestimoEntity[]> {
        return await this.emprestimoRepository.filterAllEmprestimos();
    }

}