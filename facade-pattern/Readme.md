# What is Facade pattern?
The Facade pattern provides an interface which shields clients from complex functionality in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful and extremely useful. It is often present in systems that are built around a multi-layer architecture.

# Using Facade pattern
The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem or toolkit easy to use for the client.

On the server, in a multi-layer web application you frequently have a presentation layer which is a client to a service layer. Communication between these two layers takes place via a well-defined API. This API, or façade, hides the complexities of the business objects and their interactions from the presentation layer.

Another area where Façades are used is in refactoring. Suppose you have a confusing or messy set of legacy objects that the client should not be concerned about. You can hide this code behind a Façade. The Façade exposes only what is necessary and presents a cleaner and easy-to-use interface.

Façades are frequently combined with other design patterns. Façades themselves are often implemented as singleton factories.
# How to Implement?
 1. Check whether it’s possible to provide a simpler interface than what an existing subsystem already provides. You’re on the right track if this interface makes the client code independent from many of the subsystem’s classes.

 2. Declare and implement this interface in a new facade class. The facade should redirect the calls from the client code to appropriate objects of the subsystem. The facade should be responsible for initializing the subsystem and managing its further life cycle unless the client code already does this.

 3. To get the full benefit from the pattern, make all the client code communicate with the subsystem only via the facade. Now the client code is protected from any changes in the subsystem code. For example, when a subsystem gets upgraded to a new version, you will only need to modify the code in the facade.

 4. If the facade becomes too big, consider extracting part of its behavior to a new, refined facade class.


# Diagram

[![Facade diagram](https://www.dofactory.com/img/diagrams/javascript/javascript-facade.jpg)](https://www.dofactory.com/javascript/design-patterns/facade)

# Pros and Cons
### Pros
*  You can isolate your code from the complexity of a subsystem.
### Cons
*  A facade can become a god object coupled to all classes of an app.
# example
file: indes.ts
