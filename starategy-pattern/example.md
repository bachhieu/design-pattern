# Đặt vấn đề
Hãy thử tưởng tượng rằng bạn có 1 ứng dụng lập tuyến đường đi tự động cho xe máy, nhưng sau đó khi phát triển lên bạn muốn toán toán với cả ô tô, xe đạp và cả máy bay.Và thậm chí sau này, một lựa chọn khác để xây dựng các tuyến đường qua tất cả các điểm du lịch của thành phố.
[![strategy](https://refactoring.guru/images/patterns/diagrams/strategy/problem.png)](https://refactoring.guru/design-patterns/strategy)
*Mọi thứ trở nên rối hơn khi ứng dụng của bạn đáp ứng nhiều dịch vụ hơn*

Nếu cứ phát triển theo hướng hiện tại thì mọi thứ vẫn có thể hoạt động theo ý bạn. Nhưng đối với những người tham gia dự án sau bạn có thể sẽ mất rất nhiều thời gian để có thể tìm hiểu và làm việc được với nó, mọi thứ trở nên rối hơn

[![strategy](https://refactoring.guru/images/patterns/diagrams/strategy/solution.png)](https://refactoring.guru/design-patterns/strategy)

Mặc dù đưa ra các đối số giống nhau, mỗi lớp định tuyến có thể xây dựng một tuyến đường khác nhau, lớp điều hướng chính không thực sự quan tâm thuật toán nào được chọn vì công việc chính của nó là hiển thị một tập hợp các điểm kiểm tra trên bản đồ. Lớp có một phương thức để chuyển đổi chiến lược định tuyến hoạt động, vì vậy các máy khách của nó, chẳng hạn như các nút trong giao diện người dùng, có thể thay thế hành vi định tuyến hiện được chọn bằng một hành vi khác.
# Ví dụ thực tế
[![strategy](https://refactoring.guru/images/patterns/content/strategy/strategy-comic-1-en.png)](https://refactoring.guru/design-patterns/strategy)

Hãy tưởng tượng rằng bạn phải đến sân bay. Bạn có thể bắt xe buýt, đặt taxi hoặc đi xe đạp. Việc chọn lựa phương tiện nào là phụ thuộc vào bạn

# Mục đích
Như vậy chúng ta có thể thấy nhiệm vụ của Strategy là cho phép bạn xác định một nhóm thuật toán, đặt mỗi thuật toán vào một lớp riêng biệt và làm cho các đối tượng của chúng có thể hoán đổi cho nhau. Chúng có cùng những phương thức giống nhau, có thể thay thế cho nhau nhưng không liên quan đến nhau.
# ví dụ
Để làm rõ những điều trên chúng ta sẽ triển khai rõ ví dụ thực tế phía trên
#### [example.ts](https://github.com/bachhieu/design-pattern/blob/main/starategy-pattern/example.ts)
```ts
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

```
### run 
```
npm install -g ts-node
ts-node example.ts
```
#### output
```
set move by bicycle
move by Bicycle
The total distance of 100km by bus takes 10 hours and costs 0 VND.       
------------------------------------
set move by bus
move by Bicycle
The total distance of 100km by bus takes 2 hours and costs 10000 VND.    
+++++++++++++++++++++++++++++++++++++
set move by car
move by Bicycle
The total distance of 100km by bus takes 1.25 hours and costs 100000 VND. 
```