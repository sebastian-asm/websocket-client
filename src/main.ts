import { connectToServer } from './socket-client'

import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NestJS + WebSocket</h1>
  </div>
`

connectToServer()
