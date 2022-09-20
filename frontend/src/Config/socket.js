import io from 'socket.io-client'

const socket = io('http://localhost:8801/')
const userData = JSON.parse(localStorage.getItem('userData'))
socket.auth = {token: userData.token, market: userData.market}

export default socket
