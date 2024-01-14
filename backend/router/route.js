const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Yess!! working (:")
})
router.get("/socket.io/:data", (req, res) => {
    console.log(req.params.data);
    console.log(req);
})

module.exports = router