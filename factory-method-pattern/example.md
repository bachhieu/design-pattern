# Đặt vấn đề 
Ứng dụng vận tải đầu tiên của bạn sử dụng xe tải làm phương tiện chuyên chở. Nhưng khi ứng dụng phổ biến thì đã nhiều đơn đặt hàng bằng đường biển
Lúc này bạn cần kết hợp vẫn tải đường biển vào ứng dụng của bạn

[![logisticsApp](https://refactoring.guru/images/patterns/diagrams/factory-method/problem1-en.png)](https://refactoring.guru/design-patterns/factory-method)

*Bạn cần thêm phướng án vận tải đường biển vào ứng dụng của bạn, và điều này là khá phức tạp với những kiến trúc có*

# Phương án
Thật may mắn cho điều này khi bạn sử dụng factory pattern để tạo ra các đối tượng khác nhau dựa trên những giá trị được truyền vào trong khi chỉ dùng 1 phương thức gốc

[![solution](https://refactoring.guru/images/patterns/diagrams/factory-method/solution1.png)](https://refactoring.guru/design-patterns/factory-method)
*Các lớp con có thể thay đổi các phương thức của riêng nó, nhưng nó vẫn sẽ có chung một giao diện tạo*

Chúng ta có thể tạo 2 lớp RoadLogistics và SeaLogistics để trả về các đối tượng xe vận chuyển đường bộ và thuyền vẩn tải đường biển. 

[![solution](https://refactoring.guru/images/patterns/diagrams/factory-method/solution3-en.png?id=b6f53911fc0d56f9ef99501fc4aec059)](https://refactoring.guru/design-patterns/factory-method)
 *Như vậy chỉ cần một phương thức chúng ta có thể tạo ra những đối tượng khác nhau cho từng mục đích*
 
 [![solution](https://refactoring.guru/images/patterns/diagrams/factory-method/solution2-en.png?id=db5de848c1d490b835666ef54d131d46)](https://refactoring.guru/design-patterns/factory-method)
*Tất cả các sản phẩm phải theo cùng một giao diện.*
 
# Kiến trúc
Từ ví dụ trên chúng ta có thể hình dùng được kiến trúc của factory pattern là như thế nào?
 [![solution](https://refactoring.guru/images/patterns/diagrams/factory-method/structure.png?id=4cba0803f42517cfe8548c9bc7dc4c9b)](https://refactoring.guru/design-patterns/factory-method)
 
1. Đầu tiên chúng ta cần tạo 1 interface **product** chung nhất để khai báo cho các đối tượng<object> có thể được tạo ra bởi hàm tạo **Creator**
2. **ConcreteProductA-B** là các đối tượng khác nhau được triển khai dựa trên interface **product**
3. class **Creator** sẽ là cơ bản để tạo lên những đối tượng **ConcreteCreatorA-B**. Với class **Creator** chúng ta có thể khai báo *abstract* với các phương thức gốc để các đối tượng **ConcreteCreatorA-B** sẽ có những mục đích của riêng nó. Khác với tên gọi của nó class **Creator** không trực tiếp tạo ra các đối tượng, mà nó chỉ chứa những logic cốt lõi và chung nhất để những đối tượng **ConcreteCreatorA-B** có thể sử dụng và ghi đè với những phương thức của riêng nó. mặc dù nó không trực tiếp tạo ra các **Product**, nhưng các đối tượng dựa trên nó phải trả về kiểu **Product**
4. Concrete Creators ghi đè phương thức gốc của nhà máy để nó trả về một loại sản phẩm cụ thể.

Lưu ý rằng phương pháp gốc không phải lúc nào cũng phải tạo các phiên bản mới. Nó cũng có thể trả về các đối tượng hiện có từ một bộ nhớ cache, một nhóm đối tượng hoặc một nguồn khác.
### ví dụ
  Để hiểu rõ hơn về hành vì của nó chúng ta có thể xem ví dụ dưới đây
  
#### [example-ts-01.ts](https://github.com/bachhieu/design-pattern/blob/main/factory-method-pattern/example-ts-01.ts)
  
```ts
/**
 * Khai báo lớp Creator để trả về 1 đối tượng của 1 lớp Product. Bên cạnh đó là khai báo abstract để các lớp kế thừa có thể * dễ dàng ghi đè lên phương thức gốc, với ý nghĩa cụ thể hơn
 */
abstract class Creator {
    /**
     * Khai báo 1 phương thức gốc để những lớp thừa kế có thể ghi đè
     */
    public abstract factoryMethod(): Product;

    /**
     * Dù không trực tiếp trả về 1 đối tượng lớp Product nào cụ thể, nhưng nó chứa những phương thức thức cơ bản để những lớp kết thừa có thể triển khai và dễ dàng sử dụng
     */
    public someOperation(): string {
        // Gọi phương thúc để tạo 1 đối tượng Product cụ thể
        const product = this.factoryMethod();
        return `Creator: The same creators code has just worked with ${product.operation()}`;
    }
}

/**
 * Khai báo những lớp ConcreteCreator1 kế thừa từ lớp Creator và ghi đè lên những phương thức gốc để có những phương thức của riêng nó
 */
class ConcreteCreator1 extends Creator {
    /**
     * Ghi đè lên phương thức gốc của lớp Creator và trả về 1 đối tượng Product cụ thể
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}
  /**
     * Tương tự class ConcreteCreator1
     */
class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * Khai báo những phương thức mà 1 product cần có và cần phải thực hiện
 */
interface Product {
    operation(): string;
}

/**
 * Triển khai những lớp Product cụ thể dựa trên lớp Product 
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}
/**
 * Tương tự ConcreteProduct1
 */
class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * Đoạn mã triển khai việc tạo các Product cụ thể. Có nhiều các thức khác nhau để triển khai việc tạo 1 đối tượng Product cụ thể, nhưng với ví dụ này bạn có thể tạo khi chuyền 1 đối tượng ConcreteCreator cụ thể vào hàm clientCode
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * Đối tượng Product cụ thể sẽ được tạo dựa trên đối tượng được chuyền vào
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
```
#### run
```
npm install -g ts-node
ts-node example-ts-01.ts
```
#### Output
```
App: Launched with the ConcreteCreator1.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}

App: Launched with the ConcreteCreator2.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct2}
```

# Ví dụ
Qua ví dụ bên trên bạn đã hiểu được ứng dụng và cách triển khai của kiến trúc **factory method pattern**, tiếp theo chúng ta sẽ đến với ví dụ về ứng dụng vận tải<**logisticsApp**> mà chúng ta đã đề cập ngay từ đầu
Tất cả những gì bạn cần đều nằm  [tại đây](https://github.com/bachhieu/design-pattern/blob/main/factory-method-pattern/example-ts-01.ts)
#### example.ts
```ts

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
```
### run 
```
npm install -g ts-node
ts-node example.ts
```
#### output
```
Created successfull transport trunk and tonnage is 1000kg
Deliver by Trunk
RoadLogistics { name: 'trunk', tonnage: '1000kg', transport: 'road' }
........................................
Created successfull transport ship and tonnage is 1000kg
Deliver by Ship
SeaLogistics { name: 'ship', tonnage: '1000kg', transport: 'sea' }  
```



