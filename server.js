const express = require('express');
const path = require('path');
const fileupload = require( 'express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) =>{
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.post( '/upload', ( req, res )=>{
    let file = req.files.image;
    let currentDate = new Date();

    let imagename = currentDate.getDate() + currentDate.getTime() + file.name;

    let path = 'public/uploads/' + imagename;

    file.mv(path, (err, results) => {
        if( err ){
            throw err;
        } else {
            res.json('uploads/${imagename}')
        }
    })
})

app.listen("3000", ()=>{
    console.log('Listening......');
})
