const { spawn } = require("child_process");
const path = require("path");

const cCompiler = (src, cb) => {
  var filename = path.parse(src).name;
  var extension = path.parse(src).ext;
  if (extension === ".c") {
    var args_compile = [];
    args_compile[0] = src;
    args_compile[1] = "-o";
    args_compile[2] = filename + ".out";
    var cmd_run = "../code/" + filename + ".out";
    execute("gcc", args_compile, cmd_run, [], cb);
  } else {
    console.log(src + " is not a c file.");
  }
};

const execute = (compiler, args_compile, command, args_run, cb) => {
  const compile = spawn(compiler, args_compile);

  compile.stdout.on("data", (data) => {
    console.log("data: ", data);
    cb(String(data));
  });

  compile.stderr.on("data", (err) => {
    console.log(String(err));
  });

  compile.on("close", function (data) {
    if (data === 0) {
      var run = spawn(command, args_run);
      run.stdout.on("data", function (output) {
        cb(String(output));
      });
      run.stderr.on("data", function (output) {
        cb(String(output));
      });
      run.on("close", function (output) {
        console.log("stdout: " + output);
      });
    }
  });
};

module.exports = cCompiler;
