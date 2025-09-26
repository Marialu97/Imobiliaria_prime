export class Interessado {
  constructor(
    public id?: string,
    public clienteId?: number,
    public imovelId?: number
  ) {}

  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      clienteId: this.clienteId,
      imovelId: this.imovelId
    };
  }

  static fromMap(map: any): Interessado {
    return new Interessado(
      map.id,
      map.clienteId,
      map.imovelId
    );
  }
}
