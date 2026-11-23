
const botaoTema = document.getElementById("TemaBotao");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "claro") {
    document.body.classList.add("modo-claro");
    botaoTema.textContent = "🌙 Modo escuro";
    botaoTema.setAttribute("aria-label", "Ativar modo escuro");
    botaoTema.setAttribute("aria-pressed", "true");
}

botaoTema.addEventListener("click", function() {

    const modoClaro = document.body.classList.toggle("modo-claro");

    if (modoClaro) {
        localStorage.setItem("tema", "claro");
        botaoTema.textContent = "🌙 Modo escuro";
        botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        botaoTema.setAttribute("aria-pressed", "true");
    } else {
        localStorage.setItem("tema", "escuro");
        botaoTema.textContent = "☀️ Modo claro";
        botaoTema.setAttribute("aria-label", "Ativar modo claro");
        botaoTema.setAttribute("aria-pressed", "false");
    }

});


const EmailInput = document.getElementById("EmailInput");
const EndereçoInput = document.getElementById("EndereçoInput");
const NomeInput = document.getElementById("NomeInput");

NomeInput.value = localStorage.getItem("nome") || "";
EmailInput.value = localStorage.getItem("email") || "";
EndereçoInput.value = localStorage.getItem("endereco") || "";

function salvarPerfil() {
    localStorage.setItem("nome", NomeInput.value);
    localStorage.setItem("email", EmailInput.value);
    localStorage.setItem("endereco", EndereçoInput.value);
}

NomeInput.addEventListener("input", salvarPerfil);
EmailInput.addEventListener("input", salvarPerfil);
EndereçoInput.addEventListener("input", salvarPerfil);


const carrinho = document.getElementById("carrinho");
const botaoCarrinho = document.getElementById("CarrinhoLink");
const fecharCarrinho = document.getElementById("FecharCarrinho");

const produtosCarrinho = document.getElementById("ProdutosCarrinho");
const totalCarrinho = document.getElementById("TotalCarrinho");

function carregarCarrinho() {
    try {
        const dadosSalvos = JSON.parse(localStorage.getItem("carrinho") || "[]");

        if (!Array.isArray(dadosSalvos)) {
            return [];
        }

        return dadosSalvos.filter(function(produto) {
            return (
                produto &&
                typeof produto.nome === "string" &&
                typeof produto.imagem === "string" &&
                Number.isFinite(Number(produto.preco)) &&
                Number.isInteger(Number(produto.quantidade)) &&
                Number(produto.quantidade) > 0
            );
        }).map(function(produto) {
            return {
                nome: produto.nome,
                preco: Number(produto.preco),
                imagem: produto.imagem,
                quantidade: Number(produto.quantidade)
            };
        });

    } catch (erro) {
        console.error("Erro ao carregar carrinho:", erro);
        return [];
    }
}

let itensCarrinho = carregarCarrinho();

function salvarCarrinho() {
    try {
        localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
    } catch (erro) {
        console.error("Erro ao salvar carrinho:", erro);
    }
}

if (
    carrinho &&
    botaoCarrinho &&
    fecharCarrinho &&
    produtosCarrinho &&
    totalCarrinho
) {

    botaoCarrinho.addEventListener("click", function () {
        carrinho.classList.add("Ativado");
    });

    fecharCarrinho.addEventListener("click", function () {
        carrinho.classList.remove("Ativado");
    });

    function formatarPreco(valor) {

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }

    function atualizarCarrinho() {

        salvarCarrinho();

        produtosCarrinho.innerHTML = "";

        if (itensCarrinho.length === 0) {

            produtosCarrinho.innerHTML =
                '<p id="CarrinhoVazio">Seu carrinho ainda está vazio.</p>';

            totalCarrinho.textContent = "R$ 0,00";

            return;
        }

        itensCarrinho.forEach(function (produto, indice) {

            const elementoProduto = document.createElement("div");

            elementoProduto.classList.add("ItemCarrinho");

            elementoProduto.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">

                <div class="InfoItemCarrinho">

                    <div class="TopoItemCarrinho">
                        <h3>${produto.nome}</h3>

                        <button class="RemoverItem"
                            data-acao="remover"
                            data-indice="${indice}">
                            X
                        </button>
                    </div>

                    <p>${formatarPreco(produto.preco)} cada</p>

                    <div class="ControleQuantidade">

                        <button data-acao="diminuir"
                            data-indice="${indice}">−</button>

                        <span>${produto.quantidade}</span>

                        <button data-acao="aumentar"
                            data-indice="${indice}">+</button>

                        <strong>${formatarPreco(produto.preco * produto.quantidade)}</strong>

                    </div>

                </div>
            `;

            produtosCarrinho.appendChild(elementoProduto);

        });

        let valorTotal = 0;

        itensCarrinho.forEach(function (produto) {

            valorTotal += produto.preco * produto.quantidade;

        });

        totalCarrinho.textContent = formatarPreco(valorTotal);

    }

    const botoesAdicionar = document.querySelectorAll("#Produtos li button");

    botoesAdicionar.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const elementoProduto = botao.closest("li");

            const nomeProduto = elementoProduto.querySelector("h2").textContent.trim();

            const precoTexto = elementoProduto.querySelector("h4").textContent;

            const precoProduto = Number(
                precoTexto.replace("R$", "").trim().replace(/\./g, "").replace(",", ".")
            );

            const imagemProduto = elementoProduto.querySelector("img").getAttribute("src");

            const produtoExistente = itensCarrinho.find(function (produto) {

                return produto.nome === nomeProduto;

            });

            if (produtoExistente) {

                produtoExistente.quantidade++;

            } else {

                itensCarrinho.push({

                    nome: nomeProduto,
                    preco: precoProduto,
                    imagem: imagemProduto,
                    quantidade: 1

                });

            }

            atualizarCarrinho();

        });

    });

    produtosCarrinho.addEventListener("click", function (evento) {

        const botao = evento.target.closest("button[data-acao]");

        if (!botao) {
            return;
        }

        const indice = Number(botao.dataset.indice);
        const acao = botao.dataset.acao;

        if (!Number.isInteger(indice) || !itensCarrinho[indice]) {
            return;
        }

        if (acao === "aumentar") {

            itensCarrinho[indice].quantidade++;

        }

        if (acao === "diminuir") {

            itensCarrinho[indice].quantidade--;

            if (itensCarrinho[indice].quantidade <= 0) {

                itensCarrinho.splice(indice, 1);

            }

        }

        if (acao === "remover") {

            itensCarrinho.splice(indice, 1);

        }

        atualizarCarrinho();

    });

    atualizarCarrinho();

}
