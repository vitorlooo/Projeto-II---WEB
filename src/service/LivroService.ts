import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class LivroService {
    livroRepository: LivroRepository = new LivroRepository();
    categoriaRepository = new CategoriaRepository();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { titulo, autor, categoriaId } = livroData;

        const categoria = await this.categoriaRepository.filterCategoriaById(categoriaId);
        if(!categoria){
            throw new Error(`Categoria com ID ${categoriaId} não encontrada.`)
        }
        const livro = new LivroEntity(undefined, titulo, autor, categoriaId);
        return await this.livroRepository.insertLivro(livro);
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);
        await this.livroRepository.updateLivro(livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);
        await this.livroRepository.deleteLivro(livro);
        return livro;
    }

    async filtrarLivroById(id: number): Promise<LivroEntity | null> {
        return await this.livroRepository.filterLivroById(id);
    }

    async filtrarLivroByTitulo(titulo: string): Promise<LivroEntity[] | null> {
        return await this.livroRepository.filterLivroByTitulo(titulo);
    }

    async listarTodosLivros(): Promise<LivroEntity[]> {
        return await this.livroRepository.filterAllLivro();
    }
}
