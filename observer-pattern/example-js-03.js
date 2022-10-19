function Publisher() {
    this.subscribers = [];
  
    this.subscribe = (subscriber) => {
      this.subscribers.push(subscriber)
    }
  
    this.unsubscribe = (unsubscriber) => {
      this.subscribers = this.subscribers.filter(subscriber => {
        if(subscriber !== unsubscriber) {
          return subscriber;
        }
      })
    }
  
    this.publish = () => {
      this.subscribers.forEach(sub => sub.call())
    }
}
const subscriberOne = () => {
    console.log("calling subscriber one")
}
  
const subscriberTwo = () => {
    console.log("calling subscriber two")
}

const publisher = new Publisher();

// subscrbe
publisher.subscribe(subscriberOne);
publisher.subscribe(subscriberTwo);

// unsubscribe
publisher.unsubscribe(subscriberTwo);

publisher.publish()
// => "calling subscriber one"