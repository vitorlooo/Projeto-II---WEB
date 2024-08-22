import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { PessoaRepository } from "../repository/PessoaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    private usuarioRepository = new UsuarioRepository();
    private pessoaRepository = new PessoaRepository();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha } = usuarioData;

        const pessoa = await this.pessoaRepository.filterPessoaById(idPessoa);
        if (!pessoa) {
            throw new Error(`Pessoa com ID ${idPessoa} não existe.`);
        }

        const usuario = new UsuarioEntity(undefined, idPessoa, senha);
        return await this.usuarioRepository.insertUsuario(usuario);
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha);
        await this.usuarioRepository.updateUsuario(usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha);
        await this.usuarioRepository.deletarUsuario(usuario);
        return usuario;
    }

    async filtrarUsuarioById(id: number): Promise<UsuarioEntity | null> {
        return await this.usuarioRepository.filterusuarioById(id);
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.filterAllUsuarios();
    }
}
