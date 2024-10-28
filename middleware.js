const express = require('express');
const app = express();

const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method);
    console.log("Path: ", request.path);
    console.log("Body: ", request.body);
    console.log("-----------------");
    next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
    response.send("Hola mundo!");
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running to port ${PORT}`);
});