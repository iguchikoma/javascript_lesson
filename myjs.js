"use strict";

function f(o) {
  if (o === undefined)
//    debugger;
  console.log("value = " + o);
}

var mynum = 1, mystr = "iguchi";
f(mynum);
f();
f(mystr);

var o = {};
o.x = 1;
var p = Object.create(o);
p.y = 2;
var q = Object.create(p);
q.z = 3;
var s = q.toString();
console.log("q.x + q.y = " + (q.x + q.y));
p.x = 4;
console.log("q.x = " + q.x);
console.log("o.x = " + o.x);

/* hasOwnProperty unit test */
console.log("p.hasOwnProperty('x') = " + p.hasOwnProperty("x"));
console.log("p.hasOwnProperty('y') = " + p.hasOwnProperty("y"));
console.log("p.hasOwnProperty('z') = " + p.hasOwnProperty("z"));

/* for/in test include inheritance property*/
console.log("for/in test include inheritance property\n");

var myproto = {a:1, b:2, c:3};
var myobject = Object.create(myproto);
myobject.d = 4;
myobject.e = 5;
for (var i in myobject)
  console.log(i + " : " + myobject[i]);
/* end */

/* for/in test without inheritance property */
console.log("for/in test without inheritance property\n");

var myproto = {a:1, b:2, c:3};
var myobject = Object.create(myproto);
myobject.d = 4;
myobject.e = 5;
for (var i in myobject) {
  if (!myobject.hasOwnProperty(i)) {
    continue;
  }
  console.log(i + " : " + myobject[i]);
}
/* end */

/* object property utility: extend test */
console.log("object property utility: extend test\n");

function extend(o, p) {
  for(var prop in p) {
    o[prop] = p[prop];
  }
  return o;
}

var myobj1 = {a:1, b:2}
var myobj2 = {a:11, b:22, c:3, d:4}

extend(myobj1, myobj2);
for (p in myobj1)
  console.log(p + " : " + myobj1[p]);
/* end */

/* object property utility: merge test */
console.log("object property utility: merge test\n");
function merge(o, p) {
  for (var prop in p) {
    if (o.hasOwnProperty(prop))
      continue;
    o[prop] = p[prop];
  }
  return o;
}

var myobj1 = {a:1, b:2}
var myobj2 = {a:11, b:22, c:3, d:4}

merge(myobj2, myobj1);
for (p in myobj2)
  console.log(p + " : " + myobj2[p]);
/* end */

/* object property utility: restrict test */
console.log("object property utility: restrict test\n");

function restrict(o, p) {
  for (var prop in o) {
    if (!(prop in p)) delete o[prop];
  }
  return o;
}

var myobj1 = {a:1, b:2}
var myobj2 = {a:11, b:22, c:3, d:4}

restrict(myobj2, myobj1);
console.log(myobj2);
/* end */

/* object property utility: subtract test */
console.log("object property utility: subtract test\n");

function subtract(o, p) {
  for (var prop in o) {
    if (prop in p) delete o[prop];
  }
  return o;
}

var myobj1 = {a:1, b:2}
var myobj2 = {a:11, b:22, c:3, d:4}

subtract(myobj2, myobj1);
console.log(myobj2);
/* end */

/* object property utility: union test */
console.log("object property utility: union test\n");

function union(o, p) { return extend(extend({}, o), p); }

var myobj1 = {a:1, b:2}
var myobj2 = {c:3, d:4}

var o = union(myobj2, myobj1);
console.log(o);
/* end */

/* object property utility: intersection test */
console.log("object property utility: intersection test\n");

function intersection(o, p) { return restrict(extend({}, o), p); }

var myobj1 = {a:1, b:2}
var myobj2 = {a:11, c:3, d:4}

var o = intersection(myobj2, myobj1);
console.log(o);
/* end */

/* Object.key() test : input: object output: array of object propertys*/
console.log("Object.key() test\n");

var myobj1 = {a:11, c:3, d:4}
console.log(Object.keys(myobj1));
/* end */

/* Object.getOwnPropertyNames() test : input: object output: array of object propertys*/
console.log("Object.getOwnPropertyNames() test\n");

var myobj1 = {a:11, c:3, d:4}
console.log(Object.getOwnPropertyNames(myobj1));
/* end */

/* getter and setter method test */
console.log("getter and setter method test\n");
var o = {
  x : 2,
  y : 4,
  get r() { return this.x * this.y; },
  set r(a) {
    this.x = a;
  },
  get r2() { return this.x + this.y },
  f : function(){return 0;}
};

/* PropertyDescriptor test */
console.log(Object.getOwnPropertyDescriptor(o, "r"));
console.log(Object.getOwnPropertyDescriptor(o, "r2"));

for (p in o)
  console.log(p + ":" + o[p]);

console.log(o);
console.log(o.r);
console.log(o.r2);
console.log(o.f());
o.r = 9;  // call setter method
console.log(o.r);
console.log(o.r2);
for (p in o)
  console.log(p + ":" + o[p]);

/* getter and setter method test2 serialnum */
console.log("getter and setter method test2 serialnum\n");
var o = {
  $n : 0,
  get next() { return this.$n++; },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw "serial number can only be set to a larger value";
  }
};

console.log(o);
console.log(o.next);
console.log(o.next);
console.log(o.next);
o.next = 10;
console.log(o.next);
// o.next = 1;
console.log(o.next);

/* PropertyDescriptor test */
console.log(Object.getOwnPropertyDescriptor(o, "next"));
console.log(Object.getOwnPropertyDescriptor(o, "$n"));
console.log("property descriptor test \n");
var o = {x:1}
console.log(Object.getOwnPropertyDescriptor(o, "x"));
console.log(Object.getOwnPropertyDescriptor({}, "x"));
console.log(Object.getOwnPropertyDescriptor({}, "toString"));

var o = {}
Object.defineProperty(o, "x", {value: 10, writable: true, enumerable: false, configurable: true});
console.log(Object.getOwnPropertyDescriptor(o, "x"));
console.log(o);
console.log(Object.keys(o));

Object.defineProperty(o, "x", {writable: false});
// o.x = 2;
console.log(o.x);

/* getter and setter method property test */
console.log("getter and setter method test\n");
var o = {
  x : 2,
  y : 4,
  get r() { return this.x * this.y; },
  set r(a) {
    this.x = a;
  },
  get r2() { return this.x + this.y },
  f : function(){return 0;}
};

console.log(o.__lookupGetter__("r"));
console.log(o.__lookupGetter__("r2"));

/* get Object prototype test */
var o = {};
var d = new Date();
var a = new Array();
var aa = [];
var p = Object.create(a);
console.log(Object.getPrototypeOf(o));
console.log(Object.getPrototypeOf(d));
console.log(Object.getPrototypeOf(a));
console.log(Object.getPrototypeOf(aa));
console.log(Object.getPrototypeOf(p));

var p = {x:1};
var o = Object.create(p);
console.log(p.isPrototypeOf(o));
console.log(Object.prototype.isPrototypeOf(p));
// console.log(p.__proto__()); chomeでは使えなかった

/* get Object prototype test */
console.log("get Object prototype test\n");
function classof(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
console.log(classof(null));
console.log(classof(1));
console.log(classof(""));
console.log(classof(false));
console.log(classof({}));
console.log(classof([]));
console.log(classof(/./));
console.log(classof(new Date()));
console.log(classof(window));
function f() {};
console.log(classof(new f()));

/* get Object prototype test */
console.log("extensible test\n");
var o = {x:1};
console.log(Object.isExtensible(o));
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
console.log(Object.getOwnPropertyDescriptor(o, "x"));
Object.seal(o);
console.log(Object.getOwnPropertyDescriptor(o, "x"));

/* serialize test */
console.log("serialize test\n");
var d = new Date();
var o = {x:1, y:2, z:[1, 2, 3], f:function(){;}, date: d, a: Infinity, b:-Infinity, c:NaN, d:true, e:false, f:null};
console.log(Object.getOwnPropertyDescriptor(o, "f"));
console.log(o);
s = JSON.stringify(o);
console.log(s);
console.log(JSON.parse(s));

/* method of object test1: toString() */
console.log("toString test\n");
var o = {x:1, y:2};
var a = [1, 2, 3];
var f = function () { console.log("aaa\n"); };
var d = new Date();
var s = "hogehoge";
var n = 100;
console.log(o.toString());
console.log(a.toString());
console.log(f.toString());
console.log(d.toString());
console.log(s.toString());
console.log(n.toString());
console.log(o.toLocaleString());
console.log(a.toLocaleString());
console.log(f.toLocaleString());
console.log(d.toLocaleString());
console.log(s.toLocaleString());
console.log(n.toLocaleString());
//console.log(o.toJSON());
//console.log(a.toJSON());
//console.log(f.toJSON());
console.log(d.toJSON());
//console.log(s.toJSON());
//console.log(n.toJSON());
console.log(o.valueOf());
console.log(a.valueOf());
console.log(a.valueOf());
console.log(d.valueOf());
console.log(s.valueOf());
console.log(n.valueOf());

/* array test */
console.log("array test\n");
var a = [1, 2, , , 5];
console.log("[1, 2, , , 5].length = " + a.length);
for (i in a) console.log(i);
var a = new Array(10);
console.log("Array(10).length = " + a.length);
a[5] = 1111;
for (i in a) console.log(a[i]);
var a = new Array("a, b, c", "bbb", 1, 2, 3);
// console.log(a);

/* shift method test */
var a = [];
a.unshift(1, 2, 3, 4, 5);
console.log(a);
var s = a.toString();
console.log(s);
a.length = 0;
console.log(a);
var a = [];
a.unshift(1, 2, 3, 4, 5);
console.log(a.toLocaleString());

/* forEach method test */
console.log("forEach method test\n");
var a = [1, 2, 3, 4, 5];
a.forEach(function (value, index, array){
  array[index] = value*value;
  console.log(array);
});
console.log(a);


/* map method test */
console.log("map method test\n");
var a = [1, 2, 3, 4, 5];
var res = a.map(function(x){return ++x;});
console.log(a);
console.log(res);

/* filter method test */
console.log("filter method test\n");
var a = [1, 2, 3, 4, 5];
res = a.filter(function(x){ return x < 3; });
console.log(a);
console.log(res);

/* function test */
console.log("function test\n");
var f = function (){ return "hoge\n"; };
f.p = 1;
var f2 = f;
f2.p2 = 2;
console.log(f.p);
console.log(f.p2);
console.log(f());
f.f3 = function(){return "hogehoge\n"};
console.log(f.f3());

/* function return is undefined if return is null */
console.log("function test2\n");
f = function (){return;}
var v = f();
console.log(v);

/* function variable scope test */
console.log("function test3\n");
var a = 111;
var f = function (h1){
  var v2 = 2;
  var ff = function (h2) {
    var v3 = 3;
    console.log("v3 = " + v3 + " v2 = " + v2 + " h2 = " + h2 + " h1 = " + h1 + " a = " + a);
  }
  ff(222);
}
f(333);

/* function call context (this) test */
console.log("function vall context (this) test\n");
function f() {
//  return this.p1;
  return this;
}
f.p1 = 333;

console.log(f());
var o = {
  p1 : 111,
  f : function (v){
    return this.p1 * v;
  }
}
console.log(o.f(2));

/* function hikisu test  */
console.log("function hikisu test \n");
var f = function (o, a){
//  if (a === undefined)
//    a = [];
  a = a || [];
  for (p in o) {
    a.push(p);
  }
  return a;
}
var o = {x:1, y:2};
console.log(f(o));
var aa = [1, 2, 3]
console.log(f(o, aa));

/* arguments test */
console.log("arguments test\n");
var o = {
  f: function(){
       return arguments[1];
     }
}
console.log(o.f(1, 2));

// throw new Error("error test: this is error test");

o = {"x":100};
console.log(o.x);

// * function property test */
console.log("function property test\n");
uniqueInteger.counter = 0;
function uniqueInteger(){
  return uniqueInteger.counter++;
}
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());

var o = {f: function ff(){
  return ff[1];
}
}

o.f.aaa = 1;
o.f[0] = 0;
o.f[1] = 1;
console.log(o.f[0]);
console.log(o.f[1]);
console.log(o.f());

/* test 2 */
console.log("function test local arg\n");
function ff(){
  return ff[1];
}

ff[0] = 0;
ff[1] = 1;
console.log(ff[0]);
console.log(ff[1]);
console.log(ff());

/* 定義後すぐに呼び出す関数の書き方 */
(function (){
  console.log("aaa\n");
}());

/* クロージャのテスト */
console.log("closer test\n");
var scope = "global scope";
function outerf() {
  var scope = "local scope";
  function innerf() {
    return scope;
  }
  return innerf;
}

/* call() test */
console.log("call() test\n");
var f = function f () {
  return this;
}
o = {x:1};
console.log(f.call(o));
console.log(f.apply(o));

var f = function (v1, v2){
  return this.x + v1 + v2;
}
var o = {x:10};
console.log(f.apply(o, [2, 3]));
console.log(f.call(o, 2, 3));
var a = [1, 2, 3];
console.log(Math.max(a));
console.log(Math.max.apply(Math, a));

var x =1;
var s = "aaa";
console.log(x, s, "sss");


/* class test */
console.log("class test\n");
function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create)
    return Object.create(p);
  var t = typeof p;
  if(t !== "object" && t !== "function") throw TypeError();
  function f() {};
  f.prototype = p;
  return new f();
}

var o = {x:1};
console.log(inherit(o));

var o = {x:1};
var oo = Object.create(o);
console.log(oo.x);
// oo.x = 2;
console.log(oo.x);
console.log(o.x);
o.x = 4;
o.y = 5;
console.log(oo.y);
console.log(o.x);

console.log(oo instanceof inherit);

// Constructor function
function Counter(init){
  this.count = init;
}
Counter.prototype = {
  constructor : Counter,
  add : function(){return ++this.count;},
  del : function(){return --this.count;},
  toString: function(){return "my original class";}
};
var c = new Counter(10);
console.log(c);
console.log(c.add());
console.log(c.del());
console.log(c);
console.log(c instanceof Counter);
console.log(c.constructor === Counter);

var a = function(){};
var b = a.prototype;
var c = b.constructor;
console.log(a===c);

// class definition
function Counter2(init){
  this.count = init; // instance field
  this.method = function() {return "this is class method"}; // instance method
}
Counter2.prototype.add = function(){return ++this.count;}; // instance method
Counter2.prototype.toString = function(){return "saa";}; // instance method

var a = new Counter2(1);
console.log(a.constructor);
console.log(a.constructor === Counter2);
var x = new Counter2(100); // constructor call
var y = new Counter2(200); // constructor call
x.myc = "instance field"; // instance field
console.dir(x);
console.log(x.add()); // instance method call
console.log(y.add()); // instance method call
console.log(x.myc); // instance field
console.log(x.method()); // class method
Counter2.method2  = function () { return "this is class method2"};
Counter2.prototype.method3  = function () { return "this is class method3"};
console.log(Counter2.method2()); // class method
// console.log(x.method2()); // class method2
console.log(x.method3()); // class method2
var z = new Counter2(300);
// console.log(z.method2()); // class method2

console.log(Object.keys(x));
console.log(Object.keys(Counter2));
for (p in x) console.log(p);
var z = new Counter2(200);
console.log(z.method()); // class method
console.log(x.constructor);
console.log(String(x));
console.log(Counter2);

var o = {x:1};
console.log(o.constructor);
// x = Object.create(o, {y:2});
console.log(x);
