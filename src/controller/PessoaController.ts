import { PessoaService } from "../service/PessoaService";
import { PessoaRequestDto } from "../model/dto/PessoaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PessoaDto } from "../model/dto/PessoaDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("pessoa")
@Tags("Pessoa")
export class PessoaController extends Controller {
    private pessoaService = new PessoaService();

    @Post()
    async cadastrarPessoa(
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.cadastrarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa criada com sucesso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarPessoa(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.atualizarPessoa(dto);
            return success(200, new BasicResponseDto("Pessoa atualizada com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarPessoa(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.deletarPessoa(dto);
            return success(200, new BasicResponseDto("Pessoa deletada com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarPessoaPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.filtrarPessoaById(id);
            if (pessoa) {
                return success(200, new BasicResponseDto("Pessoa encontrada!", pessoa));
            } else {
                return notFound(400, new BasicResponseDto("Pessoa não encontrada", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async filtrarPessoaPorNome(
        @Query() name: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas = await this.pessoaService.filtrarPessoaByName(name);
            return success(200, new BasicResponseDto("Pessoas encontradas!", pessoas));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodasPessoas(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas = await this.pessoaService.listarTodasPessoas();
            return success(200, new BasicResponseDto("Pessoas listadas com sucesso!", pessoas));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}