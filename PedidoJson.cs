using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace atvfinal_3Etapa_Gabriel Andrade e Bernado prata
{  //Gabriel Andrade Bernador Prata
    //2E1
    internal class Clientes
    {
        [JsonPropertyName("nome")]
        public string Nome { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("endereco")]
        public string Endereco { get; set; }
    }
  
    internal class Item
    {
        [JsonPropertyName("nome")]
        public string Nome { get; set; }

        [JsonPropertyName("preco")]
        public decimal Preco { get; set; }

        [JsonPropertyName("quantidade")]
        public int Quantidade { get; set; }
    }

    internal class PedidoJson
    {
        [JsonPropertyName("pedido_id")]
        public string PedidoId { get; set; }

        [JsonPropertyName("data")]
        public DateTime Data { get; set; }

        [JsonPropertyName("cliente")]
        public Clientes Cliente { get; set; }

        [JsonPropertyName("itens")]
        public List<Item> Itens { get; set; }

        [JsonPropertyName("total")]
        public decimal Total { get; set; }
    }
}