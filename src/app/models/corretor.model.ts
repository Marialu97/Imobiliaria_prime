export class Corretor {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senha: string,
    public permissao: string 
  ) {}

  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      permissao: this.permissao
    };
  }

  static fromMap(map: any): Corretor {
    return new Corretor(
      map.id,
      map.nome,
      map.email,
      map.senha,
      map.permissao
    );
  }
}
