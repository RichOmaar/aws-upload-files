const { Router } = require("express");
const { uploadFile, readFile } = require("./s3");

const router = Router();

router.get("/", (req, res) => res.send("Welcome to server"));

router.post("/upload", async (req, res) => {
  const result = await uploadFile(req.files["photo"]);

  console.log(result[0]['fileURL']);
  res.send(result[0]['fileURL']);
});

router.get("/getFile/:name", async (req, res) => {
    // console.log(req.params.name);
    console.log('Archivo descargado');
    try {
        const result = await readFile(req.params.name);
        res.send('Archivo descargado');

    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
