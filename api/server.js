const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

//Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

//database - sample data, not using mongoDB or any database
let data = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
]

//Endpoint to get all items from our database
app.get('/api/items', (req, res) => {
    res.json(data);
});

//Endpoint to get a specifity item by ID
app.get('/api/times/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = data.find((item) => item.id === itemId);

    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({error: "Item not found"});
    }
});

//Endpoint to add a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
    };

    data.push(newItem);

    res.status(201).json(newItem);
})

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
})
//run command node server.js to start backend
//run npm start to start frontend