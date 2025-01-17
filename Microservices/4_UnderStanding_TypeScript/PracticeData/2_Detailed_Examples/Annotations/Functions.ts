// 1st way to declare function

function addition(a: number, b: number): number {
  return a + b;
}

// 2nd way to declare annoymous function

const addNum = function (a: number, b: number): number {
  return a + b;
};

// 3rd way to declare function

let substract: (a: number, b: number) => number = (a: number, b: number) => {
  return a - b;
};

// Eg (Without Annotation , Just Inference)
// Here Inference will work for just return type prediction

// 1st way to declare function

let add = (a: number, b: number) => {
  return a + b;
};

// 2nd way to declare annoymous function

const subNum = function (a: number, b: number) {
  return a + b;
};

// 3rd way to declare function

function sub(a: number, b: number) {
  return a + b;
}

// Using never as return

function causeError(): never {
  throw new Error("Not Working");
}

// When not to use never Return (if the statement is conditioned)

function causeErrorIf(message: string): void {
  if (message) {
    throw new Error("Not Working");
  }
}

function causeErrorIfThen(message: string): string {
  if (message) {
    throw new Error("Not Working");
  }

  return message;
}

// destructuring with annotations

let forcast = {
  date: new Date(),
  weather: "Sunny",
};

function logWeather(forcast: { date: Date; weather: string }): void {
  console.log(`
    Date = ${forcast.date}
    weather is going to be ${forcast.weather}
    `);
}
logWeather(forcast);

//destructuring

function logWeatherDesc({ date, weather }: { date: Date; weather: string }) {
  console.log(`
    Date = ${date}
    weather is going to be ${weather}
    `);
}

logWeatherDesc(forcast);
