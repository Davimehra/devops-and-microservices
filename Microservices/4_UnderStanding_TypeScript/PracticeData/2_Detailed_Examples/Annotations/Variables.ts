let cars = 4; // cars = "23";            // Start Giving an error caused by Typescript for number assignment
let carColor = "Green"; // carColor = 350          // Start Giving an error caused by Typescript for string assignment
let isAutomatic = true; // isAutomatic = 1         // Start Giving an error caused by Typescript for boolean assignment

let nothingMuch = null;
let nothing = undefined;

// Combining Different Types with |

let carsDetails: number | string | boolean = 0;

carsDetails = 23;
carsDetails = "Maruti";
carsDetails = true;

// Build in Objects {}

let now = new Date();

// Arrays Declaration

const colors = ["Red", "Orange", "Black"];
const myNumbers = [1, 23, 4, 33];
const truths = [true, false, true, false];

//Combining Arrays with different Types
const combinedArray = ["String", 123, true];

// Classes -> Note Classes will be declared with first capital letter

class Car {}

let car1 = new Car();

// Object literals

let points = {
  x: 10,
  y: 30,
};

// Functions

const carNumber = (i: number) => {
  console.log(i);
};
