// Falso banco de dados de clientes, em memória RAM
var clientes = []
var academias = []
var estilosTreino = []

// guarda o cliente ou estilo de treino que está sendo alterado
var clienteAlterado = null
var estiloAlterado = null

function mostrarModal(idModal) {
    const modal = document.getElementById(idModal)
    modal.style.display = "block"
}

function ocultarModal(idModal) {
    const modal = document.getElementById(idModal)
    modal.style.display = "none"
}

function adicionarCliente() {
    clienteAlterado = null // marca que está adicionando um cliente
    limparFormularioCliente()
    mostrarModal("modalCliente")
}

function adicionarEstilo() {
    estiloAlterado = null // marca que está adicionando um estilo
    limparFormularioEstilo()
    mostrarModal("modalEstilo")
}

function alterarCliente(cpf) {
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i]
        if (cliente.cpf == cpf) {
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("peso").value = cliente.peso
            document.getElementById("altura").value = cliente.altura
            document.getElementById("dataNascimento").value = cliente.dataNascimento
            document.getElementById("sapato").value = cliente.sapato
            document.getElementById("academia").value = cliente.gym.id
            clienteAlterado = cliente
            mostrarModal("modalCliente")
        }
    }
}

function alterarEstilo(id) {
    for (let i = 0; i < estilosTreino.length; i++) {
        let estilo = estilosTreino[i]
        if (estilo.id == id) {
            document.getElementById("nomeEstilo").value = estilo.nome
            document.getElementById("descricaoEstilo").value = estilo.descricao
            estiloAlterado = estilo
            mostrarModal("modalEstilo")
        }
    }
}

function excluirCliente(cpf) {
    if (confirm("Deseja realmente excluir este body builder?")) {
        fetch('http://localhost:3000/body-builder/' + cpf, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(() => {
            alert("Excluído com sucesso")
            carregarClientes()
        }).catch((error) => {
            alert("Erro ao excluir")
        })
    }
}

function excluirEstilo(id) {
    if (confirm("Deseja realmente excluir este estilo de treino?")) {
        fetch('http://localhost:3000/training-style/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(() => {
            alert("Excluído com sucesso")
            carregarEstilos()
        }).catch((error) => {
            alert("Erro ao excluir")
        })
    }
}

function salvarCliente() {
    let novoBodyBuilder = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        sapato: document.getElementById("sapato").value,
        idAcademia: document.getElementById("academia").value
    }

    if (clienteAlterado == null) {
        fetch('http://localhost:3000/body-builder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(novoBodyBuilder)
        }).then(() => {
            alert("Cadastrado com sucesso")
        }).catch((error) => {
            alert("Erro ao cadastrar")
        })
    } else {
        fetch('http://localhost:3000/body-builder/' + clienteAlterado.cpf, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(novoBodyBuilder)
        }).then(() => {
            alert("Alterado com sucesso")
        }).catch((error) => {
            alert("Erro ao alterar")
        })
    }

    ocultarModal("modalCliente")
    limparFormularioCliente()
    carregarClientes()
    return false
}

function salvarEstilo() {
    let novoEstilo = {
        nome: document.getElementById("nomeEstilo").value,
        descricao: document.getElementById("descricaoEstilo").value
    }

    if (estiloAlterado == null) {
        fetch('http://localhost:3000/training-style', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(novoEstilo)
        }).then(() => {
            alert("Cadastrado com sucesso")
        }).catch((error) => {
            alert("Erro ao cadastrar")
        })
    } else {
        fetch('http://localhost:3000/training-style/' + estiloAlterado.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(novoEstilo)
        }).then(() => {
            alert("Alterado com sucesso")
        }).catch((error) => {
            alert("Erro ao alterar")
        })
    }

    ocultarModal("modalEstilo")
    limparFormularioEstilo()
    carregarEstilos()
    return false
}

function limparFormularioCliente() {
    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("altura").value = ""
    document.getElementById("dataNascimento").value = ""
    document.getElementById("sapato").value = ""
}

function limparFormularioEstilo() {
    document.getElementById("nomeEstilo").value = ""
    document.getElementById("descricaoEstilo").value = ""
}

function atualizarListaClientes() {
    let tbody = document.getElementById("tbodyClientes")
    tbody.innerHTML = ""
    for (let cliente of clientes) {
        let linhaTabela = document.createElement("tr")
        linhaTabela.innerHTML = `
            <td>${cliente.gym.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.peso}kg</td>
            <td>${cliente.altura}m</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.sapato}</td>
            <td>
                <button onclick="alterarCliente('${cliente.cpf}')">Alterar</button>
                <button onclick="excluirCliente('${cliente.cpf}')">Excluir</button>
            </td>`
        tbody.appendChild(linhaTabela)
    }
}

function atualizarListaEstilos() {
    let tbody = document.getElementById("tbodyEstilos")
    tbody.innerHTML = ""
    for (let estilo of estilosTreino) {
        let linhaTabela = document.createElement("tr")
        linhaTabela.innerHTML = `
            <td>${estilo.id}</td>
            <td>${estilo.nome}</td>
            <td>${estilo.descricao}</td>
            <td>
                <button onclick="alterarEstilo(${estilo.id})">Alterar</button>
                <button onclick="excluirEstilo(${estilo.id})">Excluir</button>
            </td>`
        tbody.appendChild(linhaTabela)
    }
}

function carregarClientes() {
    fetch('http://localhost:3000/body-builder', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }).then((response) => response.json())
    .then((data) => {
        clientes = data
        atualizarListaClientes()
    }).catch((error) => {
        alert("Erro ao carregar clientes")
    })
}
function carregarEstilos() {
    fetch('http://localhost:3000/training-style', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }).then((response) => response.json())
    .then((data) => {
        estilosTreino = data
        atualizarListaEstilos()
    }).catch((error) => {
        alert("Erro ao carregar estilos de treino")
    })
}
function carregarAcademias() {
    fetch('http://localhost:3000/gym', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        const selectAcademia = document.getElementById("academia");
        selectAcademia.innerHTML = ""; // Limpa as opções anteriores

        // Adiciona uma opção padrão
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Selecione uma academia";
        selectAcademia.appendChild(defaultOption);

        // Preenche as opções com os dados recebidos
        data.forEach(academia => {
            const option = document.createElement("option");
            option.value = academia.id; // Assume que o backend retorna um campo 'id'
            option.textContent = academia.nome; // Assume que o backend retorna um campo 'nome'
            selectAcademia.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar academias:", error);
        alert("Erro ao carregar academias.");
    });
}
