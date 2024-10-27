const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

process.env.PORT;

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const people = persons.length;
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${people} people</p>
     <p>${date}</p>
    `
  );
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Content missing"
    });
  }

  if(persons.some(person => person.name.toLocaleLowerCase() == body.name.toLocaleLowerCase())) {
    return response.status(409).json({
      error: "Conflict, resource is already created"
    });
  }

  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number
  }

  persons.concat(person);
  response.status(201).json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personIndex = persons.findIndex(person => person.id === id);

  if (personIndex !== -1) {
    persons.splice(personIndex, 1); // Elimina la persona del array.
    response.status(204).end();
  } else {
    response.status(404).json({erro: 'Persona no encontrada'});
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});