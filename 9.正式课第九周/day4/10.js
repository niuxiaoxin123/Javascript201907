var name = "hello";
var age = "zfpx";
export {
    name as a,
    age
}
export function fn() {
    console.log(7);
};
export  class A {

};
export let n =10;
// 只能用一次；用export default可以重新制定的名字；
export default function f() {
    console.log(333);
}
f();