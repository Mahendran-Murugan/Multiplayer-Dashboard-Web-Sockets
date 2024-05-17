import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 7000;

const httpServer = createServer();

const socketServer = new Server(httpServer, {
    cors: {
        origin: true,
    }
});

let playerDetails = []

socketServer.on('connection', (socket) => {
    socket.on('details', (details) => {
        playerDetails.push({ ...details, id: socket.id });
        console.log(playerDetails);
    })
    setInterval(() => {
        socket.emit('playerDetails', playerDetails);
    }, 5000);
})

httpServer.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})