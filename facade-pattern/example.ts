
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
const client1 = new Shop.Telesales()
client1.Order(order)
client1.cancel()

console.log('--------------------------------')

const order2 =  {
    quantity: 5,
    delivery: 'trunk',
    payment: ''
}
const client2 = new Shop.Telesales()
client2.Order(order2)
client2.cancel()