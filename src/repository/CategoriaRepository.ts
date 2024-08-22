import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class CategoriaRepository {

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
    CREATE TABLE IF NOT EXISTS categoria (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
        `;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar a tabela de categoria:', err);
        }
    }

    async insertCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "INSERT INTO categoria (name) VALUES (?)";

        try {
            const resultado = await executarComandoSQL(query, [categoria.name]);
            console.log('Categoria inserida com sucesso, ID:', resultado.insertId);
            categoria.id = resultado.insertId;
            return categoria;
        } catch (err) {
            console.error('Erro ao inserir a categoria:', err);
            throw err;
        }
    }

    async updateCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "UPDATE categoria SET name = ? WHERE id = ?";

        try {
            await executarComandoSQL(query, [categoria.name, categoria.id]);
            console.log('Categoria atualizada com sucesso, ID:', categoria.id);
            return categoria;
        } catch (err: any) {
            console.error(`Erro ao atualizar a categoria de ID ${categoria.id}:`, err);
            throw err;
        }
    }

    async deleteCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "DELETE FROM categoria WHERE id = ?";

        try {
            await executarComandoSQL(query, [categoria.id]);
            console.log('Categoria deletada com sucesso, ID:', categoria.id);
            return categoria;
        } catch (err: any) {
            console.error(`Erro ao deletar a categoria de ID ${categoria.id}:`, err);
            throw err;
        }
    }

    async filterCategoriaById(id: number): Promise<CategoriaEntity | null> {
        const query = "SELECT * FROM categoria WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                return resultado[0];
            }
            return null;
        } catch (err: any) {
            console.error(`Erro ao buscar categoria de ID ${id}:`, err);
            throw err;
        }
    }

    async filterCategoriaByName(name: string): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM categoria WHERE name = ?";

        try {
            const resultado = await executarComandoSQL(query, [name]);
            console.log('Categorias encontradas com o nome:', name);
            return resultado;
        } catch (err: any) {
            console.error(`Erro ao buscar categorias com o nome ${name}:`, err);
            throw err;
        }
    }

    async filterAllCategorias(): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM categoria";

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Todas as categorias foram listadas com sucesso');
            return resultado;
        } catch (err: any) {
            console.error('Erro ao listar todas as categorias:', err);
            throw err;
        }
    }
}
