import { LivroService } from "../service/LivroService";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDto } from "../model/dto/LivroDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller {
    private livroService = new LivroService();

    @Post()
    async cadastrarLivro(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.cadastrarLivro(dto);
            return success(201, new BasicResponseDto("Livro criado com sucesso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarLivro(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.atualizarLivro(dto);
            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarLivro(
        @Body() dto: LivroDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.deletarLivro(dto);
            return success(200, new BasicResponseDto("Livro deletado com sucesso!", livro));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarLivroById(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.filtrarLivroById(id);
            if (livro) {
                return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livro));
            } else {
                return notFound(400, new BasicResponseDto("Livro não encontrado.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("titulo/{titulo}")
    async filtrarLivroByTitulo(
        @Path() titulo: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.filtrarLivroByTitulo(titulo);
            if (livro) {
                return success(200, new BasicResponseDto("Livros encontrados com sucesso!", livro));
            } else {
                return notFound(400, new BasicResponseDto("Nenhum livro encontrado com o título fornecido.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosLivros(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros = await this.livroService.listarTodosLivros();
            return success(200, new BasicResponseDto("Livros listados com sucesso!", livros));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
