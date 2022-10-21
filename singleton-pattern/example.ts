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