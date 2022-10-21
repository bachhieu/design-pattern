/**
 * khai báo đại diện cho Cty apple
 */
namespace Apple {
    // Khai báo biến đại diện cho những người subscribe apple
    let observers: Client.Observer[] = [];
    // Khai báo giao diện chung cho thông báo của apple
    export interface Subject {

        // Đăng ký 1 người thành người theo dõi 
        subscribe(observer: Client.Observer): void;
    
       // Hủy đăng ký 1 người thành người theo dõi 
        unsubscribe(observer: Client.Observer): void;
    
        // Thông báo đến với mọi người khi có thông tin mới
        notify(): void;
    }
    // Nơi cập nhật người theo dõi,hủy theo dõi và thông báo khi có tin tức mới của Apple
    export class AppleNews implements Subject {
        public news:boolean
        constructor(){
            this.news = false
        }
        // Đăng ký 1 người thành người theo dõi
        public subscribe(observer: Client.Observer) {
            const isExist = observers.includes(observer);
            if (isExist) {
                return console.log(`subscribe: ${observer.name} has been subscribe already.`);
            }

        console.log(`subscribe: ${observer.name} has subscribe is  an observer.`);
        observers.push(observer);
        }
         //Hủy đăng ký 1 người thành người theo dõi
        public unsubscribe(observer: Client.Observer) {
            const observerIndex = observers.indexOf(observer);
            if (observerIndex === -1) {
                return console.log('unsubscribe: Nonexistent observer.');
            }
            observers.splice(observerIndex, 1);
            console.log(`unsubscribe: ${observer.name} has unsubscribed.`);
        }
        // Thông báo đến với mọi người khi có thông tin mới
        public notify() {
            console.log('notify: Notifying observers...\n');
            for (const observer of observers) {
                observer.update(this);
            }
        }
        // Cập nhật tin tức mới 
        public updateNews(): void {
            console.log('updateNews: iPhone 15 coming soon');
            this.news = true
            this.notify();
        }
    }
}
/**
 * khai báo đại diện cho người dùng
 */
namespace Client {
    // Khai báo giao diện chung cho người dùng
    export interface Observer {
        name :string
        // phản ứng của những người đăng ký theo dõi tin tức.
        update(subject:Apple.Subject): void;
    }
     // Khai báo class ConcreteObserver để tạo người dùng cụ thể
    export class ConcreteObserver implements Observer {
        // Thông tin của người dùng
        public name :string
        // Hàm tạo người dùng
        constructor(name:string) {
            this.name = name
        }

        // phản ứng của những người người dùng khi đăng ký theo dõi tin tức của apple
        public update(subject: Apple.Subject): void {
            if (subject instanceof Apple.AppleNews && subject.news) {
                console.log(`ConcreteObserver:${this.name} Reacted to the event.`);
            }
        }
    }
}

//Tạo 1 thông báo
const subject1 = new Apple.AppleNews();

// Tạo người dùng jack
const jack = new Client.ConcreteObserver('jack');
// jack đăng ký theo dõi tin tức
subject1.subscribe(jack)
//tương tự với maria
const maria = new Client.ConcreteObserver('maria');
subject1.subscribe(maria);
console.log('-----------------------------')
// apple cập nhật tin tức mới và thông báo tới người theo dõi
// cả jack và maria sẽ nhận được thông báo
subject1.updateNews();
console.log('-----------------------------')
// maria hủy đăng ký nhận thông báo
subject1.unsubscribe(maria);
console.log('-----------------------------')
// apple cập nhật tin tức mới và thông báo tới người theo dõi
// nhưng maria giờ sẽ không nhận được thông báo nữa
subject1.updateNews();
console.log('-----------------------------')

