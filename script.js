function gerarContrato(e) {
    e.preventDefault(); // Correção da chamada do método preventDefault

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
    // Exibindo o contrato na página
    const divContrato = document.getElementById('contratoTexto');
    divContrato.style.display = 'block'; // Torna a div visível
    divContrato.textContent = contrato; // Adiciona o texto do contrato à div

    // Mostrando o botão de download e adicionando funcionalidade
    const btnDownload = document.getElementById('baixarContrato');
    btnDownload.style.display = 'inline-block'; // Torna o botão visível
    btnDownload.onclick = function () {
        downloadContrato(contrato, 'Contrato.txt'); // Função de download ao clicar
    };
}

function downloadContrato(texto, nomeArquivo) {
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    elemento.setAttribute('download', nomeArquivo);

    elemento.style.display = 'none';
    document.body.appendChild(elemento);

    elemento.click();

    document.body.removeChild(elemento);
}