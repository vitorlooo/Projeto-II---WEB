export class PessoaDto{
    id: number;
    name: string;
    email: string;

    constructor(id: any, name: string, email: string){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}