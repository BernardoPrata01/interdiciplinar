using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace atvfinal_3Etapa_Gabriel Andrade e Bernado prata
{ //Gabriel Andrade Bernador Prata
  //2E1
    public partial class FrmPedidos : Form
    {
        
        private const string caminhoPastaSite = @"C:\caminho\da\pasta\do\site";

        public FrmPedidos()
        {
            InitializeComponent();
        }
       
        private void FrmPedidos_Load(object sender, EventArgs e)
        {
            ListarPedidos();
        }

        private void ListarPedidos()
        {
            try
            {
                Conexao banco = new Conexao();
                MySqlConnection conn = banco.conectarBD();

                string sql = "SELECT * FROM pedidos";
                MySqlCommand cmd = new MySqlCommand(sql, conn);

                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                dgvPedidos.DataSource = dt;
                conn.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao buscar pedidos: " + ex.Message);
            }
        }

        private void btnImportar_Click(object sender, EventArgs e)
        {
            try
            {
                string textoJson;
                DirectoryInfo pasta = new DirectoryInfo(caminhoPastaSite);
                FileInfo[] arquivos = pasta.GetFiles("*.json");

                if (arquivos.Length > 0)
                {
                    FileInfo arquivoMaisRecente = arquivos.OrderByDescending(f => f.LastWriteTime).First();
                    textoJson = File.ReadAllText(arquivoMaisRecente.FullName);

                    PedidoJson pedidoDoSite = JsonSerializer.Deserialize<PedidoJson>(textoJson);

                    Conexao banco = new Conexao();
                    MySqlConnection conexaoAberta = banco.conectarBD();

                    string query = "INSERT INTO pedidos (codigo_pedido, nome_cliente, total, status) VALUES (@codigo, @cliente, @total, 'Pendente')";

                    MySqlCommand cmd = new MySqlCommand(query, conexaoAberta);

                    cmd.Parameters.AddWithValue("@codigo", pedidoDoSite.PedidoId);
                    cmd.Parameters.AddWithValue("@cliente", pedidoDoSite.Cliente.Nome);
                    cmd.Parameters.AddWithValue("@total", pedidoDoSite.Total);

                    cmd.ExecuteNonQuery();

                    conexaoAberta.Close();

                    MessageBox.Show($"Pedido {pedidoDoSite.PedidoId} foi importado com sucesso!");
                    ListarPedidos();
                }
                else
                {
                    MessageBox.Show("Nenhum arquivo .json encontrado na pasta do site.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao importar pedido: " + ex.Message);
            }
        }
    }
}