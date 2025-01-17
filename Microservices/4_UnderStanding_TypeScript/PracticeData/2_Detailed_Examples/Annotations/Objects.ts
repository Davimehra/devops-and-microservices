const profile = {
  firstName: "Davinder",
  age: 25,
  cordinates: {
    lat: 12,
    log: 20,
  },
  setAge(age: number) {
    this.age = age;
  },
};

// const { firstName, age }: { age: number; firstName: string } = profile;
// const { cordinates }: { cordinates: { lat: number; log: number } } = profile;

const { firstName, age } = profile;
const { cordinates } = profile;

console.log(`
FirstName = ${firstName}
Age of Employee = ${age}
Living Cordinates = { lat:${cordinates.lat} log:${cordinates.log} }
`);
