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
/*========================== Sequencia de Escolhas ========================*/

function selecionarCurso(curso) {
    window.location.href = `selecao_serie.html?curso=${encodeURIComponent(curso)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var curso = urlParams.get('curso');
    if (curso) {
        document.getElementById('curso_escolhido').innerText = `Curso: ${decodeURIComponent(curso)}`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var curso = urlParams.get('curso');
    var ano = urlParams.get('ano');

    if (curso !== null && ano !== null) {
        document.getElementById('escolhas_anteriores').innerText = `Curso: ${decodeURIComponent(curso)}, ${decodeURIComponent(ano)}º Ano`;
        document.getElementById('curso_escolhido').innerText = `${decodeURIComponent(curso)}, ${decodeURIComponent(ano)}º Ano`;
    }
});

/*==========================  Fim Sequencia de Escolhas ========================*/

//Busca a Turma na seção turma para registro de ocorrências 
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var turma = urlParams.get('turma');
    if (turma) {
        document.getElementById('h1_index').innerText = 'Turma ' + turma;
    }
});

//Marca a Ocorrência selecionada
function selecionarBotao(elemento) {
    var botoes = document.querySelectorAll('.button_link');

    // Desmarcar todas as ocorrências
    botoes.forEach(function(botao) {
        botao.classList.remove('selected');
    });

    // Marcar a ocorrência selecionada
    var ocorrenciaSelecionada = elemento.querySelector('.button_link');
    ocorrenciaSelecionada.classList.add('selected');
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
        // Redireciona para a página 'registro_confirmado.html'
        window.location.href = 'registro_confirmado.html';
    }
}



/*==========================SCRIPT DE BUSCA PÁGINA REGISTRO DE OCORRÊNCIAS========================*/
function filtrar(){
    var input,
    filter,
    ul,
    li,
    a,
    i,
    span, 
    txtValue,
    count = 0

    //PEGAR OS ELEMENTOS HTML
    input = document.getElementById('nome_aluno');
    ul = document.getElementById('listaAlunos');

    //FILTRO
    filter = input.value.toUpperCase();

    //PEGAR TODAS AS LI's DA LISTA
    li = ul.getElementsByTagName("li");

    //PERCORRER TODOS OS LI's
    for(i = 0; i < li.length; i++) {
        //PEGAR A TAG SPAN DO ELEMENTO PERCORRIDO
        span = li[i].getElementsByTagName("span")[0];
        //PEGAR O TEXTO DENTRO DA NOSSA TAG span
        txtValue = span.textContent || span.innerText;
        //VERIFICAR SE O QUE O USUÁRIO DIGITOU BATE COM O TEXTO DA TAG P
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            //VALOR BATEU
            li[i].style.display = "";
            //INCREMENTAR O CONTADOR
            count++
            //PEGAR A TAG SPAN DO ITEM
            span = li[i].querySelector(".item-name");
            //SE EXISTIR
            if(span){
                span.innerHTML = txtValue.replace(new RegExp(filter, "gi"),(match)=>{
                    return "<strong>" + match + "</strong>"
                })
            }
        }else{
            //NÃO MOSTRA O ITEM DA LISTA
            li[i].style.display = "none";
        }
    }
    //VERIFICANDO SE TEM ITENS NA LISTA
    if (count === 0){
        ul.style.display = "none";
    } else{
        ul.style.display = "block";
    }

}

/*=============================================================================================*/
/*===================SCRIPT ADICIONAR ALUNOS - PÁGINA REGISTRO DE OCORRÊNCIAS==================*/

function selecionarAluno(){
    var input,
    alunos,
    item_clicado,
    ul,
    li,
    input,
    textarea
    input = document.getElementById('nome_aluno');
    textarea = document.getElementById("alunos_selecionados");
    ul = document.getElementById('listaAlunos');
    li = document.getElementById("listaAlunos");
    li.addEventListener('click', function(event) {
        event.preventDefault();
        item_clicado = (event.target); // este é o elemento clicado
        alunos = item_clicado.textContent;
        //Adicionar valor ao textarea
        textarea.value = textarea.value + alunos + "\n";
        //limpar input
        input.value = "";
        ul.style.display = "none";
        window.location.reload();
        }
    )
}