//  DECLARAÇÕES DOS ELEMENTOS USANDODOM (DOCUMENT OBJECT MODEL)

const videoElemento = document.getElementById("video");
const botaoScanear = document.getElementById("btn-texto");
const resultado = document.getElementById("saida");
const canvas = document.getElementById("canvas");

// FUNÇÃO QUE VAI HABILITA A CÂMERA 

async function configurarCamera(){ // async = assincrono
    try{
        const midia = await navigator.midiaDevices.getUserMidia({
            video: {facingMode: "environment"}, // habilita sua camera traseira
            audio: false
        })
        videoElemento.srcObject - midia;
        videoElemento.play(); // garante que o video comece
    }catch(erro){
        resultado.innerText="Erro ao acessar a câmera", erro;
    }
}

// EXECUTA A FUNÇÃO DA CÂMERA
configurarCamera();

// FUNÇÃO PARA LER O TEXTO DA IMAGEM E MOSTRAR NA TELA

botaoScanear.onclick = async()=>{
    botaoScanear.disable = true; 
    resultado.innerText = "Fazendo a leitura, aguarde...";

    // chama a estrutura do canvas 
    const context = canvas.getContext("2d");

    // ajusta o tamanho da tela 
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    // reset de qualquwr transformação para garantir que a foto não fique invertida
    context.setTransform(1, 0, 1, 0, 0)

    // Aplica o filtro de contraste e escala de cinza no canvas antes de tirar a foto (ajuda a evitar letras aleatórias)
    context.filter = 'contrast(1.2) grayscale(1)';

    // contruindo tela para tirar foto
    context.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);
    try{
        // captura o texto da imagem e traduz
        const {data: { text }} = await Tesseract.recognize(
        canvas, 
        'por'
        );

        resultado.innerText = textoFinal.length > 0 ? textoFinal: "Não foi possível seu acesso"
    }catch(erro){
        console.error(erro);
        resultado.innerText = "Erro ao processar.", erro;
    }finally{
        // DESABILITA O BOTÃO PARA COMEÇAR NOVA LEITURA

        botaoScanear.disable = false;

    }

}