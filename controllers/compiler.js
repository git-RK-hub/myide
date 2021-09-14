const { cCompiler, cppCompiler, jsCompiler } = require("../compilers");
const fs = require("fs");
const path = require("path");

exports.compile = async (req, res) => {
  try {
    const lang = req.body.lang;
    const cb = (data) => {
      res.send(data);
    };
    if (lang === "js") {
      // create file
      const filePath = path.resolve(
        __dirname,
        "../code",
        String(new Date(Date.now()).getTime())
      );
      fs.writeFile(filePath, req.body.data, (err) => {
        if (err) res.send(err.message);
      });

      //  call js compiler
      jsCompiler(filePath, cb);
    } else if (lang === "cpp") {
      // create cpp file
      const filePath = path.resolve(
        __dirname,
        "../code",
        new Date(Date.now()).getTime() + ".cpp"
      );
      fs.writeFile(filePath, req.body.data, (err) => {
        if (err) res.send(err.message);
      });

      // call cpp compiler
      cppCompiler(filePath, cb);
    } else if (lang === "c") {
      // create c file
      const filePath = path.resolve(
        __dirname,
        "../code",
        new Date(Date.now()).getTime() + ".c"
      );
      fs.writeFile(filePath, req.body.data, (err) => {
        if (err) res.send(err.message);
      });

      // call c compiler
      cCompiler(filePath, cb);
    } else {
      res.send("Select Language");
    }
  } catch (err) {
    console.log(err);
  }
};
