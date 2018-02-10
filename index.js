const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan')

app.use(bodyParser.json());
app.use(morgan('tiny'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  let amount = persons.length;
  let dateNow = new Date();
  res.send(`<p>puhelinluettelossa on ${amount} henkilön numero</p>
    <p>${dateNow}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * 1000000000000000);
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
      }

    const personsNames = persons.map(p => p.name)

      if (personsNames.includes(body.name)) {
        return response.status(400).json({ error: 'name is already in use' })
      }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
