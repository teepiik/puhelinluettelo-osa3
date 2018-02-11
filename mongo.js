const mongoose = require("mongoose");

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url =
  "";

mongoose.connect(url);


const Person = mongoose.model("Person", {
  name: String,
  number: String
});

if (typeof process.argv[2] !== "undefined" && process.argv[2] !== null) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  });

  person.save().then(response => {
    console.log(
      `lisättiin henkilö ${process.argv[2]}, numero ${
        process.argv[3]
      } luetteloon`
    );
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

