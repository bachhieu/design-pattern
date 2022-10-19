# What is Factory method?
Factory method is a creational design pattern which solves the problem of creating product objects without specifying their concrete classes.
The Factory Method defines a method, which should be used for creating objects instead of using a direct constructor call (new operator). Subclasses can override this method to change the class of objects that will be created.

# Using Factory Method
The key objective of the Factory Method is extensibility. Factory Methods are frequently used in applications that manage, maintain, or manipulate collections of objects that are different but at the same time have many characteristics (i.e. methods and properties) in common. An example would be a collection of documents with a mix of Xml documents, Pdf documents, and Rtf documents.

# How to Implement?

1. Make all products follow the same interface. This interface should declare methods that make sense in every product.

2. Add an empty factory method inside the creator class. The return type of the method should match the common product interface.

3. In the creator’s code find all references to product constructors. One by one, replace them with calls to the factory method, while extracting the product creation code into the factory method.

You might need to add a temporary parameter to the factory method to control the type of returned product.

At this point, the code of the factory method may look pretty ugly. It may have a large switch statement that picks which product class to instantiate. But don’t worry, we’ll fix it soon enough.

4. Now, create a set of creator subclasses for each type of product listed in the factory method. Override the factory method in the subclasses and extract the appropriate bits of construction code from the base method.

5. If there are too many product types and it doesn’t make sense to create subclasses for all of them, you can reuse the control parameter from the base class in subclasses.

For instance, imagine that you have the following hierarchy of classes: the base Mail class with a couple of subclasses: AirMail and GroundMail; the Transport classes are Plane, Truck and Train. While the AirMail class only uses Plane objects, GroundMail may work with both Truck and Train objects. You can create a new subclass (say TrainMail) to handle both cases, but there’s another option. The client code can pass an argument to the factory method of the GroundMail class to control which product it wants to receive.

6. If, after all of the extractions, the base factory method has become empty, you can make it abstract. If there’s something left, you can make it a default behavior of the method.

# Diagram

[![factory diagram](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dofactory.com%2Fjavascript%2Fdesign-patterns%2Ffactory-method&psig=AOvVaw31k2pv7PVByljbBPdv0RGU&ust=1666066186490000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNCqqKuy5voCFQAAAAAdAAAAABAR)](https://www.dofactory.com/javascript/design-patterns/factory-method)

# Pros and Cons

### Pros 
 * You avoid tight coupling between the creator and the concrete products.
 * Single Responsibility Principle. You can move the product creation code into one place in the program, making the code easier to support.
 * Open/Closed Principle. You can introduce new types of products into the program without breaking existing client code.
### Cons
 * The code may become more complicated since you need to introduce a lot of new subclasses to implement the pattern. The best case scenario is when you’re introducing the pattern into an existing hierarchy of creator classes.
# example
file: indes.ts
