const express=require('express');
const mysql = require('mysql');
const cors=require('cors');
//const { Leth, Web3, Gateway} = require('lightstreams-js-sdk')

const app=express();
app.use(express.json())
app.use(cors())

const { Gateway }  = require('lightstreams-js-sdk')
const gateway = Gateway('https://gateway.sirius.lightstreams.io')

async function init() {
    //const account = "0xa981f8ca77d069d79b609ca0069b052db79e7e30"
    //const file = fs.createReadStream(`/tmp/my_secret_file.txt`)
    //const { meta, acl } = await gateway.storage.add(account, "password", file)
    // Get user balance
    const account = "0xa981f8ca77d069d79b609ca0069b052db79e7e30"
    const { balance } = await gateway.wallet.balance(account)
    console.log(balance)
}

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"LoginSystem"
})

app.post('/register', (req,res)=> {
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    console.log(password)
    init()

    /*db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], 
    (err,result) => {console.log(err);}
    );*/
})

app.post('/login', (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username)
    console.log(password)

    db.query("SELECT * FROM users username = ? and password = ?", [username, password], 
    (err,result) => {
        if(err){
            console.log(err);
            res.send({err: err})

        }
            
        else{
            if (result.length>0){
                res.send(result);
            } else {
                res.send({message: "Wrong username or password"});
            }
        }
    }
    );
})

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})
