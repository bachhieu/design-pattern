
//  Khai báo interface chung cho tất cả các transport
interface infor {
    name : string
    tonnage: string
    transport:string
}

/* Tạo một class để trả về đối tượng Transport cụ thể.
 Tạo phương thức abstract createTransport giúp cho lớp kế có thể ghi đè,
 và thực hiện những mục đích cụ thể hơn.
 Implements interface infor giúp cho các phương thức xác định
 được những thông tin chính xác
*/
abstract class Logistics implements infor {
    // khai báo những thuộc tính và contructor 
    name : string
    tonnage: string
    transport:string
    constructor(infor:infor){
        this.name = infor.name
        this.tonnage = infor.tonnage
        this.transport = infor.transport
    }
    /**
     * Khai báo 1 phương thức createTransport để lớp thừa kế có thể ghi đè
     * nhằm thể hiện rõ mục đích hành vi của hàm tạo
     * @Overide
     */
    public abstract createTransport(infor:infor):Transport

    /**
     *  Gọi đến hàm tạo để thực hiện hành vi tạo 1 đối tượng Transport
     * @retrun Transport
     */
    public planDelivery() {
        const result =  this.createTransport(this)
        console.log(`Created successfull transport ${result.infor.name} and tonnage is ${result.infor.tonnage}`)
        return result
    }
}

/**
 * Class RoadLogistics kết thừa từ class Logistics và thực hiện ghi đè lại hàm createTransport
 * giúp làm rõ hơn chức năng của hàm createTransport và trả về 1 phương tiện chuyên chở đường bộ
 */
class RoadLogistics extends Logistics {
    /**
     * 
     * @param infor
     * hàm constructor và super giúp kế thừa toàn bộ thuộc tính của class logistics
     */
    constructor(infor:infor){
        super(infor)
    }

    /**
     * 
     * @param infor 
     * @returns Transport
     * @overide
     * 
     * Ghi đè lên createTransport trong class Logistics, thể hiện rõ chức năng của hàm
     * là tạo ra những phương tiện chuyên chở bằng đường bộ
     */
    createTransport(infor:infor){
        switch (infor.name) {
            case "trunk" : 
            return new Trunk(infor)
            // ...

            // Thêm các phương tiện
            default :
            return new Trunk(infor)
        }
    }
}

/**
 * Tương tự như với class RoadLogistics nhằm trả về 1 đối tượng chuyên chở trên biển
 */
class SeaLogistics extends Logistics {
    constructor(infor:infor){
        super(infor)
    }
    createTransport(infor:infor){
        switch (infor.name) {
            case "ship" : 
            return new Ship(infor)
            // ...
            
            // thêm các phương tiện 
            default :
            return new Ship(infor)
        }
    }
}

/**
 * Khai báo những thông tin phương thức mà 1 Transport cần có và cần phải thực hiện
 */
interface Transport {
    infor: infor;
    deliver():void
    getInfor():void
}

/**
 * Phương tiện cụ thể với những thông tin, phương thức để thực hiện những hành vi cụ thể
 */
class Trunk implements Transport {
    public infor: infor;
    constructor(infor:infor){
        this.infor = infor
    }
    deliver() {
        console.log('Deliver by Trunk')
    }
    getInfor(){
        console.log(this.infor)
    }
}

class Ship implements Transport {
    public infor: infor;
    constructor(infor:infor){
        this.infor = infor
    }
    deliver() {
        console.log('Deliver by Ship')
    }
    getInfor(){
        console.log(this.infor)
    }
}
// ....
// thêm các phương tiện giao hàng khác


// hàm chạy
const LogisticsApp = (infor:infor)  => {
    switch(infor.transport){
        case 'road':
            return new RoadLogistics(infor)
        case 'sea' :
            return new SeaLogistics(infor)
        default:
            return new RoadLogistics(infor)
    }
}

// mock data
const inf1:infor = {
    name : 'trunk',
    tonnage : '1000kg',
    transport: 'road'
}
const inf2:infor = {
    name : 'ship',
    tonnage : '1000000kg',
    transport: 'sea'
}

/**
 * Tạo và lấy thông tin phương tiện
 */
const vehicle1 = LogisticsApp(inf1).planDelivery()
vehicle1.deliver()
vehicle1.getInfor()

console.log('........................................')

const vehicle2 = LogisticsApp(inf2).planDelivery()
vehicle2.deliver()
vehicle2.getInfor()

//Output
/**
Created successfull transport trunk and tonnage is 1000kg
Deliver by Trunk
RoadLogistics { name: 'trunk', tonnage: '1000kg', transport: 'road' }
........................................
Created successfull transport ship and tonnage is 1000kg
Deliver by Ship
SeaLogistics { name: 'ship', tonnage: '1000kg', transport: 'sea' }  
 */