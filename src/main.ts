import { connectToServer } from './socket-client'

import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NestJS + WebSocket</h1>
    <h4>Estado del Servidor: <span id="server-status">Pendiente...</span></h4>
    <div>
      <input id="jwt-token" placeholder="Token..." />
      <button type="button" id="btn-connect">Entrar</button>
    </div>
    <p><em>Clientes conectados</em></p>
    <ul id="clients-connected"></ul>
    <p><em>Mensajes</em></p>
    <ul id="clients-messages"></ul>
    <form id="message-form">
      <input placeholder="Mensaje..." id="message-input" />
    </form>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim() === '') return alert('Para ingresar necesita un Token')
  connectToServer(jwtToken.value.trim())
})
