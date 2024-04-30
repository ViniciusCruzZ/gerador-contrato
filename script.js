function gerarContrato(e) {
    e.preventDefault();

    let servico = {
        'contratante': {
            "nome_empresa": document.getElementById('nome_contratante').value,
            "endereco": document.getElementById('endereco_contratante').value,
            "telefone": document.getElementById('telefone_contratante').value,
            "email": document.getElementById('email_contratante').value
        },
        'contratado': {
            "nome_empresa": document.getElementById('nome_contratado').value,
            "endereco": document.getElementById('endereco_contratado').value,
            "telefone": document.getElementById('telefone_contratado').value,
            "email": document.getElementById('email_contratado').value
        },
        'descricaoServico': document.getElementById('descricao_servico').value,
        'dataInicio': document.getElementById('data_inicio').value,
        'dataTermino': document.getElementById('data_termino').value,
        'valorServico': parseFloat(document.getElementById('valor_servico').value),
        'condicaoPagamento': document.getElementById('condicaoPagamento').value,
        'estado': document.getElementById('estado').value
    };

    let contrato = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Este Contrato de Prestação de Serviços é feito e entrado em vigor na data ${servico.dataInicio}, por e entre:

Contratante:
${servico.contratante.nome_empresa}
Endereço: ${servico.contratante.endereco}
Telefone: ${servico.contratante.telefone}
E-mail: ${servico.contratante.email}

Contratado:
${servico.contratado.nome_empresa}
Endereço: ${servico.contratado.endereco}
Telefone: ${servico.contratado.telefone}
E-mail: ${servico.contratado.email}

1. Descrição dos Serviços:
O contratado realizará os seguintes serviços: ${servico.descricaoServico}.

2. Condições de Pagamento:
O pagamento pelos serviços será de R$ ${servico.valorServico.toFixed(2)} e será devido nas seguintes condições: ${servico.condicaoPagamento}.

3. Prazo do Contrato:
Este contrato terá início na ${servico.dataInicio} e terminará em ${servico.dataTermino}, a menos que seja prorrogado por acordo mútuo por escrito entre as partes.

4. Condições de Rescisão:
Este contrato pode ser rescindido por qualquer uma das partes, a qualquer momento, com aviso prévio de 7 dias, sem penalidade ou obrigação.

5. Confidencialidade:
Todas as informações fornecidas por cada parte ao outra devem ser mantidas em confidencialidade e não devem ser divulgadas a terceiros, exceto conforme exigido por lei.

6. Lei Aplicável:
Este contrato será regido e interpretado de acordo com as leis do estado de ${servico.estado}.

________________________________________________________________________________________________________

Assinaturas:

${servico.contratante.nome_empresa}

________________________

${servico.contratado.nome_empresa}

________________________

________________________________________________________________________________________________________

Data: ${new Date().toLocaleDateString()}

`;

    const divContrato = document.getElementById('contratoTexto');
    divContrato.style.display = 'block';
    divContrato.textContent = contrato;

    const btnDownload = document.getElementById('baixarContrato');
    btnDownload.style.display = 'inline-block';
    btnDownload.onclick = function () {
        const formato = document.getElementById('formatoContrato').value;
        if (formato === 'txt') {
            downloadTexto(contrato, 'Contrato.txt');
        } else if (formato === 'pdf') {
            downloadPDF(contrato, 'Contrato.pdf');
        } else if (formato === 'docx') {
            alert('Implementação do download em DOCX');
        }
    };
}

async function downloadPDF(texto, nomeArquivo) {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const textWidth = page.getFont('Helvetica').widthOfTextAtSize(texto, fontSize);

    page.drawText(texto, {
        x: (width - textWidth) / 2,
        y: height - 4 * fontSize,
        size: fontSize,
    });

    const pdfBytes = await pdfDoc.save();
    downloadBytes(pdfBytes, nomeArquivo, 'application/pdf');
}

function downloadBytes(bytes, nomeArquivo, tipo) {
    const blob = new Blob([bytes], { type: tipo });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}

function downloadTexto(texto, nomeArquivo) {
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    elemento.setAttribute('download', nomeArquivo);

    elemento.style.display = 'none';
    document.body.appendChild(elemento);

    elemento.click();

    document.body.removeChild(elemento);
}

document.getElementById('telefone_contratante').addEventListener('input', formatarTelefone);
document.getElementById('telefone_contratado').addEventListener('input', formatarTelefone);

function formatarTelefone(event) {
    const input = event.target;
    const numero = input.value.replace(/\D/g, '');
    const tamanho = numero.length;

    if (tamanho === 0) {
        input.value = '';
    } else if (tamanho <= 2) {
        input.value = '+' + numero;
    } else if (tamanho <= 4) {
        input.value = '+' + numero.slice(0, 2) + ' (' + numero.slice(2);
    } else if (tamanho <= 9) {
        input.value = '+' + numero.slice(0, 2) + ' (' + numero.slice(2, 4) + ') ' + numero.slice(4);
    } else {
        input.value = '+' + numero.slice(0, 2) + ' (' + numero.slice(2, 4) + ') ' + numero.slice(4, 9) + '-' + numero.slice(9);
    }
}

const inputValorServico = document.getElementById('valor_servico');

inputValorServico.addEventListener('input', function (event) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (valor / 100).toFixed(2);
    valor = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    event.target.value = valor;
});

document.getElementById('baixarContrato').addEventListener('click', function (e) {
    e.preventDefault();
    gerarContrato(e);
});

const btnDownloadPDF = document.getElementById('baixarContrato');
btnDownloadPDF.onclick = function () {
    downloadPDF(contrato, 'Contrato.pdf');
};