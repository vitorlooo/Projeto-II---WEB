import { executarComandoSQL } from "../database/mysql";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class PessoaRepository {
    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
    CREATE TABLE IF NOT EXISTS pessoa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )`;

        try {
            await executarComandoSQL(query, []);
            console.log('Tabela "pessoa" criada com sucesso ou já existe.');
        } catch (err) {
            console.error('Erro ao criar a tabela "pessoa":', err);
        }
    }

    async insertPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "INSERT INTO pessoa (name, email) VALUES (?, ?)";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.name, pessoa.email]);
            pessoa.id = resultado.insertId;
            console.log('Pessoa inserida com sucesso, ID ', pessoa.id);
            return pessoa;
        } catch (err) {
            console.error('Erro ao inserir a pessoa: ', err);
            throw err;
        }
    }

    async updatePessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "UPDATE pessoa SET name = ?, email = ? WHERE id = ?";
        try {
            await executarComandoSQL(query, [pessoa.name, pessoa.email, pessoa.id]);
            console.log('Pessoa atualizada com sucesso, ID: ', pessoa.id);
            return pessoa;
        } catch (err: any) {
            console.error(`Erro ao atualizar a pessoa de ID ${pessoa.id}: ${err}`);
            throw err;
        }
    }

    async deletarPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "DELETE FROM pessoa WHERE id = ?";
        try {
            await executarComandoSQL(query, [pessoa.id]);
            console.log('Pessoa deletada com sucesso: ', pessoa);
            return pessoa;
        } catch (err: any) {
            console.error(`Falha ao deletar pessoa de ID ${pessoa.id}: ${err}`);
            throw err;
        }
    }

    async filterPessoaById(id: number): Promise<PessoaEntity | null> {
        const query = "SELECT * FROM pessoa WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new PessoaEntity(row.id, row.name, row.email);
            } else {
                return null; // Pessoa não encontrada
            }
        } catch (err: any) {
            console.error(`Erro ao procurar a pessoa de ID ${id}: ${err}`);
            throw err;
        }
    }

    async filterPessoaByName(name: string): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM pessoa WHERE name = ?";
        try {
            const resultado = await executarComandoSQL(query, [name]);
            return resultado.map((row: any) => new PessoaEntity(row.id, row.name, row.email));
        } catch (err: any) {
            console.error(`Erro ao procurar a pessoa com nome ${name}: ${err}`);
            throw err;
        }
    }

    async filterAllPessoas(): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM pessoa";
        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado.map((row: any) => new PessoaEntity(row.id, row.name, row.email));
        } catch (err: any) {
            console.error(`Erro ao listar as pessoas: ${err}`);
            throw err;
        }
    }
}
