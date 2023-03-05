class Product {
    constructor(id, product) {
        // Properties
        this.id = id;
        this.product = product || "Unknown";
        this.message = function () {
            return `Your Product Is ${this.product}`;
        }

    }
    // Methods
    useMessage() {
        return `Your Product Is ${this.product}`;
    }
}

let productOne = new Product(1, "Keyboard");
console.log(productOne.useMessage());

let strTwo = new String("Moody");

// Inhertance
class Admin {
    constructor(createGroup, deleteGroup, createPosts, deletePosts, approvePosts, addMembers) {
        this.cg = createGroup;
        this.dg = deleteGroup;
        this.cp = createPosts;
        this.dp = deletePosts;
        this.ap = approvePosts;
        this.am = addMembers;
    }
}
let adminRole = new Admin("I Can Create the Group", "I Can Delete the Group", "I Can Create Posts in Group", "I Can Delete Posts", "I Can Approve Posts", "I Can Add Members");

class Moderator extends Admin {
    constructor(createPosts, deletePosts, approvePosts, addMembers) {
        super(createPosts, deletePosts, approvePosts, addMembers);
    }
}
let moderatorRole = new Moderator("I Can Create Posts in Group as a Moderator", "I Can Delete Posts", "I Can Approve Posts", "I Can Add Members");

// Encapsulation

class User {
    #es;
    constructor(idr, username, eSalary) {
        this.i = idr;
        this.u = username;
        this.#es = eSalary; 
    }
    getSalary() {
        return parseInt(this.#es);
    }
}
let userOne = new User(100, "Hamada El Emam", "5000 Pound");
console.log(userOne.getSalary() * 0.3);


// Fetch API

// Promises

let myPromise = new Promise((resolve, reject) => {
    let myData = [1, 2, 3, 4, 5];
    if (myData.length > 0) {
        resolve("All Better");
    } else {
        reject(Error("No Data Available"));
    };
}).then(
    (resolveValue) => console.log(resolveValue),
    (rejectValue) => console.log(rejectValue)
);

// XMLHttpRequest

let myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = () => {
    if (this.readyState === 4 && this.status === 200) {
        console.log('Success');
    }
};
myRequest.open('GET', "https://api.github.com/users/elzerowebschool/repos");
myRequest.send();

// Fetch
fetch("https://api.github.com/users/elzerowebschool/repos")
.then((result) => result.json())
.then((myData) => console.log(myData[0].id));

// Fetch with async