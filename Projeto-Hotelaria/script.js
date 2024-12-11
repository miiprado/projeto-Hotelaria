// ========== Classes ==========

// Classe Quartos
class Quartos {
    constructor(nome, numero, preco, disponibilidade) {
        this.nome = nome;
        this.numero = numero;
        this.preco = preco;
        this.disponibilidade = disponibilidade;
    }
}

// Classe Reserva
class Reserva {
    constructor(cliente, quarto, checkIn, checkOut) {
        this.cliente = cliente;
        this.quarto = quarto;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
}

// Classe Usuario
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

// ========== Variáveis Globais ==========

let quartos = [];
let reservas = [];
let usuarios = [];
let usuarioLogado = null;
let funcionarioLogado = null;

// Lista de funcionários fictícios
const jsonString = '[{"id":1,"nome":"Ana","cpf":1,"email":"ana@example.com","senha":"12345" },{"id":2,"nome":"Carlos","cpf":30,"email":"carlos@example.com","senha":"54321"}]';
const listaFuncionarios = JSON.parse(jsonString);

// Preços e nomes dos quartos
const nomesQuartos = ["Suite Luxo", "Suite Master", "Suite Simples", "Suite Presidencial", "Suite Executiva", "Suite Econômica", "Family Suite"];
const precosPorNome = {
    "Suite Luxo": 250,
    "Suite Master": 300,
    "Suite Simples": 150,
    "Suite Presidencial": 500,
    "Suite Executiva": 350,
    "Family Suite": 400,
};

// ========== Inicialização de Quartos ==========

function inicializarQuartos() {
    let nomeIndex = 0;

    for (let andar = 1; andar <= 5; andar++) {
        let numInicio = andar * 100;
        let numFim = numInicio + 5;

        for (let numQuarto = numInicio; numQuarto <= numFim; numQuarto++) {
            let nomeQuarto = nomesQuartos[nomeIndex % nomesQuartos.length];
            let preco = precosPorNome[nomeQuarto];
            let novoQuarto = new Quartos(nomeQuarto, numQuarto, preco, "livre");
            quartos.push(novoQuarto);
            nomeIndex++;
        }
    }
}
inicializarQuartos();

// ========== Funções de Usuários ==========

function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
}

function carregarUsuarios() {
    const reservasSalvas = localStorage.getItem('reservas')
    if(reservasSalvas) reservas= JSON.parse(reservasSalvas);
     
    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) usuarios = JSON.parse(usuariosSalvos);

    const clientesalvo = localStorage.getItem("usuarioLogado")
    if (clientesalvo) usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const FuncSalvo = localStorage.getItem("funcionarioLogado")
    if (FuncSalvo) funcionarioLogado = JSON.parse(localStorage.getItem("funcionarioLogado"));
}
carregarUsuarios();
salvarUsuarios()

function realizarCadastro(nome, cpf, data, endereco, email, telefone, senha) {
    const novoUsuario = new Usuario(nome, cpf, data, endereco, email, telefone, senha);
    usuarios.push(novoUsuario);
    salvarUsuarios();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login.html";
}

function realizarLogin(email, senha) {
    carregarUsuarios()
    usuarioLogado = usuarios.find(user => user.email === email && user.senha === senha);
    funcionarioLogado = listaFuncionarios.find(func => func.email === email && func.senha === senha);

    if (usuarioLogado) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
        window.location.href = "cliente/sobre.html";
        return

    } else if (funcionarioLogado) {
        alert("Login de funcionário realizado com sucesso!");
        localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
        window.location.href = "funcionario/sobreFunc.html";
        return
    } else {
        alert("Login inválido!");
        return
    }
}

function fazerLogout() {
    usuarioLogado = null;
    funcionarioLogado = null;
    salvarUsuarios();
    alert("Logout realizado.");
    window.location.href = "../inicio.html";
}

function atualizarDados(novaSenha, novoEndereco, novoEmail, novoTelefone) {
    if (!usuarioLogado) {
        alert("Faça login para continuar.");
        return;
    }

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }
    // Filtrar o usuário logado
    usuarios = usuarios.filter(c => !(c.nome === usuarioLogado.nome && c.cpf === usuarioLogado.cpf && c.senha === usuarioLogado.senha));

    // Atualizar os dados do usuário logado
    if (novaSenha) usuarioLogado.senha = novaSenha;
    if (novoEndereco) usuarioLogado.endereco = novoEndereco;
    if (novoTelefone) usuarioLogado.telefone = novoTelefone;
    if (novoEmail) usuarioLogado.email = novoEmail;

    // Adicionar o usuário atualizado à lista de usuários
    const novoUsuario = new Usuario(
        usuarioLogado.nome,
        usuarioLogado.cpf,
        usuarioLogado.data,
        usuarioLogado.endereco,
        usuarioLogado.email,
        usuarioLogado.telefone,
        usuarioLogado.senha
    );

    usuarios.push(novoUsuario);
    // Salvar usuários atualizados no localStorage
    salvarUsuarios();
    alert('Dados atualizados com sucesso');
}
//ATUALIZAR CLIENTE VIA FUNCIONARIO
function AtualizarDadosCliente(hospedeSelecionado,novaSenha,novoEmail,novoEndereco,novoTelefone) {
    if (!funcionarioLogado) {
        alert("Faça login para continuar.");
        return;
    }

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }
    // Filtrar o usuário logado
   const usuario = usuarios.find(c => c.cpf === hospedeSelecionado.cpf);
    usuarios = usuarios.filter(c => !(c.cpf === hospedeSelecionado.cpf));
    // Atualizar os dados do hospede
    if (novaSenha) usuario.senha = novaSenha;
    if (novoEndereco) usuario.endereco = novoEndereco;
    if (novoTelefone) usuario.telefone = novoTelefone;
    if (novoEmail) usuario.email = novoEmail;

    // Adicionar o usuário atualizado à lista de usuários
    const novoUsuario = new Usuario(
        usuario.nome,
        usuario.cpf,
        usuario.data,
        usuario.endereco,
        usuario.email,
        usuario.telefone,
        usuario.senha
    );

    usuarios.push(novoUsuario);
    // Salvar usuários atualizados no localStorage
    salvarUsuarios();
    alert('Dados atualizados com sucesso');
    return;
}
function excluirCadastro() {
    if (!usuarioLogado) {
        return alert("é necessario estar logado para exluir seu cadastro")
    }
    carregarUsuarios()
    salvarUsuarios()
    usuarios= usuarios.filter(a=>(!usuarios.cpf === usuarioLogado.cpf))
    salvarUsuarios()
    window.location.href = "../inicio.html"
}

function excluirCadastroCliente() {
    if (!funcionarioLogado) {
        return alert("faça login para continuar")
    }
    const hospedeSelecionado = document.getElementById("selecionarHospedeExcluir").value//recebe o cpf do usuario selecionado
    const hospede = usuarios.find(c => c.cpf == hospedeSelecionado)
    if (hospede) {
        usuarios = usuarios.filter(c => !(c.nome === hospede.nome && c.cpf === hospede.cpf && c.senha === hospede.senha));
        alert("O cadastro do Hospede foi excluido ")
        return;
    } else {
        return alert("Hospede não encontrado")
    }
}
// ========== Funções de Reservas ==========

function calcularPreco() {
    const tipoQuarto = document.getElementById("tipoQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);

    if (checkOut <= checkIn) {
        alert("A data de check-out deve ser maior que a de check-in!");
        return;
    }

    const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const precoTotal = dias * precosPorNome[tipoQuarto];

    document.getElementById("precoTotal").textContent = `Preço total: R$ ${precoTotal}`;
    document.getElementById("confirmarReserva").style.display = "flex";
    document.getElementById("cancelarReserva").style.display = "flex";
}
function confirmarReservaHospede() {
    if (funcionarioLogado) {
        const tipoQuarto = document.getElementById("tipoQuarto").value;
        const checkIn = new Date(document.getElementById("checkIn").value);
        const checkOut = new Date(document.getElementById("checkOut").value);
        const hospedeSelecionado = document.getElementById("selecionarHospede").value

        const cliente = usuarios.find(c => c.cpf == hospedeSelecionado)
        const novaReserva = new Reserva(cliente, tipoQuarto, checkIn, checkOut);
        reservas.push(novaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert("Reserva criada do cliente com sucesso!");

    } else {
        alert("faça login para continuar")
        window.location.href = "../login.html";

    }
}
function confirmarReserva() {
    const tipoQuarto = document.getElementById("tipoQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);

    if (usuarioLogado) {
        const novaReserva = new Reserva(usuarioLogado, tipoQuarto, checkIn, checkOut);
        reservas.push(novaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert("Reserva criada com sucesso!");
    } else {
        alert("Faça login para continuar.");
        window.location.href = "../login.html";
    }
}
function cancelarReserva() {
    document.getElementById("formReserva").reset();
    document.getElementById("precoTotal").textContent = "";
    document.getElementById("confirmarReserva").style.display = "none";
    document.getElementById("cancelarReserva").style.display = "none";
}



// ========== Manipulação do DOM ==========

document.addEventListener("DOMContentLoaded", () => {
exibirReservas()
    // Chamar função após DOM estar completamente carregado }
    const formularioCadastro = document.getElementById("cadastroUsuario");
    if (formularioCadastro) {
        formularioCadastro.addEventListener("submit", event => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const data = document.getElementById('data-nascimento').value;
            const endereco = document.getElementById('endereco').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const senha = document.getElementById('senha').value;


            function checkInputCPF(cpf) {
                let usuario
                for (usuario of usuarios) {
                    if (usuario.cpf === cpf) {
                        alert(`o CPF ${cpf} já está cadastrado no sistema`)
                        
                        return false
                    }

                } return true
            }

            function checkInputEmail(email) {
                let usuario
                // Verifica se o campo email está vazio
                if (!email) {
                    alert("Digite seu email");
                    return false;
                }
            
                // Valida o formato do email
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(email)) {
                    alert("Insira um email válido");
                    return false;
                }
            
                // Verifica se o email já está cadastrado
                for ( usuario of usuarios) {
                    if (usuario.email === email) {
                        alert(`O email ${email} já está cadastrado no sistema`);
                        return false;
                    }
                }
            
                // Se todas as verificações passarem
                return true;
            }


            if (!checkInputCPF(cpf) || !checkInputEmail(email)) {
                return;
            }

            realizarCadastro(nome, cpf, data, endereco, email, telefone, senha);

        });
    
    }

    const formularioLogin = document.getElementById("formularioLogin");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", event => {
            event.preventDefault();
            const email = document.getElementById("email_login").value;
            const senha = document.getElementById("senha_login").value;
            realizarLogin(email, senha);
        });
    }

    const atualizarDadosForm = document.getElementById("atualizarDadosForm");
    if (atualizarDadosForm) {

        atualizarDadosForm.addEventListener("submit", event => {
            event.preventDefault();
            const novaSenha = document.getElementById('att_senha').value;
            const novoEndereco = document.getElementById('att_endereco').value;
            const novoTelefone = document.getElementById('att_telefone').value;
            const novoEmail = document.getElementById('att_email').value;
            atualizarDados(novaSenha, novoEndereco, novoEmail, novoTelefone);
        });
    }

    const atualizarDadosFormCliente = document.getElementById("AtualizarDadosCliente");
    if (atualizarDadosFormCliente) {
        atualizarDadosFormCliente.addEventListener("submit", event => {
            event.preventDefault();

            const hospedeSelecionado = document.getElementById("selecionarHospedeAtt").value;
            const nova_Senha = document.getElementById('att-senha').value;
            const novo_Endereco = document.getElementById('att-endereco').value;
            const novo_Telefone = document.getElementById('att-telefone').value;
            const novo_Email = document.getElementById('att-email').value;
            AtualizarDadosCliente(hospedeSelecionado,nova_Senha,novo_Email,novo_Endereco,novo_Telefone);
        });
    }
    
});


// ================ CONTABILIDADE =================



carregarUsuarios();

const calcularButton = document.getElementById('calcular');
const confirmarButton = document.getElementById('confirmar');
const valorTotalSpan = document.getElementById('valorTotal');

calcularButton.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const restaurante = document.getElementById('restaurante');
    const frigobar = document.getElementById('frigobar');

    // Verifica se o usuário existe
    const usuario = usuarios.find(user => user.email === email && user.cpf === cpf);
    if (!usuario) {
        alert('Usuário não encontrado!');
        return;
    }

    // Calcula o valor total
    let valorTotal = 0;
    if (restaurante.checked) valorTotal += parseInt(restaurante.value);
    if (frigobar.checked) valorTotal += parseInt(frigobar.value);

    valorTotalSpan.textContent = `${valorTotal}$`;

    // Exibe o botão Confirmar se houver valor
    if (valorTotal > 0) {
        confirmarButton.style.display = 'inline';
    } else {
        confirmarButton.style.display = 'none';
    }
});

confirmarButton.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const restaurante = document.getElementById('restaurante');
    const frigobar = document.getElementById('frigobar');

    // Verifica se o usuário existe
    const usuario = usuarios.find(user => user.email === email && user.cpf === cpf);
    if (!usuario) {
        alert('Usuário não encontrado!');
        return;
    }

    // Calcula o valor total
    let valorTotal = 0;
    if (restaurante.checked) valorTotal += parseInt(restaurante.value);
    if (frigobar.checked) valorTotal += parseInt(frigobar.value);

    // Atualiza o valor da conta do usuário
    usuarioLogado = usuario;
    usuarioLogado.conta = (usuarioLogado.conta || 0) + valorTotal;
    salvarUsuarios();

    alert(`Valor de ${valorTotal}$ vinculado à conta do usuário.`);
    confirmarButton.style.display = 'none';
    valorTotalSpan.textContent = '0$';
});



//  ========= Validações ========


