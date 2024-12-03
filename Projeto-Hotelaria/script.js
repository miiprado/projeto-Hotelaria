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



// Cadastro de usuários
let usuarios = []

document.addEventListener("DOMContentLoaded", function() {
const formularioCadastro = document.getElementById("cadastroUsuario");
class Usuario {
    constructor(nome, cpf, data, endereco, email, telefone, senha){
    this.nome = nome
    this.cpf = cpf
    this.data = data
    this.endereco = endereco
    this.email = email
    this.telefone = telefone
    this.senha = senha
    }
}

formularioCadastro.addEventListener("submit", function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const data = document.getElementById('data-nascimento').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;

    const novoUsuario = new Usuario(nome, cpf, data, email, telefone, senha);

    usuarios.push(novoUsuario);

    alert('Usuário cadastrado com sucesso!');

})
})


// login
