/***
  @singleton decorator
  add static method getInstance(...args) to decorated class which returns single instance 
  (or constructs single instance if it doesn't exist)
  
***/

function singleton(Target:any){

  //static instance getter method
  Target.getInstance = function(...args:any[]){

    // save a reference to the original constructor
    var original = Target;

    // a utility function to generate instance of a class
    function construct(constructor) {
      var c : any = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }

    //new constructor
    var f : any = function () {
      return construct(original);
    }

    if (!original.instance) {
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        original.instance = new f();
    }

    return original.instance;
  }

}


/***
Class implementing  @singleton decorator.
Usage example.
@singleton
***/

class SomeClass implements singleton {
  
  private name: string;
  
  public nameSetter(name:string):void{
    this.name = name;
  }
  
  public nameGetter():string{
    return this.name;
  }
  
  private constructor(name:string) {
     this.name = name;
  }
}

/***
when we try to create a new instance....
let secondInst = new SomeClass() => TS error Constructor of class 'Storage' is private and only accessible within the class declaration.
***/
let instance = SomeClass.getInstance('King Arthur');
instance.nameGetter() // logs 'King Arthur'
console.log("🚀 ~ file: example-ts-02.ts ~ line 71 ~ instance.nameGetter()", instance.nameGetter())
instance.nameSetter('Merlin');
console.log("🚀 ~ file: example-ts-02.ts ~ line 73 ~ instance.nameSetter('Merlin');", instance.nameSetter('Merlin'))
instance.nameGetter(); // logs 'Merlin', but the object stays the same 
console.log("🚀 ~ file: example-ts-02.ts ~ line 75 ~ instance.nameGetter();", instance.nameGetter())
