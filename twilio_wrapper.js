const twilio = require("twilio")
let client = null;
let isError = false;

function releaseNumbers(sid, res){
    client.incomingPhoneNumbers(sid).remove().then(function(deleted) {
		res.send({message:`Released ${sid}!`, errorCode:0})
    }).catch(function(error) {
        res.send({message:"Error has occured", errorCode:-1})
        console.log(error)
    });
}


function listNumbers(res) {
    client.incomingPhoneNumbers.list().then((incomingPhoneNumbers) => {

        let dataObject = {data:{}}
	let hasValues = false
        let index = 0

        incomingPhoneNumbers.forEach((i) => {
	    hasValues = true
		console.log(i)
            dataObject.data[index] = { "phone":i.phoneNumber, "sid":i.sid, "friendlyName": i.friendlyName}
            index++;
        })

	if(hasValues === true){
        	dataObject.message = "Number list loaded!"
        	dataObject.erroCode = 0;
	}else{
		dataObject.message = "No Active Numbers"
                dataObject.erroCode = 0;
	}
        res.send(dataObject)
    }).catch((e) => {
        res.send({message:"Error has occured", errorCode:-1})
        console.log(e)
    });
}

function getNumbers(areaCode, quantity, areaId, res) {

    client.availablePhoneNumbers(areaId)
        .local.list({ areaCode: areaCode, limit: quantity })
        .then((local) =>
            {
                local.forEach((item) =>
                {
                    buyNumber(item.phoneNumber);
                })

		if(!isError){
			isError = false
                	res.send({message:"Purchase Successful!", errorCode:0})
		}else{
			isError = false
			res.send({message:"Number purchase failed", errorCode:-1})
		}
            }).catch((err) => {
                res.send({message:"Error has occured", errorCode:-1})
		console.log(err)
            });
}

function buyNumber(number) {

    client.incomingPhoneNumbers
        .create({ phoneNumber: number })
        .then((incoming_phone_number) => {
		isError = false
            	console.log(`Successfully purchased ${incoming_phone_number.sid}`)
        }).catch((err) => {
		isError = true;
		console.log(err)
	});
}

function initModule(accountSid, accountSecret){
	client = twilio(accountSid, accountSecret);
}


module.exports = {
    init:initModule, 
    getNumbers:getNumbers, 
    listNumbers:listNumbers,
    releaseNumbers:releaseNumbers
}
