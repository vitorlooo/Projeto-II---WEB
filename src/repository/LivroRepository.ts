import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";

export class LivroRepository {

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
    CREATE TABLE IF NOT EXISTS livro (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        categoriaId INT NOT NULL,
        FOREIGN KEY (categoriaId) REFERENCES categoria(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso: ', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(livro: LivroEntity): Promise<LivroEntity> {
        const query = "INSERT INTO livro (titulo, autor, categoriaId) VALUES (?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            });
        } catch (err: any) {
                console.error(`Falha ao inserir o livro: Categoria com ID ${livro.categoriaId} não encontrada.`);
                throw err;
            } 
                
    }

    async updateLivro(livro: LivroEntity): Promise<LivroEntity> {
        const query = "UPDATE livro SET titulo = ?, autor = ?, categoriaId = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId, livro.id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return livro;
        } catch (err: any) {
            console.error(`Erro ao atualizar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(livro: LivroEntity): Promise<LivroEntity> {
        const query = "DELETE FROM livro WHERE id = ?";

        try {
            await executarComandoSQL(query, [livro.id]);
            console.log('Livro deletado com sucesso: ', livro);
            return livro;
        } catch (err: any) {
            console.error(`Falha ao deletar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroById(id: number): Promise<LivroEntity> {
        const query = "SELECT * FROM livro WHERE id = ?";

        try {
            const [resultado] = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return resultado;
        } catch (err: any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByTitulo(titulo: string): Promise<LivroEntity[]> {
        const query = "SELECT * FROM livro WHERE titulo = ?";

        try {
            const resultado: LivroEntity[] = await executarComandoSQL(query, [titulo]);
            console.log('Livro localizado com sucesso, Título: ', titulo);
            return resultado;
        } catch (err: any) {
            console.error(`Falha ao procurar o livro com o título ${titulo} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivro(): Promise<LivroEntity[]> {
        const query = "SELECT * FROM livro";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado;
        } catch (err: any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }
}
