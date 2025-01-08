const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const Books = require('./src/models/books');



app.get('/books',async (req,res) =>{
    try{
        const books = await Books.find();
        res.status(200).send(books);
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.post('/books', async (req,res) => {
    try{
        const book = new Books(req.body);
        const result = await book.save();
        res.status(201).send(result);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.put('/books/:id', async (req,res) => {
    try
    {
        const book = await Books.findByIdAndUpdate(req.params.id,req.body,{new :true});
        if(!book) return res.status(404).send('No book found');
        res.send(book);
    }
    catch(e){
        res.status(400).send(e);
    }
    });


    app.delete('/books/:id', async (req,res) => {
        try{
            const book = await Books.findByIdAndDelete(req.params.id);
            if(!book) return res.status(404).send('No book found');
            res.send(book);

        }
        catch(e){
            res.status(500).send(e);
        }
    })

//mongodb connection
const mongoURL='mongodb://localhost:27017/library';
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',() =>{
    console.log('Connected to MongoDB');
});


app.listen(3000);