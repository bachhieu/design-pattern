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