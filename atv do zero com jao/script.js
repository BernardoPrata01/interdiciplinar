
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


const loginArea = document.getElementById("loginArea");
const criarConta = document.getElementById("CriarConta");
const BotaoCriar = document.getElementById("Criar");

BotaoCriar.addEventListener("click", function() {
    loginArea.classList.add("escondido");
    criarConta.classList.add("ativa");
});

const voltarLogin = document.getElementById("VoltarLogin");

voltarLogin.addEventListener("click", function() {
    criarConta.classList.remove("ativa");
    loginArea.classList.remove("escondido");
});

const BotaoEntrar = document.getElementById("Entrar");

const EmailLogin = document.getElementById("EmailLogin");
const SenhaLogin = document.getElementById("SenhaLogin");
const LembrarCheck = document.getElementById("LembrarCheck");

const emailSalvo = localStorage.getItem("emailLembrado");

if (emailSalvo) {
    EmailLogin.value = emailSalvo;
    LembrarCheck.checked = true;
}

BotaoEntrar.addEventListener("click", function() {

    const email = EmailLogin.value.trim();
    const senha = SenhaLogin.value;

    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha!");
        return;
    }

    if (LembrarCheck.checked) {
        localStorage.setItem("emailLembrado", email);
    } else {
        localStorage.removeItem("emailLembrado");
    }

    window.location.href = "Produtos.html";

});

const BotaoCadastrar = document.getElementById("Cadastrar");

BotaoCadastrar.addEventListener("click", function() {

    const NomeInput = document.getElementById("NomeCadastro");
    const EmailInput = document.getElementById("EmailCadastro");
    const EnderecoInput = document.getElementById("EnderecoCadastro");
    const SenhaInput = document.getElementById("SenhaCadastro");
    const ConfirmarSenha = document.getElementById("ConfirmarNovaSenha");

    const nome = NomeInput.value.trim();
    const email = EmailInput.value.trim().toLowerCase();
    const endereco = EnderecoInput.value.trim();
    const senha = SenhaInput.value;
    const confirmarSenha = ConfirmarSenha.value;

    if (
        nome === "" ||
        email === "" ||
        endereco === "" ||
        senha === "" ||
        confirmarSenha === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais!");
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("endereco", endereco);

    if (LembrarCheck.checked) {
        localStorage.setItem("emailLembrado", email);
    }

    alert("Conta cadastrada com sucesso!");

    window.location.href = "Produtos.html";

});


function formartar_telefone() {

    const campo_de_digitação_telefone = document.getElementById("telefone");
    let telefone_digitado = campo_de_digitação_telefone.value;

    if (telefone_digitado[0] != undefined) {
        if (campo_de_digitação_telefone.value[0] != "(") {
            telefone_digitado = "(" + telefone_digitado[0];
            campo_de_digitação_telefone.value = telefone_digitado;
        }
    }

    if (telefone_digitado[3] != undefined) {
        if (campo_de_digitação_telefone.value[3] != ")") {
            telefone_digitado = telefone_digitado.slice(0, 3) + ")" + telefone_digitado[3];
            campo_de_digitação_telefone.value = telefone_digitado;
        }
    }

    if (telefone_digitado[8] != undefined) {
        if (campo_de_digitação_telefone.value[8] != "-") {
            telefone_digitado = telefone_digitado.slice(0, 8) + "-" + telefone_digitado[8];
            campo_de_digitação_telefone.value = telefone_digitado;
        }
    }
}
