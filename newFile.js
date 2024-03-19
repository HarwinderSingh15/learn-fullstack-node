const fs = require("fs");

fs.appendFile("./newFile.js", 'const newFile = "File"', {}, () => {
  console.log("done");
});
