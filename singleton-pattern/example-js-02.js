var singletonJS02 = (function() {
    //args: an object containing arguments for the singleton
    function Singleton(args) {
      //set args variable to args passed or empty object if none provided.
      var args = args || {};
      //set the name parameter
      this.name = 'Singleton Sample';
      //set the value of pointX
      this.pointX = args.pointX || 6; //get parameter from arguments or set default
      //set the value of pointY
      this.pointY = args.pointY || 10;
    }
  
    //this is our instance holder
    var instance;
    //this is an emulation of static variables and methods
    var _static = {
      name: 'SingletonTester',
      //This is a method for getting an instance
      //It returns a singleton instance of a singleton object
      getInstance: function(args) {
        if (instance === undefined) {
          instance = new Singleton(args);
        }
        return instance;
      }
    };
    return _static;
  })();
  
  //global.single =.. for global access among node modules
  var single1 = singletonJS02.getInstance({ 
    pointX: 5
  });
  var single2 = singletonJS02.getInstance({ 
      pointX: 10
    });
  
  
  console.log(single1.pointX); // outputs 5