let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
let historico = JSON.parse(localStorage.getItem("historico")) || []

function salvar(){

localStorage.setItem("pedidos",JSON.stringify(pedidos))
localStorage.setItem("historico",JSON.stringify(historico))

}

function addPedido(){

let id = document.getElementById("pedidoId").value
let cliente = document.getElementById("cliente").value
let endereco = document.getElementById("endereco").value
let complemento = document.getElementById("complemento").value


if(id.length < 8){

alert("ID precisa ter no mínimo 8 dígitos")
return

}

let pedido = {

id,
cliente,
endereco,
complemento,
data:new Date().toLocaleString()

}

pedidos.push(pedido)

salvar()

render()

}


function copiar(id){

navigator.clipboard.writeText(id)

alert("ID copiado")

}


function abrirModal(){

document.getElementById("modal").style.display="flex"

}


function fecharModal(){

document.getElementById("modal").style.display="none"

}


function editar(index){

let p = pedidos[index]

let novoCliente = prompt("Cliente",p.cliente)

let novoEndereco = prompt("Endereço",p.endereco)

let novoComplemento = prompt("Complemento",p.complemento)

pedidos[index].cliente = novoCliente
pedidos[index].endereco = novoEndereco
pedidos[index].complemento = novoComplemento

salvar()

render()

}


function finalizar(index){

let pedido = pedidos[index]

historico.push(pedido)

pedidos.splice(index,1)

salvar()

render()

}



function render(){

let lista = document.getElementById("lista")

lista.innerHTML=""


pedidos.forEach((p,i)=>{


lista.innerHTML += `

<div class="card">

<h3>Pedido ${p.id}</h3>

<p><b>Cliente:</b> ${p.cliente}</p>

<p><b>Endereço:</b> ${p.endereco}</p>

<p><b>Complemento:</b> ${p.complemento}</p>


<div class="botoes">

<button onclick="abrirModal()">Confirmar pelo iFood</button>

<button onclick="copiar('${p.id}')">Copiar ID</button>

<button onclick="editar(${i})">Editar</button>

<button class="finalizar" onclick="finalizar(${i})">Finalizar Pedido</button>

</div>

</div>

`

})


let h = document.getElementById("historico")

h.innerHTML=""


historico.slice().reverse().forEach(p=>{


h.innerHTML += `

<div class="card">

<h3>Pedido ${p.id}</h3>

<p><b>Cliente:</b> ${p.cliente}</p>

<p><b>Endereço:</b> ${p.endereco}</p>

<p><b>Complemento:</b> ${p.complemento}</p>

<p><b>Finalizado:</b> ${p.data}</p>

</div>

`

})


document.getElementById("contador").innerHTML=

`
🚚 Em andamento: ${pedidos.length}
📦 Finalizados: ${historico.length}
`

}


render()