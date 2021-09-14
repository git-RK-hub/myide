const router = require("express").Router();
const { cOnly } = require("../compiler");
const fs = require("fs");

router.post("/", (req, res) => {
  fs.writeFile("hello2.c", req.body.data, (err) => {
    if (err) res.send(err.message);
  });
  const cb = (data) => {
    res.send(data);
  };
  const output = cOnly("hello2.c", cb);
});

module.exports = router;
