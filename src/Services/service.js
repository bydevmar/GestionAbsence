let express = require('express');
let app = express();

let mysql = require('mysql');
let bodyParser =  require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended : true}));

let con = mysql.createConnection({

    host : 'localhost',
    port : '80',
    user : 'root' ,
    password : '' ,
    database: 'absence'
});

let server = app.listen(4551 , () => {
    var host = server.address().address 
    var port = server.address().port 
})

con.connect((error) => {
    if(error)
    {
        console.log("error")
    }
    else
    {
        console.log('connected')
    }
})
app.get('/test' , (rea , res) =>{
    con.query("SELECT * FROM `test`" , (error , rows , fields) =>{
        if(error)console.log(error)
        else{
            console.log(rows)
            res.send(rows);
        }
    })
})