const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.a === undefined || event.b === undefined || event.operator === undefined) {
        callback("Your input is needs to be a number");
    }

    if (isNaN(event.a) || isNaN(event.b)) {
        callback("Your operator needs to be either +,-,* or / ");
    }
   
    var result;
    const a = Number(event.a);
    const b = Number(event.b);
    const operator = event.operator;
   
   
    switch(operator)
    {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b===0 ? NaN : a / b;
            break;
        default:
            callback("Your calculation could not be performed");
            break;
    }
    
    const response = `${a} ${operator} ${b} = ${result}`;
    
    const dynamoDBput = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
    const dynamoDBget = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
    
    const created_on = new Date().toISOString();

    const params = {
      TableName: "storedCalc",
      Item: {
      response: response,
      inputTime: created_on
      }
      
      };

    dynamoDBput
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
    
    const returnParams = {
        TableName: "storedCalc",
        Key: {
            response
        }
    };
        
    dynamoDBget
    .get(returnParams)
    .promise()
    .then(res => res.Item)
    .catch(err => err);
    
    callback(null, response);
};

