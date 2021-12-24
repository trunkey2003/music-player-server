const ZingMp3 = require('zingmp3-api');
class Zingmp3Controller{
    searchSongs(req, res){
        ZingMp3.search(req.body.value)
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).send("Cannot get"));
    }
}

module.exports = new Zingmp3Controller;