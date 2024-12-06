
function calcularPreco() {
    const tipoQuarto = document.getElementById("tipoQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);

    if (checkOut <= checkIn) {
        alert("A data de check-out deve ser maior que a de check-in!");
        return;
    }

    const precoPorDia = {
        pequeno: 100,
        medio: 200,
        grande: 300
    };

    const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const precoTotal = dias * precoPorDia[tipoQuarto];

    document.getElementById("precoTotal").textContent = `Preço total: R$ ${precoTotal}`;
    document.getElementById("confirmarReserva").style.display = "flex";
    document.getElementById("cancelarReserva").style.display = "flex";
}

function cancelarReserva() {
    document.getElementById("formReserva").reset();
    document.getElementById("precoTotal").textContent = "";
    document.getElementById("confirmarReserva").style.display = "none";
    document.getElementById("cancelarReserva").style.display = "none";
}

window.addEventListener("load", function () {
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
});















// String JSON
const jsonString = '[{"id":1,"nome":"Ana","cpf":1,"email":"ana@example.com","senha":"12345" },{"id":2,"nome":"Carlos","cpf":30,"email":"carlos@example.com","senha":"54321"}]';

// Converter para Array de Objetos JavaScript
const listaFuncionarios = JSON.parse(jsonString);

let usuarios = [];

// Função para salvar os usuários no localStorage
function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Função para carregar os usuários do localStorage
function carregarUsuarios() {
    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) {
        usuarios = JSON.parse(usuariosSalvos);
    }
}

// Carregar usuários ao iniciar
carregarUsuarios();

class Usuario {
    constructor(nome, cpf, data, endereco, email, telefone, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}

// Cadastro de usuários
document.addEventListener("DOMContentLoaded", function() {
    const formularioCadastro = document.getElementById("cadastroUsuario");

    if (formularioCadastro) {
        formularioCadastro.addEventListener("submit", function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const data = document.getElementById('data-nascimento').value;
            const endereco = document.getElementById('endereco').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const senha = document.getElementById('senha').value;
            realizarCadastro(nome, cpf, data, endereco, email, telefone, senha);
        });
    }
});

function realizarCadastro(nome, cpf, data, endereco, email, telefone, senha) {
    const novoUsuario = new Usuario(nome, cpf, data, endereco, email, telefone, senha);
    usuarios.push(novoUsuario);
    salvarUsuarios(); // Salva a lista de usuários no localStorage após adicionar um novo usuário
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login.html";
}

// Login de usuários e funcionários
document.addEventListener("DOMContentLoaded", function() {
    const formularioLogin = document.getElementById("formularioLogin");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("email_login").value;
            const senha = document.getElementById("senha_login").value;
            realizarLogin(email, senha);
        });
    }
});
    let usuarioEncontrado = null;
    let funcionarioEncontrado = null;

function realizarLogin(email, senha) {
    carregarUsuarios(); // Carrega a lista de usuários do localStorage antes de realizar o login
    // Verificar usuários
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && usuarios[i].senha === senha) {
            usuarioEncontrado = usuarios[i];
            break;
        }
    }

    // Verificar funcionários
    for (let i = 0; i < listaFuncionarios.length; i++) {
        if (listaFuncionarios[i].email === email && listaFuncionarios[i].senha === senha) {
            funcionarioEncontrado = listaFuncionarios[i];
            break;
        }
    }

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "cliente/sobre.html";
    } else if (funcionarioEncontrado) {
        alert("Login de funcionário realizado com sucesso!");
        window.location.href = "funcionario/sobreFunc.html";
    } else {
        alert("Login inválido!");
    }
}