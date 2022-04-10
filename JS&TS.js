/* Scope */
// global scope
// biến thuộc phạm vi toàn cầu nên truy cập xuyên suốt được.
// biến global có thể khai báo không cần var let const;
  firstName = 'Thoang',
  console.log(firstName)
/* var name = 'Thoang'
const fullName = 'Hoang Van Thoang'
function a() {
{ 
  { 
     function b(){
        console.log(name) 
        console.log(fullName)
     }
     b();
  }
}

}
a();

function log() {
  console.log(1245)
}

function log2() {
  log();
}

log2();
 */

// code - block 
// code nằm trong 1 khối code: let, const;
// var thì vẫn truy cập được.
// sử dụng biến khi ở trong phạm vi khối mã: {}, if, loop, white.

// if(1<2) {

//   let nameFresher = 'Thoang Hoang'
//   var nameMentor = 'Bang'

// }

// console.log(nameMentor)
// console.log(nameFresher)

// local scope: function.
// function tự định nghĩa phạm vi truy cập cục bộ (local scope) của riêng nó.
// phạm vi trong function.

// function local() {
//   var nameFriend = 'Tuyen'
//   console.log('in loacl-scope:',nameFriend)
//  }
// local()
// console.log(nameFriend) 


// đây gọi là function scope
// var local2 = function loacl3() {
//     console.log('abc')
//     var local4 = function loacl5() {
//        }
// }
// console.log(loacl3())

 
 //LEXICAL SCOPE (closure)
 // là funtion trong 1 func có thể dùng được biến của func ngoài.
 
/*  function func1() {
    let first = 12
    function func2(){
    var first = 13
    console.log(first)
    }
    func2();
 } 
 func1();
 */
 
 //Scope chain
/*  function b() {
  console.log(text);//ko tìm thấy biến text
 }
 
 function a() {
  var text = "in a"; // biến text lỗi
  b();
 }
 
 a();
 var text = "in global"; // var được hoisting var text */
 
 // Closures: giống như 1 bao đóng.
 // Là 1 hàm có thể ghi nhớ nơi nó đc tạo và truy cập được ở biến bên ngoài phạm vi của nó.
 // Một closure là một hàm bên trong mà có thể truy cập biến của hàm   bên ngoài (chứa nó). 
 // Closure có 3 scope chain, đó là:
 //- Có thể truy cập đến biến của chính nó (biến được định nghĩa trong dấu ngoặc nhọn của nó);
 //- Có thể truy cập biến của hàm bên ngoài; 
 //- Có thể truy cập biến toàn cục (global).

 /* let fullName = 'Hoang Van Thoang' // variable global
 function a() { // Closure
    var name = "Thoang";
    function b() { // Closure
        console.log(name);
        function c() { // Closure
          console.log(fullName)
        }
        c();
    }
    b();
 }
 a(); */
 
//  function createApp() {
//   const phones = [];
//   return {
//     add(iphone) {
//       phones.push(iphone)
//     },
//     show() {
//     console.log(phones)
//     } 
//   } 
//  }
 
//  const app = createApp()
 
//  app.add('iphone12')
//  app.add('iphone13')
//  app.add('iphone14')
 
//  app.show()


// So sánh == và ===;
// So sa sánh == là so sánh dữ liệu

// let c = '1'

// let d = 1 

// console.log(c == d)

// let a = {firstName: 'Thanh'}

// let b = {firstName: 'Thanh'}

// console.log(a.firstName === b.firstName)

// console.log("This is a string." == new String("This is a string.")); //true
// // so sánh == thì value đều là string

// console.log("This is a string." === new String("This is a string.")); //false
// //new String("This is a string." kiểu của nó là object


// console.log(undefined == null); // true
 
// console.log(undefined === null); // false. Undefined and null are distinct types and are not interchangeable.

// console.log(true == 'true'); // false. A string will not be converted to a boolean and vice versa.
 
// console.log(true === 'true'); // false

// var a = [];
// var b = []; // a và b có vùng nhớ riêng biệt
// var c = a; // đều trỏ về 1 vùng nhớ
 
// console.log(a == b); // false
// console.log(a === b); // false
// console.log(a == c); // true
// console.log(a === c); // true