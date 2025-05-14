// /server.js
const http = require("http");

const host = 'localhost';
const port = 8000;

const handler = (req, res) => {
    res.writeHead(200);
    res.end('JavaScript - классный язык программирования!');
};

const server = http.createServer(handler);
server.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});