import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
  const url = 'http://localhost:3001/socket.io/socket.io.js'
  const manager = new Manager(url)
  // el / representa el namespace, este caso el root
  const socket = manager.socket('/')
  serverStatus(socket)
}

const serverStatus = (socket: Socket) => {
  // ! indica que es un elemento que siempre va a existir
  const status = document.querySelector('#server-status')!
  const clientsList = document.querySelector('#clients-connected')!

  // on: escuchar eventos del servidor
  // emit: "hablarle" al servidor
  socket.on('connect', () => (status.textContent = 'Conectado'))
  socket.on('disconnect', () => (status.textContent = 'Desconectado'))
  socket.on('clients-updated', (clients: string[]) => {
    let addClient = ''
    for (const client of clients) addClient += `<li>${client}</li>`
    clientsList.innerHTML = addClient
  })
}
