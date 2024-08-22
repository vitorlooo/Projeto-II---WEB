export class LivroDto {
    id: number;
    titulo: string;
    autor: string;
    categoriaId: number;

    constructor(id: any, titulo: any, autor: any, categoriaId: any) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.categoriaId = categoriaId;
    }
}
