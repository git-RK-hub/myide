const { spawn } = require("child_process");
const path = require("path");

exports.cOnly = (src) => {
  var filename = path.parse(src).name; // codec
  var extension = path.parse(src).ext; // .c
  if (extension === ".c") {
    var args_compile = []; //['codec.c', '-o','codec.out']
    args_compile[0] = src;
    args_compile[1] = "-o";
    args_compile[2] = filename + ".out";
    var cmd_run = "./" + filename + ".out";
    execute("gcc", args_compile, cmd_run, []);
  } else {
    console.log(src + " is not a c file.");
  }
};

exports.cPlusPlus = (src) => {
  var filename = path.parse(src).name; // codec
  var extension = path.parse(src).ext; // .cpp
  if (extension === ".cpp") {
    var args_compile = []; //['codec.cpp', '-o','codec.out']
    args_compile[0] = src;
    args_compile[1] = "-o";
    args_compile[2] = filename + ".out";
    var cmd_run = "./" + filename + ".out";
    execute("g++", args_compile, cmd_run, []);
  } else {
    console.log(src + " is not a c++ file.");
  }
};

const execute = (compiler, args_compile, command, args_run) => {
  const compile = spawn(compiler, args_compile);

  compile.stdout.on("data", (data) => {
    console.log("data: ", data);
  });

  compile.stderr.on("data", (err) => {
    console.log(String(err));
  });

  compile.on("close", function (data) {
    if (data === 0) {
      var run = spawn(command, args_run);
      run.stdout.on("data", function (output) {
        console.log(String(output));
      });
      run.stderr.on("data", function (output) {
        console.log("stderr: " + String(output));
      });
      run.on("close", function (output) {
        console.log("stdout: " + output);
      });
    }
  });
};
