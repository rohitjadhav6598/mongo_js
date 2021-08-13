const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const uri = 'uri for mongo db atlas';


mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
);


app.get('/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) console.warn(err);
        console.log(users);
        res.json(users);
    });
});

app.get('/user/:id',(req,res)=>{
    User.find({_id:req.params.id},(err,users)=>{
        if(err) console.warn(err);
        console.log(users);
        res.json(users);
    });
});

app.get('/search',(req,res)=>{
    var regex= new RegExp(req.query.name,'i');
    User.find({name:regex},(err,users)=>{
        if(err) console.warn(err);
        console.log(users);
        res.json(users);
    });
});

app.post('/user',jsonParser,(req,res)=>{
    const data= new User({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        address:req.body.address
    });

    data.save().then(result=>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err=>{
        console.warn(err);
    });
    
});

app.delete('/user/:id',(req,res)=>{
    User.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.warn(err);
    });
});

app.put('/user/:id',jsonParser,(req,res)=>{
    User.updateOne(
            {_id:req.params.id},
            {$set:{
                name:req.body.name,
                email:req.body.email,
                address:req.body.address
            }}
        ).then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            console.warn(err);
    });
});

app.listen(4000);





