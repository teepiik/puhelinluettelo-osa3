const mongoose = require("mongoose");

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url =
  "mongodb://person:pepeson@ds227858.mlab.com:27858/phonebook-fullstack";

mongoose.connect(url);

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

/* ei toimi
const format = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }
*/

module.exports = Person