const express = require('express');
const app = express();
const puerto = 3010;
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.sendFile('/public/index.html');

})

app.get('/leer_registros', (req,res)=>{
    const fl = fs.readFileSync('alumnos.json','utf-8');
    res.header("Content-type","text/json");
    res.send(fl); 

});

app.post('/guardar_registros',(req, res)=>{
    const matricula = req.body.matricula;
    const nombre = req.body.nombre;
    const sexo = req.body.sexo;
    const ma1 = req.body.ma1;
    const ma2 = req.body.ma2;
    const ma3 = req.body.ma3;

    res.setHeader('Content-type', 'text/json');
    let fl = fs.readFileSync('./alumnos.json', 'utf-8');
    const json = JSON.parse(fl);
    json.alumnos.push({"matricula":matricula,"nombre":nombre,"sexo":sexo,"ma1":ma1,"ma2":ma2,"ma3":ma3})
    fl = fs.writeFileSync('./alumnos.json',JSON.stringify(json));
    res.send("Agrego registro con exito")
})

app.listen(puerto,()=>{
    console.log(`Escuchando por el puerto ${puerto}`)
})