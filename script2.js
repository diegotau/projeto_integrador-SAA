

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
        //PEGAR A TAG A DO ELEMENTO PERCORRIDO
        a = li[i].getElementsByTagName("a")[0];
        //PEGAR O TEXTO DENTRO DA NOSSA TAG A
        txtValue = a.textContent || a.innerText;
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
    a,
    ul,
    li,
    i,
    textarea
    //PEGAR OS ELEMENTOS DO HTML
    input = document.getElementById('nome_aluno');
    textarea = document.getElementById("alunos_selecionados");
    //PEGAR TODAS AS LI's DA LISTA
    ul = document.getElementById('listaAlunos');
    //PEGAR TODAS AS LI's DA LISTA
    li = ul.getElementsByTagName("li");
    //PEGAR A TAG A DO ELEMENTO 0 
    a = li[0].getElementsByTagName("a")[0];  //pega o index 0. precisa buscar o index do LI clicado
    //PEGAR O TEXTO DENTRO DA NOSSA TAG A
    alunos = a.textContent || a.innerText;
    //Adicionar valor ao textarea
    textarea.value = textarea.value + alunos + "\n";
    //limpar input
    input.value = "";
    ul.style.display = "none";
}

//------------------------Selecionar aluno -----------------------------------
//
document.getElementById('alunos').addEventListener('change', function () {
    var selectedAlunos = getSelectedAlunos(this);
    exibirAlunosSelecionados(selectedAlunos);
});


function getSelectedAlunos(select) {
    var selectedAlunos = [];
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
            selectedAlunos.push(select.options[i].value);
        }
    }
    return selectedAlunos;
}

function exibirAlunosSelecionados(alunos) {
    var div = document.getElementById('alunos_selecionados');
    div.innerHTML = '';

    for (var i = 0; i < alunos.length; i++) {
        div.innerHTML += alunos[i] + ';';
    }
}



//-------------------atribuindo os valores dos campos anteriores no botão submit
function confirmarOperacao() {
    var emailUsuario;
   
    //- buscando os dados do input e-mail
    document.addEventListener('DOMContentLoaded', function () {
        var emailInput = document.getElementById('email');
        emailUsuario = emailInput ? emailInput.value : null;
});

    // Coletar os dados dos campos
    var usuario = emailUsuario;
    var turma = document.getElementById('h1_index').textContent;
    var ocorrencia = document.querySelector('.button_link.selected').getAttribute('data-ocorrencia');
    var alunosSelecionados = document.getElementById('alunos_selecionados').value;

    // Construir o objeto com os dados
    var dados = {
        usuario: usuario,
        turma: turma,
        ocorrencia: ocorrencia,
        alunos: alunosSelecionados
    };

    // Realizar a requisição POST usando Fetch API
    fetch('https://api.sheetmonkey.io/form/45zAwiZCdTNBZeRn3y5ZmC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        // Exibir mensagem de sucesso ou tratar a resposta conforme necessário
        console.log('Resposta da API:', data);
        alert('Operação feita com sucesso');
    })
    .catch(error => {
        // Tratar erros de requisição
        console.error('Erro na requisição:', error);
        alert('Erro ao processar a operação');
    });
}
