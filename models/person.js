const mongoose = require("mongoose");

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url =
  "mongodb://person:poistettu@ds227858.mlab.com:27858/phonebook-fullstack";

mongoose.connect(url);

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

module.exports = Person