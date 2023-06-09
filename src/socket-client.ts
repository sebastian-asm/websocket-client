import { Manager } from 'socket.io-client'

export const connectToServer = () => {
  const url = 'http://localhost:3001/socket.io/socket.io.js'
  const manager = new Manager(url)
  // el / representa el namespace, este caso el root
  const socket = manager.socket('/')
  console.log({ socket })
}
