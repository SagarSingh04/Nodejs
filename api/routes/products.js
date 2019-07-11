const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get('/', (req, res, next) => {
    fs.readFile(__dirname + "/" + 'products.json', 'utf-8', function(err, data) {
        console.log(data);
        res.status(200);
        res.end(data);
    });
    // res.status(200).json({
    //     message: 'Handling GET request to /products'
    // });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    fs.readFile(__dirname + "/" + 'products.json', 'utf-8', function(err, data) {
        var products = JSON.parse(data);
        //console.log(products);
        var product = products.filter((a) => (a.id === id));
        res.status(200);
        //console.log(typeof product);
        res.send(product);
    });
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: 'You discovered a special id',
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'You passed another id'
    //     })
    // }
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id
    }
    fs.readFile(__dirname + "/" + "products.json", 'utf-8', function(err, data) {
        data = JSON.parse(data);
        data.push(product);
        res.status(201);
        res.send(data);
        fs.writeFile(__dirname + "/" + "products.json", JSON.stringify(data), function(err) {
            if(err){
                return console.error(err);
            }
            console.log("File written successfullly");
        })
    });
    // res.status(201).json({
    //     message: 'Handling POST request to /products',
    //     createdProduct: product
    // });
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id
    }
    fs.readFile(__dirname + "/" + "products.json", 'utf-8', function(err, data) {
        data = JSON.parse(data);
        var products = data.filter((a) => (a.id != id));
        products.push(product);
        res.status(201);
        res.send(products);
        fs.writeFile(__dirname + "/" + "products.json", JSON.stringify(products), function(err) {
            if(err){
                console.error(err);
            }
            console.log("File Updated");
        });
    });
    // res.status(200).json({
    //     message: 'Updated product'
    // })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    fs.readFile(__dirname + "/" + "products.json", 'utf-8', function(err, data) {
        var products = JSON.parse(data);
        var product = products.filter((a) => (a.id != id));
        res.status(201);
        res.send(product);
        fs.writeFile(__dirname + "/" + "products.json", JSON.stringify(product), function(err, data) {
            if(err){
                return console.error(err);
            }
            console.log("File deleted");
        })
    });
    // res.status(200).json({
    //     message: 'Deleted Product'
    // })
});

module.exports = router;