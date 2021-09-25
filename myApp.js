// For MongoDB and Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((e) => console.log("Connected"))
  .catch((e) => console.err(e))

const {Schema} = mongoose;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods:[String]
  });


var Person = mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Fuat",
    age: 22,
    favoriteFoods: ["apple", "banana"]
  })

  person.save((err, data) => err ? done(err) : done(null, data));
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, data) => {
    err ? done(err) : ""
    data.favoriteFoods.push(foodToAdd)
    data.save( (err, data) => {
      err ? done(err) : done(null, data)
    })    
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},
    (err, data) => {
      err ? done(err) : done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
