var SingletonJS01 = (function () {
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function run() {

    var instance1 = SingletonJS01.getInstance();
    var instance2 = SingletonJS01.getInstance();

    console.log("Same instance? " + (instance1 === instance2));
}

run()

console.log(global)