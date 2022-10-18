interface Product_02 {
    doSomething(): void;
  }
  
  interface Factory {
    createProduct(name): Product_02;
  }
  
  class ConcreteProductA implements Product_02 {
    doSomething(): void {
      console.log('Product A do this');
    }
  }
  
  class ConcreteProductB implements Product_02 {
    doSomething(): void {
      console.log('Product B do this');
    }
  }
  
  class ProductFactory implements Factory {
    createProduct(name): Product_02{
      switch(name) {
        case 'product-a':
          return new ConcreteProductA();
        case 'product-b':
          return new ConcreteProductB();
        default:
          return null;
      }
    }
  }
  
  (function main() {
    const factory = new ProductFactory();
    const product = factory.createProduct('product-a');
    product.doSomething();
  })()