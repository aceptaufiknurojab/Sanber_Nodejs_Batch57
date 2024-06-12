const people = [
  { name: "Acep", age: 26 },
  { name: "Taufik", age: 32 },
  { name: "Nurojab", age: 21 },
];
const peopleFilter = people.filter((person) => person.age > 25);
console.log(peopleFilter);
