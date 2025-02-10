import { io } from 'socket.io-client';

// Remplacez l'URL par celle de votre serveur Node.js
const socket = io('http://localhost:4000', {
    reconnection: true, // Autoriser les reconnexions
    reconnectionAttempts: 3, // Nombre maximum de tentatives
    reconnectionDelay: 1000, // Temps entre les tentatives (en ms)
    });

export default socket;
