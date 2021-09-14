const { spawn } = require("child_process");
const path = require("path");

const jsCompiler = (src, cb) => {
  var filename = path.parse(src).name; // codec
  var args_compile = []; // ['codec.js']
  args_compile[0] = src;
  var cmd_run = filename + ".js";
  execute("node", args_compile, cmd_run, [], cb);
};

const execute = (compiler, args_compile, command, args_run, cb) => {
  const compile = spawn(compiler, args_compile);

  compile.stdout.on("data", (data) => {
    cb(String(data));
  });

  compile.stderr.on("data", (err) => {
    cb(String(err));
  });

  compile.on("close", function (data) {
    console.log(data);
  });
};

module.exports = jsCompiler;
