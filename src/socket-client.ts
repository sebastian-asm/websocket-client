import { Manager, Socket } from 'socket.io-client'

export const connectToServer = (token: string) => {
  const url = 'http://localhost:3001/socket.io/socket.io.js'
  const manager = new Manager(url, {
    extraHeaders: {
      authorization: token
    }
  })
  // el / representa el namespace, este caso el root
  const socket = manager.socket('/')
  serverStatus(socket)
}

const serverStatus = (socket: Socket) => {
  // ! indica que es un elemento que siempre va a existir
  const status = document.querySelector('#server-status')!
  const clientsList = document.querySelector('#clients-connected')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
  const clientsMessages = document.querySelector<HTMLUListElement>('#clients-messages')!

  // on: escuchar eventos del servidor
  socket.on('connect', () => (status.textContent = 'Conectado'))
  socket.on('disconnect', () => (status.textContent = 'Desconectado'))
  socket.on('clients-updated', (clients: string[]) => {
    let addClient = ''
    for (const client of clients) addClient += `<li>${client}</li>`
    clientsList.innerHTML = addClient
  })

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (messageInput.value.trim() === '') return
    // emit: emitir o "hablarle" al servidor
    socket.emit('message-client', messageInput.value)
    messageInput.value = ''
  })

  socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
    const newMessage = document.createElement('li')
    newMessage.innerHTML = `<strong>${payload.fullName}:</strong> ${payload.message}`
    clientsMessages.append(newMessage)
  })
}
