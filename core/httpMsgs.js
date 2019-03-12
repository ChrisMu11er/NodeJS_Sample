// All HTTP messages that will be send will be defined here.
var settings = require("../settings");

exports.show500 = function (req, res, err){
    if (settings.httpMsgsFormat === "JSON") {
        res.writeHead(500, "INTERNAL ERROR OCCURED", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data : "Error Occured" + err}));
    }
    res.end();
};

exports.SendJson = function (req, res, data) {
    if (data) {
        res.writeHead(200, "OK", {"Content-Type": "application/json"});
        res.write(JSON.stringify(data));
    }
    res.end();
}

exports.show200 = function(req, res) {
    if (settings.httpMsgsFormat === "JSON") {
        res.writeHead(200, "OK", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data : "Success"}));
    }
    res.end();
}

