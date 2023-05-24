import io from 'socket.io-client'
const baseURL = process.env.REACT_APP_API_SOCKET_ENDPOINT || 'http://45.87.3.238'

const socket = io(baseURL)
const userData = JSON.parse(localStorage.getItem('userData'))
socket.auth = {token: userData.token, market: userData.market}

export default socket
