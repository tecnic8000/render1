const express = require('express');
const path = require('path');

const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'static')));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/:userQuery',(req,res)=>{
    res.render('index', {data : {userQuery: req.params.userQuery}});
});



app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'));

});

app.post('/', (req,res)=>{
    console.log(req.body);
    const schema = Joi.object().keys({
        email : Joi.string().trim().email().required(),
        password : Joi.string().min(5).max(10).required()
    });
    //validation is not working
    //const validation = schema.validate(req.body);
    //res.send(validation);
    //db work

    res.send('successful havePOSTdata---');
    res.json({success:true});
});

app.get('/example',(req,res)=>{
    res.send('hitting exampl---ROUTE')
});

app.get('/example/:name/:age',(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    res.send('example with ROUTE PARAMS' + req.params.name + req.params.age);
});

app.listen(3000);