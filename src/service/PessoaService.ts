import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {
    private pessoaRepository = new PessoaRepository();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { name, email } = pessoaData;
        const pessoa = new PessoaEntity(undefined, name, email);
        return await this.pessoaRepository.insertPessoa(pessoa);
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, name, email } = pessoaData;
        const pessoa = new PessoaEntity(id, name, email);
        return await this.pessoaRepository.updatePessoa(pessoa);
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, name, email } = pessoaData;
        const pessoa = new PessoaEntity(id, name, email);
        return await this.pessoaRepository.deletarPessoa(pessoa);
    }

    async filtrarPessoaById(id: number): Promise<PessoaEntity | null> {
        return await this.pessoaRepository.filterPessoaById(id);
    }

    async filtrarPessoaByName(name: string): Promise<PessoaEntity[]> {
        return await this.pessoaRepository.filterPessoaByName(name);
    }

    async listarTodasPessoas(): Promise<PessoaEntity[]> {
        return await this.pessoaRepository.filterAllPessoas();
    }
}
