import { connectToServer } from './socket-client'

import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NestJS + WebSocket</h1>
    <h4>Estado del Servidor: <span id="server-status"></span></h4>
    <p><em>Clientes conectados</em></p>
    <ul id="clients-connected"></ul>
  </div>
`

connectToServer()
