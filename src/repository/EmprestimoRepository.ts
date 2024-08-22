import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository {

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
    CREATE TABLE IF NOT EXISTS emprestimo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        livroId INT NOT NULL,
        usuarioId INT NOT NULL,
        dataEmprestimo DATE NOT NULL,
        dataDevolucao DATE NOT NULL,
        FOREIGN KEY (livroId) REFERENCES livro(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (usuarioId) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
        `;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de empréstimo criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar a tabela de empréstimo:', err);
        }
    }

    async insertEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "INSERT INTO emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [
                emprestimo.livroId,
                emprestimo.usuarioId,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao
            ]);
            console.log('Empréstimo inserido com sucesso, ID:', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return emprestimo;
        } catch (err) {
            console.error('Erro ao inserir empréstimo:', err);
            throw err;
        }
    }

    async updateEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "UPDATE emprestimo SET livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?";

        try {
            await executarComandoSQL(query, [
                emprestimo.livroId,
                emprestimo.usuarioId,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.id
            ]);
            console.log('Empréstimo atualizado com sucesso, ID:', emprestimo.id);
            return emprestimo;
        } catch (err: any) {
            console.error(`Erro ao atualizar o empréstimo de ID ${emprestimo.id}:`, err);
            throw err;
        }
    }

    async deleteEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "DELETE FROM emprestimo WHERE id = ?";

        try {
            await executarComandoSQL(query, [emprestimo.id]);
            console.log('Empréstimo deletado com sucesso, ID:', emprestimo.id);
            return emprestimo;
        } catch (err: any) {
            console.error(`Erro ao deletar o empréstimo de ID ${emprestimo.id}:`, err);
            throw err;
        }
    }

    async filterEmprestimoById(id: number): Promise<EmprestimoEntity | null> {
        const query = "SELECT * FROM emprestimo WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                return resultado[0];
            }
            return null;
        } catch (err: any) {
            console.error(`Erro ao buscar empréstimo de ID ${id}:`, err);
            throw err;
        }
    }

    async filterAllEmprestimos(): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM emprestimo";

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Todos os empréstimos foram listados com sucesso');
            return resultado;
        } catch (err: any) {
            console.error('Erro ao listar todos os empréstimos:', err);
            throw err;
        }
    }
}
