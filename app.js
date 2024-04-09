let listaSorteio = [];
let limiteLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function mensagemInicial(){
    exibirTexto('h1','Descubra o <br>Número Secreto!');
    exibirTexto('p','Escolha um número de 1 a 100:');
    console.log(numeroSecreto);
    document.getElementById('reiniciar').setAttribute('disabled',true);
    limparCampo();
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (!chute || chute <= 0 || chute > 100) {
        alert('Valor inválido!');
        exibirTexto('h1','Valor Inválido!');
        exibirTexto('p','Digite um valor de 1 a 100!');
    }

    else if (chute==numeroSecreto){
        exibirTexto('h1','Acertou!');
        let palavraTentativas = tentativas==1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `O número secreto era ${numeroSecreto}!<br>Você descobriu com ${tentativas} ${palavraTentativas}.`;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled',true);
        novoJogo();
    } else {
        if (chute>numeroSecreto){
            exibirTexto('h1', 'Errou!');
            let mensagemTentativas = `O número secreto é menor que ${chute}.<br>Restam ${10-tentativas} tentativas:`;
            exibirTexto('p', mensagemTentativas);
        } else {
            
            exibirTexto('h1', 'Errou!');
            let mensagemTentativas = `O número secreto é maior que ${chute}.<br>Restam ${10-tentativas} tentativas:`;
            exibirTexto('p', mensagemTentativas);
        }
        tentativas++;
        limparCampo();
    } 

    if (tentativas>10) {
        alert('Tente novamente!')
        novoJogo();
        }
}

function verificarTecla(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random()*100+1);
    let quantElement = listaSorteio.length;

    if (quantElement == limiteLista){
        listaSorteio = [];
    }

    if (listaSorteio.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    } else {
        listaSorteio.push(numeroGerado);
        console.log(listaSorteio);
        return numeroGerado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('chute').removeAttribute('disabled');
}

