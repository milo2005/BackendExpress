var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    //let nombre = req.query.nombre;
    req.db.query("SELECT * FROM usuario", (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM usuario WHERE idusuario = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).send({ msg: "Usuario no encontrado" });
            }
        }
    });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    req.db.query("INSERT INTO usuario SET ?", body, (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});


router.put("/:id", (req, res, next) => {
    let body = req.body;
    let id = req.params.id;
    req.db.query("UPDATE usuario SET ? WHERE idusuario = ?", [body, id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("DELETE FROM usuario WHERE idusuario = ?", [id], (err, result)=>{
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.post("/login",(req, res, next)=>{
    let body = req.body;
    req.db.query("SELECT * FROM usuario WHERE usr = ? AND pass = ?",[body.usr, body.pass]
        , (err, results)=>{
            if(err){
                res.send({success:false});
            }else{
                if(results.length > 0){
                    let usr = results[0];
                    delete usr.pass;
                    delete usr.usr;
                    //Encriptar CryptoJS
                    //Para crear token de sesion es JSONToken
                    res.send({sucess:true, user: usr});
                }else{
                    res.send({success:false});
                }
            }

        });
});

module.exports = router;