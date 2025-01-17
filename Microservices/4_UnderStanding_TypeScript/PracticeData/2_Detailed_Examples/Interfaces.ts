interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `
  Name of Vehicle ${this.name}
  Year of Manufacture ${this.year}
  is it Broken? ${this.broken} `;
  },
};

// const printVehicle = (vehicle: {
//   name: string;
//   year: Date;
//   broken: boolean;
//   summary(): string;
// }): void => {
//   console.log(`Name of Vehicle = ${vehicle.name}`);
//   console.log(vehicle.summary());
// };

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name of Vehicle = ${vehicle.name}`);
  console.log(vehicle.summary());
};

printVehicle(oldCivic);
