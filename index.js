const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.static('dist')); // Con esta linea hacemos que express pueda servir archivos estaticos desde el backend.


const Phone = require('./models/phone');

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
];

app.get('/info', (request, response) => {
  const people = persons.length;
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${people} people</p>
     <p>${date}</p>
    `
  );
});

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(person => {
    response.json(person);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(phone => {
      if (phone) {
        response.json(phone);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const phone = new Phone({
    name: body.name,
    number: body.number,
  });

  phone.save()
    .then(savedPhone => {
      response.json(savedPhone);
    })
    .catch(error => next(error));

});

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Phone.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatePhone => {
      response.json(updatePhone);
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ Error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});