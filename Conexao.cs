using System;
using MySql.Data.MySqlClient;

namespace atvfinal_3Etapa_Gabriel Andrade e Bernado prata
{//Gabriel Andrade Bernador Prata
//2E1
    public class Conexao
    {
        public MySqlConnection conectarBD()
        {
            MySqlConnection conn;

            string dadosConexao = "Persist Security Info = false; " +
                                  "server = localhost; " +
                                  "database = db_delivery; " +
                                  "uid = root; " +
                                  "pwd = 123456;";

            try
            {
                conn = new MySqlConnection(dadosConexao);
                conn.Open();
                return conn;
            }
            catch (MySqlException ex)
            {
                throw new Exception("Conexão não estabelecida: " + ex.Message);
            }
        }
    }
}
