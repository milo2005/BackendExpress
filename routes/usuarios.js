var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    let nombre = req.query.nombre;
    res.send({ msg: "Entro en GET", nombre: nombre });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    body.msg = "Entro en POST";
    res.send(body);
});

router.put("/:id", (req, res, next) => {
    let body = req.body;
    body.msg = "Entro en PUT";
    body.id = req.params.id;
    res.send(body);
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    res.send({msg:"Entro en DELETE", id:id});
});

module.exports = router;