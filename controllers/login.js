var db = require("../core/db");
var HTTPmessages = require("../core/httpMsgs");

exports.login = function(req, resp, reqbody){
    var body = JSON.parse(reqbody);
    console.log(body);
    var username = body.username;
    var password = body.password;
    try {
      var qryWebLogin = "SELECT * FROM Users WHERE [password] = '" + password + "' AND email = '" + username + "'";
      db.executeSql(qryWebLogin, function (data, err) {
          console.log("data: -" + JSON.stringify(data)+ "-");
          if (err) {
              console.log("error here: " + err + ' With the dbExecuteSql.');
              HTTPmessages.show500(req, resp, err);
          }
          else {
              if (data == "null" || data == "") {
                  console.log("User does not exist");
                  var loginFalse = "0";
                  HTTPmessages.SendJson(req, resp, loginFalse, req.headers.origin);
              }
              else if (data[0].email) {
                  HTTPmessages.SendJson(req, resp, data, req.headers.origin);
              }
         }
      });
    } catch (ex){
        console.log("Error: " + ex);
        HTTPmessages.show500(req, resp, "Error: " + ex);
    }
};
