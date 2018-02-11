const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

const url =
  "mongodb://person:pois@ds227858.mlab.com:27858/phonebook-fullstack";

mongoose.connect(url);

const formatPerson = person => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

// get all
app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(formatPerson));
  });
});

app.get("/info", (req, res) => {
  let amount = persons.length;
  let dateNow = new Date();
  res.send(`<p>puhelinluettelossa on ${amount} henkilön numero</p>
    <p>${dateNow}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 1000000000000000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: "number missing" });
  }


  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  person.save().then(savedPerson => {
    response.json(formatPerson(savedPerson));
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
