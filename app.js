const PORT = parseInt(process.env.PORT) || 5000
const USER_ID = "USER-ID"
const PASSWORD = "PASSWORD"
const TOKEN = "TOKEN"

const creds = require("./creds.json")
const twilio_wrapper = require("./twilio_wrapper")
const express = require("express")
const app = express()

twilio_wrapper.init(creds.accountSID, creds.authToken)

const buyNumbersEndpoint = (req, res) => {
    try{
        let query = req.query
        let areaCode = parseInt(query.areaCode)
        let quantity = parseInt(query.quantity)
        let areaId = query.areaId
        let token = query.token

        if(token == TOKEN){
            twilio_wrapper.getNumbers(areaCode, quantity, areaId, res)
        }else{
            res.send({message:"Not Authorized", errorCode:2});            
        }
    }catch(e){
        res.send({message:"Error has occured", errorCode:-1});
    }
}

const listNumbersEndpoint = (req, res) => {
    try{
        let token = req.query.token
        if(token == TOKEN){
            twilio_wrapper.listNumbers(res)
        }else{
            res.send({message:"Not Authorized", errorCode:2});            
        }
    }catch(e){
        res.send({message:"Error has occured", errorCode:-1});
    }
}

const releaseNumbersEndpoint = (req, res) => {
  try{
    let token = req.query.token

    if(token === TOKEN){
	let sid = req.query.sid
        twilio_wrapper.releaseNumbers(sid, res)
    }else{
        res.send({message:"Not Authorized", errorCode:2});
   }
  }catch(e){
	console.log(e)
    	res.send({message:"Error has occured", errorCode:-1});
  }
}

const authSystemUser = (req, res) => {
    try{
            let userId = req.query.userId;
            let password = req.query.password;
            if(userId === USER_ID && password === PASSWORD){
                    res.send({message:"Access Granted", errorCode:0 ,data:TOKEN})
            }else{
                res.send({message:"Access Denied", errorCode:1})
            }
    }catch(e){
        res.send({message:"Error has occured", errorCode:-1});
    }
}

const configAPICreds = (req, res) => {
	try{
		let query = req.query
		twilio_wrapper.init(query.sid, query.token)
		res.send({message:"Configured", errorCode:-1});
	}catch(e){
		console.log(e)
		res.send({message:"Error has occured", errorCode:-1});
	}
}

const index = (req, res) => {
	res.send("")
}

app.get("/", index)
app.get("/config", configAPICreds)
app.get("/rn", releaseNumbersEndpoint)
app.get("/bn", buyNumbersEndpoint)
app.get("/ln", listNumbersEndpoint)
app.get("/auth", authSystemUser)
app.listen(PORT, () => {
    console.log("ONLINE")
})
