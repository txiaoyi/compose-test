/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  console.log('${process.env.__OW_ACTION_NAME} : input params : ');
  console.log(params);
  
  console.log(process);
  
  if(params.error) {
    console.log(params.error);
    var incidentError = {
      "action_name": process.env.__OW_ACTION_NAME,
      "raised_time": new Date(),
      "code" : '1234',
      "message": "there is an error"
    }
    return {error: incidentError}
  }
	return { message : 'success' };
}
