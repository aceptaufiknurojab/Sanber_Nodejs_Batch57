//--Soal point pertama Baca file
const fs = require("fs");

fs.readFile("./latihan-baca-file.txt", "utf-8", (err, fetch) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log(fetch);
  }
});
