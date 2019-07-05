const http = require("http");
const path = require("path");
const status = require("http-status");

//Instancia del modelo de Usuarios vacia
let _brand;

const createBrand = (req, res) => {
    const brand = req.body;
    
    _brand.create(brand)
    .then((data) =>{
        res.status(200);
        res.json({
            msg:"Marca creado correctamente",
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

const getBrands = (req,res) => {
    _brand.find()
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

const getBrandbyId = (req,res) => {
    const id = req.params.id;
    _brand.find({"_id":id})
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

const updateBrand = (req,res) => {
    const id = req.params.id;
    const brand = req.body;
    _brand.findByIdAndUpdate(id, brand, {new:true})
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

const deleteBrand = (req,res) => {
    //const {id,param1,param2,paramn} = req.params;
    const id = req.params.id;
    _brand.findByIdAndRemove(id)
    .then((data) =>{
        res.status(200);
        res.json({
            msg:"Marca eliminado correctamente",
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

//Se inicializa la variable user
module.exports = (Brand) =>{
    _brand = Brand;
    return ({
        getBrands,
        createBrand,
        getBrandbyId,
        updateBrand,
        deleteBrand
    });
}