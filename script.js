//Validação do email no index.html
function validarEmail() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    if (email === '') {
        alert('Por favor, digite um endereço de e-mail.');
        return false;
    }

    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        alert('Por favor, digite um e-mail válido.');
        return false;
    }

    // Adiciona um alerta de "Login feito com sucesso!" se o e-mail for válido
    alert('Login feito com sucesso!');

    // Retorna true para permitir o redirecionamento para "selecao_curso.html"
    return true;
}

//Busca a Turma na seção turma para registro de ocorrências 
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var turma = urlParams.get('turma');
    if (turma) {
        document.getElementById('h1_index').innerText = 'Turma ' + turma;
    }
});

function selecionarBotao(elemento) {
    elemento.querySelector('.button_link').classList.toggle('selected');
}

function atribuirOcorrencias() {
    var botoes = document.querySelectorAll('.button_link');

    var ocorrenciasSelecionadas = Array.from(botoes).filter(function(botao) {
        return botao.classList.contains('selected');
    });

    var ocorrenciasNomes = ocorrenciasSelecionadas.map(function(botao) {
        return botao.getAttribute('data-ocorrencia');
    });

    console.log('Ocorrências selecionadas:', ocorrenciasNomes);
}

function confirmarOperacao() {
    // Exibe um alerta com a opção "Tem certeza que deseja realizar essa operação?"
    var confirmacao = confirm("Tem certeza que deseja realizar essa operação?");

    // Verifica se o usuário clicou em "Sim"
    if (confirmacao) {
        // Exibe um alerta com "Operação feita com sucesso"
        alert("Operação feita com sucesso");
    }
}