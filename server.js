//Load the request module
var request = require('request');
var lastTotalAvailable;
var data = {};

function checkCurrentCount(callback) {
//Lets configure and request
request({
    url: 'https://ferrero.firebaseio.com/nadiv1.json',
    method: 'GET', //Specify the method
 }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
	callback.call(this, body);
    }
});
};

var interval = setInterval(function () {
	checkCurrentCount(function (response) {
		response=JSON.parse(response);
		data.currentAvailable = response.currentAvailable;
		data.message = response.message;
		data.giveCount = response.giveCount;
		data.totalAvailable = response.totalAvailable;
console.log(data);

		//if (lastTotalAvailable > 0 && lastGiveCount!=response.lastGiveCount)
		//console.log('and the answer is...', response);

		//lastGiveCount = response.lastGiveCount;
	});
}, 3000);



//Lets configure and request
function update(key, value){ 
	var body = {};
	body[key]=value;
request({
    url: 'https://ferrero.firebaseio.com/nadiv1.json', 
   method: 'PATCH',
     body: JSON.stringify(body) //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
}); 
};

update('message', 'key');