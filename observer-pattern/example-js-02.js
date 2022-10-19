// https://gist.github.com/leommoore/6754498

// #JavaScript - Observer Pattern An array of subscribers are just callback functions

// addSubscriber() and removeSubscriber() methods that add to and remove from the subscribers array
// A publish() method that takes data and calls all subscribers, passing the data to them
// A make() method that takes any object and turns it into a publisher by adding all of the above methods to it
var observer = {

    addSubscriber: function(callback) {
      this.subscribers[this.subscribers.length] = callback;
    },
  
    removeSubscriber: function(callback) {
      for (var i = 0; i < this.subscribers.length; i++) {
        if (this.subscribers[i] === callback) {
          delete(this.subscribers[i]);
        }
      }
    },
  
    publish: function(what) {
      for (var i = 0; i < this.subscribers.length; i++) {
        if (typeof this.subscribers[i] === 'function') {
          this.subscribers[i](what);
        }
      }
    },
  
    make: function(o) { // turns an object into a publisher
      for(var i in this) {
        o[i] = this[i];
        o.subscribers = [];
      }
    }
  };

//   ##An Example

// This is a blogger object that calls publish() every time a new blog post is ready.
  var blogger = {
    writeBlogPost: function() {
      var content = 'Today is ' + new Date();
      this.publish(content);
    }
  };
//   Another object could be a newspaper which calls publish when a new issue is out.
  var la_times = {
    newIssue: function() {
      var paper = 'Martians have landed on Earth!';
      this.publish(paper);
    }
  };
// To make these publishers:
  observer.make(blogger);
  observer.make(la_times)
//   Then say we have two people:
  var jack = {
    read: function(what) {
      console.log('I just read that ' + what)
    }
  };
  
  var jill = {
    gossip: function(what) {
      console.log('You didn\'t hear it from me, but ' + what)
    }
  };
/* Now, jack and jill can subscribe to the blogger object by providing the callback methods they want to be 
    called when something is published.Now, jack and jill can subscribe to the blogger object by providing the
    callback methods they want to be called when something is published.
*/ 
  blogger.addSubscriber(jack.read);
  blogger.addSubscriber(jill.gossip);
// What happens when blogger publishes a new post?
  blogger.writeBlogPost();

//   I just read that Today is Sun Apr 06 2008 00:43:54 GMT-0700 
//   (Pacific Daylight Time)
  
//   You didn't hear it from me, but Today is Sun Apr 06 2008 00:43:54 GMT-0700 
//   (Pacific Daylight Time)

// At any time a subscriber can cancel their subscription.
  blogger.removeSubscriber(jill.gossip);
//   A subscriber can subscribe to any number of publications.

//   For more into check out the excellent book http://www.packtpub.com/object-oriented-javascript/book by Stoyan Stefanov.