const http = require("http");
const path = require("path");
const status = require("http-status");
var jwt = require('jsonwebtoken');

//Instancia del modelo de Usuarios vacia
let _user;

const createUser = (req, res) => {
    const user = req.body;
    
    _user.create(user)
    .then((data) =>{
        res.status(200);
        res.json({
            msg:"Usuario creado correctamente",
            data:data
        });
    }) 
    .catch((err)=>{
        res.status(400);
        res.json({
            msg:"Error",
            data:err
        });
    })
}

const getUsers = (req,res) => {
    _user.find()
    .then((data) => {
        if(data.length == 0){
            res.status(204),
            res.json({
                msg:"No se encontraron datos"
            }) 
        }
        else{
            res.status(200),
            res.json({
                data:data
            })
        }
    })
    .catch((err) => {
        res.status(400);
        res.json({
            msg:"Error",
            data:err
        })
    })
}

const getUserbyId = (req,res) => {
    const id = req.params.id;
    _user.find({"_id":id})
    .then((data) => {
        res.status(200),
        res.json({
            data:data
        })
    })
    .catch((err) => {
        res.status(400);
        res.json({
            data:err
        })
    })
}

const updateUser = (req,res) => {
    const id = req.params.id;
    const user = req.body;
    _user.findByIdAndUpdate(id, user, {new:true})
    .then((data) => {
        res.status(200);
        res.json({
            data:data
        })
    })
    .catch((err) => {
        res.status(400);
        res.json({
            data:err
        })
    })
}

const deleteUser = (req,res) => {
    //const {id,param1,param2,paramn} = req.params;
    const id = req.params.id;
    _user.findByIdAndRemove(id)
    .then((data) =>{
        res.status(200);
        res.json({
            msg:"Usuario eliminado correctamente",
            data:data
        })
    })
    .catch((err) => {
        res.status(400);
        res.json({
            msg:"error"
        })
    })
} 

const login = (req,res) => {
   const body = req.body;
   _user.find(body)
   .then((data) => {
       if(data.length > 0){
            res.status(200);
            var tokenData = {
                email: body.email
                // ANY DATA
              }
            var token = jwt.sign(tokenData, 'Secret Password', {
                 expiresIn: 60 * 60 * 24 // expires in 24 hours
              })
            res.json({
            msg:"Login correcto",
            token:token,
            data:data
            })
       }
       else{
        res.status(401);
        res.json({
            msg:"Login incorrecto"
        })
       }
})
.catch((err) => {
   
})
}

//Se inicializa la variable user
module.exports = (User) =>{
    _user = User;
    return ({
        createUser,
        getUsers,
        getUserbyId,
        updateUser,
        deleteUser,
        login
    });
}