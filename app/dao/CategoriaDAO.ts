import connection from "../dbConnection";

export default class CategoriaDAO {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<any> {
      const pool = await connection;
      const result = await pool.request().query(`
         SELECT * 
            FROM categorias
            ORDER BY categorias.id
            OFFSET ${this.PER_PAGE} * (${pageNumber} - 1) ROWS
            FETCH NEXT ${this.PER_PAGE} ROWS ONLY;
      `);
      return result.recordset;
   }

   public async add(categoria): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("nome", categoria.nome)
         .query("insert into categorias (nome) values (@nome);");
      return result.recordset;
   }

   public async delete(id: number): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .query("delete from categorias where id = @id;");
      return result.recordset;
   }

   public async updateNome(id: number, nome): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .input("nome", nome)
         .query("update categorias set nome = @nome where id = @id;");
      return result.recordset;
   }
}
