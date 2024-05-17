import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 7000;

const httpServer = createServer();

const socketServer = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:3000",
    }
});

socketServer.on('connection', (socket) => {
    console.log(socket);
})

httpServer.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})