import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CategoriaService } from "../service/CategoriaService";
import { CategoriaRequestDto } from "../model/dto/CategoriaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaDto } from "../model/dto/CategoriaDto";

@Route("categoria")
@Tags("Categoria")
export class CategoriaController extends Controller {
    private categoriaService = new CategoriaService();

    @Post()
    async cadastrarCategoria(
        @Body() dto: CategoriaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.cadastrarCategoria(dto);
            return success(201, new BasicResponseDto("Categoria criada com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.atualizarCategoria(dto);
            return success(200, new BasicResponseDto("Categoria atualizada com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const { id } = dto; // Extraí o ID do DTO
            await this.categoriaService.deletarCategoria(id);
            return success(200, new BasicResponseDto("Categoria deletada com sucesso!", undefined));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarCategoriaPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.filtrarCategoriaById(id);
            return success(200, new BasicResponseDto("Categoria encontrada!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async filtrarCategoriaPorNome(
        @Query() name: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categorias = await this.categoriaService.filtrarCategoriaByName(name);
            if (categorias.length > 0) {
                return success(200, new BasicResponseDto("Categorias encontradas!", categorias));
            } else {
                return notFound(400, new BasicResponseDto("Nenhuma categoria encontrada com o nome fornecido.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodasCategorias(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categorias = await this.categoriaService.listarTodasCategorias();
            return success(200, new BasicResponseDto("Categorias listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
