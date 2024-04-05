let listaSorteio = [];
let limiteLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function mensagemInicial(){
    exibirTexto('h1','Número Secreto');
    exibirTexto('p','Escolha um número de 1 a 10:');
    console.log(numeroSecreto);
    document.getElementById('reiniciar').setAttribute('disabled',true);
    limparCampo();
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (!chute){
        alert("Digite um valor de 1 a 10!");
    }

    else if (chute==numeroSecreto){
        exibirTexto('h1','Acertou!');
        let palavraTentativas = tentativas==1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `O número secreto era ${numeroSecreto}!<br>Você descobriu com ${tentativas} ${palavraTentativas}.`;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled',true);
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
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random()*10+1);
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