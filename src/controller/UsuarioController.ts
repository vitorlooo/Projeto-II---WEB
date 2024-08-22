import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {
    private usuarioService = new UsuarioService();

    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário criado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto);
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.deletarUsuario(dto);
            return success(200, new BasicResponseDto("Usuário deletado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarUsuarioPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.filtrarUsuarioById(id);
            if (usuario) {
                return success(200, new BasicResponseDto("Usuário encontrado!", usuario));
            } else {
                return notFound(400, new BasicResponseDto("Usuário não encontrado.", undefined));
            }
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosUsuarios(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios = await this.usuarioService.listarTodosUsuarios();
            return success(200, new BasicResponseDto("Usuários listados com sucesso!", usuarios));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
