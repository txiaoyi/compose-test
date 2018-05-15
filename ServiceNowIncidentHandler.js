/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */

var request = require("request");

function main(params) {
    var action_name = process.env.__OW_ACTION_NAME;
    if(!params.error) {
        return {message: 'input is not an error.'}
    }

    console.log(params.error);

    /*
    incidentError = {
      "action_name": process.env.__OW_ACTION_NAME,
      "raised_time": new Date(),
      "code" : '1234',
      "message": "there is an error"
    }
    */
    var options = {
        url: "https://cms3prod.service-now.com/api/now/table/incident",
        body: {
            short_description: "this is incident automatically generated for "+ params.error.action_name,
            description: params.error.action_name + " : [" + params.error.code + "] : " + params.error.message
        },
        method: 'POST',
        auth: {
            user: 'tmidboe@us.ibm.com',
            pass: 's3rv3rL3ss'
        },
        json: true
    };
    return new Promise(function(resolve, reject) {
        request(options, function(err, resp) {
            if (err) {
                reject({
                    error: err
                })
            }
            resolve({
                payload: resp
            });
        });
    });
  
};
