/// /////////////////////////////////////////////////////
// when to use square bracket vs dot notation
const shape = {
  'bounding box weight': 20,
  side1: 5,
  side2: 15,
  side3: 20,
};

console.log(shape['bounding box weight']);

for (let i = 1; i < 4; i++) {
  const prop = `side${i}`;
  console.log(shape[prop]); // if dot notation used, result are undefined
}

/// /////////////////////////////////////////////////////
// getting property names with for in
const car = { make: 'Toyota', model: 'Camry' };
for (const prop in car) {
  console.log(`${prop}: ${car[prop]}`);
}

// skip properties while loop with for in
const car_with_func = {
  make: 'Toyota',
  model: 'Camry',
  print() {
    console.log(`${this.make} ${this.model}`);
  },
};
for (const prop in car_with_func) {
  if (typeof car_with_func[prop] !== 'function') {
    console.log(prop);
  }
}

/// /////////////////////////////////////////////////////
// delete properties
const circle = { radius: 8 };
console.log(delete circle.radius);
console.log(circle.radius);

/// /////////////////////////////////////////////////////
// creating objects with constructor functions

function Book(isbn) {
  this.isbn = isbn;
  this.getIsbn = function () {
    return `Isbn is ${this.isbn}`;
  };
}

// better design pattern, created intance is shared across all new
Book.prototype.getIsrn = function () {
  return `Isrn is ${this.isbn}`;
};

const book = new Book('901-3865');
console.log(book.getIsbn());

/// /////////////////////////////////////////////////////
// new keyword

// must use new keyword when call instructor function if not code will break without warning
// way to protect from this type of error
function Task() {
  if (!(this instanceof Task)) {
    return new Task();
  }
  this.message = 'Learning JS';
}

const t = Task();
console.log(t.message);

/// /////////////////////////////////////////////////////
// this keyword
// if this not execute in function context, its bound to global object
const str = 'hello';
console.log(str); // print hello

this.str = 'world';
console.log(str); // print world

// 'this' instance depend on where is begin call

/// /////////////////////////////////////////////////////
// prototypal inheritance
// javascript object inherit from other object, called prototypal inheritance system

const account = {
  bank: 'Bank of America',
  getBank() {
    return this.bank;
  },
};

function createObject(p) {
  // create a new and empty function
  const F = function () {};
  F.prototype = p;
  return new F();
}

const savings = createObject(account);
savings.accountHolders = [];
savings.getAccountHolders = function () {
  return this.accountHolders;
};

savings.accountHolders.push('Jack Saver');
savings.accountHolders.push('Mary Saver');
