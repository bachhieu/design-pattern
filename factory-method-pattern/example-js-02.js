class Car {
    constructor(doors = 4, state = "brand new", color = "silver") {
      this.doors = doors
      this.state = state
      this.color = color
    }
  }
  
  class Truck {
    constructor(state = "used", wheelSize = "large", color = "blue") {
      this.state = state
      this.wheelSize = wheelSize
      this.color = color
    }
  }
  
  class VehicleFactory {
    vehicleClass = Car
    createVehicle = (type, props) => {
      switch(type) {
        case "car":
          return new this.vehicleClass(props.doors, props.state, props.color)
        case "truck":
          return new this.vehicleClass(props.state, props.wheelSize, props.color)
      }
    }
  }
  
  // Let's build a vehicle factory!
  
  const factory = new VehicleFactory()
  const car = factory.createVehicle( "car", {
    doors: 6,
    color: "green"
  })
  
  console.log(JSON.stringify(car))
  
  const truck = factory.createVehicle( "truck", {
    state: "like new",
    color: "red",
    wheelSize: "small"
  })
  
  console.log(JSON.stringify(truck))
  
  // Let's build a truck factory!
  
  class TruckFactory extends VehicleFactory {
    vehicleClass = Truck
  }
  
  const truckFactory = new TruckFactory()
  const bigTruck = truckFactory.createVehicle( "truck", {
    state: "omg ... so bad",
    color: "pink",
    wheelSize: "so BIG"
  })
  
  console.log(JSON.stringify(bigTruck))


// other way
  /**
  class VehicleFactory {
  vehicleClass = null;

  setVehicleClass = type => {
    switch (type) {
      case 'car':
        this.transportClass = Car;
        break;
      case 'truck':
        this.transportClass = Truck;
        break;
      default:
        break;
    }
  };
  createVehicle = (type, props) => {
    this.setVehicleClass(type);
    switch (type) {
      case 'car':
        return new this.vehicleClass(props.doors, props.state, props.color);
      case 'truck':
        return new this.vehicleClass(props.state, props.wheelSize, props.color);
    }
  };
}
   * 
   */