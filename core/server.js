// This is the core part of the project. 
var http = require("http");
var settings = require("../settings");
var HTTPmessages = require("../core/httpMsgs");

var loginCtrl = require("../controllers/login");

http.createServer(function (req, res){
    console.log(req.method);
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
        switch (req.method) {
            case "OPTIONS":
                console.log(req.headers.origin);
                resp.setHeader('Access-Control-Allow-Origin', req.headers.origin);
                resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
                resp.setHeader('Access-Control-Allow-Credentials', false);
                resp.setHeader('Access-Control-Max-Age', '86400');
                resp.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Origin, Content-Type, Accept');

                resp.writeHead(200, 'OK', { "Content-Type": "application/json" });
                resp.end();
                break;
            case "GET":
                if (req.url == "/hello") {
                    console.log("HELLO WORLD!");
                }
                else if (req.url == "/api/test") {
                    console.log("testing works");
                }
                else {
                    console.log('nothing');
                }
                break;
            case "POST":
                res.setHeader('Access-Control-Allow-Origin', '*');
                console.log(req.url);
                if (req.url == "/") {
                    resp.end();
                }
                else if (req.url == "/api/login/") {
                  console.log("Login-users");
                    var reqBody = '';
                    req.on("data", function (data) {
                        reqBody += data;
                    });
                    req.on("end", function () {
                        loginCtrl.login(req, res, reqBody);
                    });
                }
            default:
                break;
        }
        res.end();
    }
    catch (ex) {
        console.log("Error: " + ex);
        HTTPmessages.show500(req, res, "Error: " + ex );
    }
    
}).listen(settings.webPort, function(){
    console.log('running the SampleAPI');
    console.log('listening at port: ' + settings.webPort);
})
