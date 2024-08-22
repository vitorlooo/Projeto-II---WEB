export class LivroRequestDto {
    titulo: string;
    autor: string;
    categoriaId: number;

    constructor(titulo?: string, autor?: string, categoriaId?: number) {
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.categoriaId = categoriaId || 0;
    }
}
