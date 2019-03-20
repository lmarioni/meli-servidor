const Items = require('../models/items');
//este archivo me serviria de middleware, podemos controlar tokens y bla bla bla
module.exports = function (app) {
    app.get('/items', (req,res) => {
        //http://localhost:4000/items?q=apple
        const query = req.query.q;//saco el parametro q que esta en la url
        Items.getItems(query, (err, data) => {
            res.status(200).json(data);
        });

    })

    app.get('/items/:id', (req,res) => {
        //http://localhost:4000/items/MLA640638486
        const id = req.params.id;//saco el id del item
        Items.getItem(id, (err, data) => {
            res.status(200).json(data);
        });

    })
}