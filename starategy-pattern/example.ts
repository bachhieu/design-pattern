/**
 * Khai báo cho ứng dụng
 */
namespace Navigators {
    /**
     * Khai báo Strategy
     */
    export class Strategy {
        /**
         * Nó đại diện cho 1 phương tiện cụ thế
         */
        private vehicle: Vehicle;
        /**
         * 
         * @param vehicle 
         * Thiết lập 1 phương tiện cụ thể với hàm tạo
         */
        constructor(vehicle:Vehicle){
            console.log(`set move by ${vehicle.name}` )
            this.vehicle = vehicle
        }
        /**
         * @param vehicle 
         * Thay đổi 1 phương tiện khác
         */
        setVehicle(vehicle:Vehicle) {
            console.log(`set move by ${vehicle.name}` )
            this.vehicle = vehicle
        }

        /**
         * @param input 
         * Phương thức dại diện cho các đối tượng
         * Nó sẽ gọi đến phương thức của các phương tiện cụ thể
         */
        buildRoute(input:input){
            // gọi đến phương thức buildRoute() của các phương tiện cụ thể 
            const retult = this.vehicle.buildRoute(input)
            console.log(`The total distance of ${input.distance}km by bus takes ${retult.time} hours and costs ${retult.cost} VND.`)
            return retult
        }
    }
    /**
     * Interface đại diện cho các phương tiện
     */
    export interface Vehicle {
        name: string
        price: number
        speed: number
        buildRoute(input:input): output

    }
    //  Khai báo đầu vào của hàm buildRoute
    export interface input {
        distance : number
    }

    //  Khai báo đầu vào của hàm buildRoute
    export interface output {
        time: number
        cost: number
    }
    // Phương tiện xe đạp được triển khai từ interface Vehicle
    export class Bicycle implements Vehicle {
        // thông tin của class Bicycle
        readonly name = 'bicycle'
        readonly price = 0
        readonly speed = 10
        // Logic riêng trong hàm buildRoute của class Bicycle
        public buildRoute(input:input): output {
            console.log(`move by Bicycle `)
            const time = input.distance/this.speed
            const cost = 0
            return {
                time,
                cost
            }
        }
    }
    // Phương tiện xe bus được triển khai từ interface Vehicle
    export class Bus implements Vehicle {
        // thông tin của class Bus
        readonly name = 'bus'
        readonly price = 5000
        readonly speed = 50
        // Logic riêng trong hàm buildRoute của class Bus
        public buildRoute(input:input): output {
            console.log(`move by Bicycle `)
            const time = input.distance/this.speed
            const cost = time* this.price
            return {
                time,
                cost
            }
        }
    }
    // Phương tiện ô tô được triển khai từ interface Vehicle
    export class Car implements Vehicle {
        // thông tin của class Car
        readonly name = 'car'
        readonly price = 80000
        readonly speed = 80
        
        // Logic riêng trong hàm buildRoute của class Car
        public buildRoute(input:input): output {
            console.log(`move by Bicycle `)
            const time = input.distance/this.speed
            const cost = time* this.price
            return {
                time,
                cost
            }
        }
    }
}

const bicycle = new Navigators.Bicycle()
const car = new Navigators.Car()
const bus = new Navigators.Bus()


const distance : Navigators.input = {
    distance : 100
}
const client = new Navigators.Strategy(bicycle)
client.buildRoute(distance)
console.log("------------------------------------")
client.setVehicle(bus)
client.buildRoute(distance)
console.log("+++++++++++++++++++++++++++++++++++++")
client.setVehicle(car)
client.buildRoute(distance)

