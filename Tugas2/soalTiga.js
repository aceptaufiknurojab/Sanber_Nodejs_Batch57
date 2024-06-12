const formula = require("./formula");

// const a = 10;
// const b = 5;

var a = 10;
var b = 5;
console.log(`Tambah: ${a} + ${b} = ${formula.tambah(a, b)}`);
console.log(`Kurang: ${a} - ${b} = ${formula.kurang(a, b)}`);
console.log(`Kali: ${a} * ${b} = ${formula.kali(a, b)}`);
console.log(`Bagi: ${a} / ${b} = ${formula.bagi(a, b)}`);
