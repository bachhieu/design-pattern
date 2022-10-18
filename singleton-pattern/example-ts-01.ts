class SingletonTS01 {
    private static instance: SingletonTS01;
  
    /*
      The private constructor prevents instantiating this class
      with the `new` keyword outside the class
    */
    private constructor() {}
  
    public static getInstance(): SingletonTS01 {
      if (!SingletonTS01.instance) {
        SingletonTS01.instance = new SingletonTS01();
      }
  
      return SingletonTS01.instance;
    }
  
    public someBizLogic() {
      // Some code here
    }
  }
  
  // s1 will always be the same as s2 because they are the same instance.
  const s1 = SingletonTS01.getInstance();
  const s2 = SingletonTS01.getInstance();
  console.log("🚀 ~ file: example-ts-01.ts ~ line 25 ~ s1", s1)
  console.log("🚀 ~ file: example-ts-01.ts ~ line 26 ~ s2", s2)