let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
let historico = JSON.parse(localStorage.getItem("historico")) || []

function salvar(){
localStorage.setItem("pedidos",JSON.stringify(pedidos))
localStorage.setItem("historico",JSON.stringify(historico))
}

function addPedido(){

const pedido = document.getElementById("pedido").value
const cliente = document.getElementById("cliente").value
const loja = document.getElementById("loja").value
const endereco = document.getElementById("endereco").value

if(!pedido){
alert("Informe o ID do pedido")
return
}

pedidos.push({
pedido,
cliente,
loja,
endereco,
data: new Date().toISOString()
})

document.getElementById("pedido").value=""
document.getElementById("cliente").value=""
document.getElementById("loja").value=""
document.getElementById("endereco").value=""

salvar()
render()
}

function confirmar(p){

window.open(`https://confirmacao-entrega-propria.ifood.com.br/${p.pedido}`)

historico.push(p)

pedidos = pedidos.filter(x => x.pedido !== p.pedido)

salvar()
render()
}

function remover(id){
pedidos.splice(id,1)
salvar()
render()
}

function mapa(endereco){

if(!endereco){
alert("Endereço não informado")
return
}

window.open(`https://www.google.com/maps/search/${encodeURIComponent(endereco)}`)
}

function render(){

const lista = document.getElementById("lista")
lista.innerHTML=""

pedidos.forEach((p,i)=>{

lista.innerHTML+=`
<div class="card">

<b>Pedido:</b> ${p.pedido}<br>
<b>Cliente:</b> ${p.cliente || "-"}<br>
<b>Loja:</b> ${p.loja || "-"}

<br><br>

<button onclick="mapa('${p.endereco}')">📍 Maps</button>
<button onclick='confirmar(${JSON.stringify(p)})'>✅ Confirmar</button>
<button onclick="remover(${i})">🗑 Remover</button>

</div>
`
})

const hoje = new Date().toDateString()

const entregasHoje = historico.filter(h =>
new Date(h.data).toDateString() === hoje
).length

document.getElementById("stats").innerHTML = `
📦 Entregas hoje: <b>${entregasHoje}</b> |
🚚 Em andamento: <b>${pedidos.length}</b>
`

const h = document.getElementById("historico")
h.innerHTML=""

historico.slice().reverse().forEach(p=>{

h.innerHTML+=`
<div class="card">

<b>Pedido:</b> ${p.pedido}<br>
<b>Cliente:</b> ${p.cliente || "-"}<br>
<b>Loja:</b> ${p.loja || "-"}

</div>
`
})

}

render()