# Đặt vấn đề 
Khi ứng dụng phát triển, nó trở lên to lớn và phức tạp, mỗi hàm của bạn phải xử lý nhiều dữ liệu hơn khiến cho logic trở lên khó hiểu, hoặc khi bạn triển khai các chức năng liên quan đến bên thứ 3. Để giảm tải sự rắc rối đó chúng ta cần 1 class Facade đại diện cho những func và những class để giao tiếp với người dùng

# ví dụ thực tế
[![facade example](https://refactoring.guru/images/patterns/diagrams/facade/live-example-en.png)](https://refactoring.guru/design-patterns/facade)

Bạn có thể hình dung khi chúng ta gọi 1 của hàng để đặt hàng online, những chăm sóc viên sẽ đại diện cho cửa hàng để làm việc với chúng ta. Mình không cần phải biết bên trong họ phải làm gì, chỉ cần biết rằng những nhu cầu của chúng ta được đáp ứng 1 cách rất đơn giản

# Mục đích
Qua ví dụ trên chúng ta có thể hiểu rằng mục dích của facade pattern:
* Tạo ra 1 giao diện đơn giản dễ hiểu giúp khách hàng dễ sử dụng hệ thống con hoặc bộ công cụ.

* Khi bạn có 1 API để giao tiếp với các ứng dụng khác, API này được xác định cụ thể. Nó thay mặt ứng dụng của bạn giao tiếp với các ứng dụng khác, giúp làm giảm đi độ phức tạp

* Một ứng dụng khác mà Facade được sử dụng là tái cấu trúc. Giả sử bạn có những class và những đối tượng được thừa kế nhau mà người dùng không cần quan tâm đến thì chỉ cần trình bày những gì cần thiết và trình bày một giao diện rõ ràng hơn và dễ sử dụng. Đó là những gì Facade sẽ làm

* Facade thường được kết hợp với các mẫu thiết kế khác. Bản thân các Facade thường được thực hiện như một Factory đơn lẻ.

# ví dụ
Để làm rõ những điều trên chúng ta sẽ triển khai rõ ví dụ thực tế phía trên
#### [example.ts](https://github.com/bachhieu/design-pattern/blob/main/facade-pattern/example.ts)
```ts

/**
 * Khai báo đại diện cho 1 shop 
 */
namespace Shop {
    /**
     * khai báo kiểu dữ liệu chọn đầu vào của hàm order
     */
    interface orderInput{
        quantity: number
        delivery: string
        payment: string
    }

    /**
     * Khai báo Facade đại diện cho shop để nhận yêu cầu và thực hiện yêu cầu của khách hàng
     */
    export class Telesales {
        /**
         * Những dịch vụ được sử dụng
         */
        private wareHouse: WareHouse = new WareHouse()
        private packaging: Packaging = new Packaging()
        private delivery: Delivery = new Delivery()
        private paymentProcessing: PaymentProcessing = new PaymentProcessing()
        private taxes: Taxes = new Taxes()

        /**
         * Hàm order nhận nhiệm vụ order dựa trên yêu cầu của khách hàng
         */
        public Order(input:orderInput){
            //  Tính toán số lượng hàng hóa còn lại trong kho
            const quantity = this.wareHouse.amount()
            let payment: boolean = false
            if(quantity < 0) {
                console.log(`Can't order because of Out of stock`)
            }
            // Kiểm tra xem hàng hóa được di chuyển bằng phương thức nào
            switch(input.delivery){
                case 'trunk' :
                    this.delivery.trunk()
                    break
                case 'ship' : 
                    this.delivery.ship()
                    break
                default :
                    this.delivery.ship()
            }
            // Kiểm tra xem khách hàng thanh toán bằng phương thức nào
            switch(input.payment){
                case 'cash' :
                    payment =   this.paymentProcessing.cash()
                    break
                case 'BankTransfer' : 
                    payment =  this.paymentProcessing.BankTransfer()
                    break
                default :
                    payment =  false
            }
            if(payment){
                console.log(`Order successfull! `)
                console.log(input)
                this.delivery.start()
            }else {
                console.log(`Order successfull! `)
                console.log(input)
            }
        }
        //  hàm hủy order
        public cancel(){
             this.delivery.stop()
        }
    }

    // Class WareHouse giúp triển khai những dịch vụ liên quan đến hàng hóa và kho bãi
    export class WareHouse {
        private quantity = 10
         public amount(){
            console.log(`quantity of goods is ${this.quantity}`)
            return this.quantity
         }
        //  ....
    }
    // Class Packaging giúp kiểm soát bao vì
    export class Packaging {
        //...
    }
    // Class Delivery giúp kiểm soát phương tiện giao hàng
    export class Delivery {
        private startTime: Date | undefined 
        constructor(){
            this.startTime = undefined
        }
        public trunk(){
            console.log(`Delivery by truck`)
        }

        public ship(){
            console.log(`Delivery by ship`)
        }

        public start(){
            this.startTime = new Date()
            console.log(`Goods start going at ${this.startTime}`)
        }
        public stop(){
            if(this.startTime){
                console.log(`Can't stop because the vehicle moved at ${this.startTime}`)
            } else {
                console.log(`Stop successfull!`)
            }
        }
        //...
    }
    // Class PaymentProcessing giúp triển khai những phương thức thanh toán
    export class PaymentProcessing {
        public cash(){
           return true
        }
        public  BankTransfer(){
           return true
        }
    }
    // Class Taxes giúp tính toán thuế
    export class Taxes {
        //...
    }
  
}

// đầu vào của hàm order
const order =  {
    quantity: 5,
    delivery: 'trunk',
    payment: 'cash'
}
// khách hàng làm việc với facade, ở đây là class Telesales
const client = new Shop.Telesales()
client.Order(order)
client.cancel()

console.log('--------------------------------')

const order2 =  {
    quantity: 5,
    delivery: 'trunk',
    payment: ''
}
const client2 = new Shop.Telesales()
client2.Order(order2)
client2.cancel()
```
#### run
```
npm install -g ts-node
ts-node example.ts
```
#### Output
```
quantity of goods is 10
Delivery by truck
Order successfull!
{ quantity: 5, delivery: 'trunk', payment: 'cash' }
Goods start going at Fri Oct 21 2022 10:40:08 GMT+0700 (Indochina Time)
Can't stop because the vehicle moved at Fri Oct 21 2022 10:40:08 GMT+0700 (Indochina Time)
--------------------------------
quantity of goods is 10
Delivery by truck
Order successfull!
{ quantity: 5, delivery: 'trunk', payment: '' }
Stop successfull!
```