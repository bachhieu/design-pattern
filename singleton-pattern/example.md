# Khái niệm
Singleton là một mẫu thiết kế sáng tạo cho phép bạn đảm bảo rằng một lớp chỉ có một thể hiện, đồng thời cung cấp một điểm truy cập toàn cục cho thể hiện này.

# Mục đích
Singleton sinh ra nhằm giải quyết 2 vấn đề cùng lúc:
* Đảm bảo rằng một lớp chỉ có một cá thể duy nhất
* Cung cấp một điểm truy cập toàn cầu cho phiên bản đó
[![signleton](https://refactoring.guru/images/patterns/content/singleton/singleton-comic-1-en.png)](https://refactoring.guru/design-patterns/singleton)

Ngày nay, mô hình Singleton đã trở nên phổ biến đến mức mọi người có thể gọi một cái gì đó là singleton ngay cả khi nó chỉ giải quyết được một trong những vấn đề được liệt kê.

# Cách triển khai
Tất cả các triển khai của Singleton đều có hai bước chung sau:

* Đặt phương thức khởi tạo mặc định là riêng tư, để ngăn các đối tượng khác sử dụng newtoán tử với lớp Singleton.
* Tạo một phương thức tạo tĩnh hoạt động như một phương thức khởi tạo. Dưới mui xe, phương thức này gọi phương thức khởi tạo riêng để tạo một đối tượng và lưu nó trong một trường tĩnh. Tất cả các lệnh gọi sau đến phương thức này đều trả về đối tượng được lưu trong bộ nhớ cache.

Nếu mã của bạn có quyền truy cập vào lớp Singleton, thì nó có thể gọi phương thức tĩnh của Singleton. Vì vậy, bất cứ khi nào phương thức đó được gọi, cùng một đối tượng luôn được trả về.

#### ví dụ
Chính phủ là một ví dụ điển hình của mô hình Singleton. Một quốc gia chỉ có thể có một chính phủ chính thức. Bất kể danh tính cá nhân của các cá nhân thành lập chính phủ, danh hiệu, “Chính phủ X”, là một điểm truy cập toàn cầu để xác định nhóm người phụ trách.

# Cấu trúc
[![constructor](https://refactoring.guru/images/patterns/diagrams/singleton/structure-en.png)](https://refactoring.guru/design-patterns/singleton)

Lớp Singleton khai báo phương thức tĩnh getInstancetrả về cùng một thể hiện của lớp riêng của nó. Phương thức khởi tạo của Singleton nên được ẩn khỏi mã máy khách. Gọi getInstancephương thức là cách duy nhất để lấy đối tượng Singleton.

# Ví dụ

### [example.ts](https://github.com/bachhieu/design-pattern/blob/main/singleton-pattern/example-ts-01.ts)

```ts 
/**
 *  Lớp Singleton định nghĩa phương thức `getInstance` cho phép truy cập đến 1 đối tượng Singleton duy nhất. 
 */
class Singleton {
    private static instance: Singleton;

    /**
     * hàm constructor phải luôn luôn thiết lập ở trạng thái private để ngăn chặn người dùng gọi hàm với từ khóa new
     */
    private constructor() { }

    /**
     * Với cờ static cho phép người dùng có thể gọi trực tiếp hàm mà không cần khởi tạo đối tượng
     * 
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    /**
     * Và cuối cùng là xác định những logic cơ bản cho đối tượng đã khởi tạo, để nó có thể thực hiện
     * những chức năng phù hợp với đối tượng
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * hàm chạy
 */
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}
/**
* Gọi hàm chạy
*/
clientCode();
```
#### run 
```
npm install -g ts-node
ts-node example.ts
```
#### Output
```
Singleton works, both variables contain the same instance.
```
#### Tổng kết
Như bạn có thể thấy dù có gọi hàm **Singleton.getInstance()** bao nhiêu lần thì vẫn sẽ chỉ trả về 1 đối tượng duy nhất