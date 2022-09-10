const { Router } = require("express");
const { uploadFile, readFile } = require("./s3");

const router = Router();

router.get("/", (req, res) => res.send("Welcome to server"));

router.post("/upload", async (req, res) => {
  console.log(req.files["photo"]);
  const result = await uploadFile(req.files["photo"]);

  console.log(result);
  res.send("Archivo subido");
});

router.get("/getFile/:name", async (req, res) => {
    console.log(req.params.name);
    try {
        const result = await readFile(req.params.name);
        res.send('Archivo descargado');

    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
