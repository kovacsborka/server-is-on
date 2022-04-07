const express = require("express");
const fs = require("fs");
const path = require("path");

const port = 9000


const app = express();

const ffolder = `${__dirname}/../frontend`

app.use('/public', express.static(`${ffolder}/public`));


//az appnak adunk egy GET requestet ( get(url, callback function) )
//paraméterek: request, response, next
app.get('/', (req, res, next) => {
    
    /*
    //terminálban jelenik meg
    console.log("Request recieved");
    //res.send megjelenik az oldalon
    res.send("Thank you for your request! This is our response")
    */


    //frontenden jeleníti meg
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
} )







const studentFile = path.join(`${__dirname}/../frontend/students.json`)


app.get('/api/students', (req, res, next) => {
    console.log("Request recieved on users endpoint");
    /*
    const users = [
        {
            name: 'John',
            surname: 'Doe',
            status: 'active',
            age: 22,
        },
        {
            name: 'Béla',
            surname: 'Kiss',
            status: 'passive',
            age: 50,
        }
    ]
    res.send(JSON.stringify(users))
    */
    res.sendFile(studentFile);
} )





app.get('/api/status/active', (req, res, next) => {
    //fs module, readfile (elérési útvonal, callback func)
    fs.readFile(studentFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        }
        else {
            //parse => js objectummá alakítja a json stringet
            const students = JSON.parse(data)
            //const activeUsers = users.filter(user => user.status === "active")
            res.send(students.filter(student => student.status === true))
        }
    })
} )



app.get('/api/status/finished', (req, res, next) => {
    fs.readFile(studentFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        }
        else {
            //parse => js objectummá alakítja a json stringet
            const students = JSON.parse(data)
            //const activeUsers = users.filter(user => user.status === "active")
            res.send(students.filter(student => student.status === false))
        }
    })
} )



app.get('/api/students/:key', (req, res, next) => {
    console.dir(req.params)
    console.log(req.params.key)
    
    
    fs.readFile(studentFile, (err, data) => {
        const students = JSON.parse(data)
        if (err) {

            res.send("Something went wrong")

        } else {


            
            res.send(students.filter(student => student.id === parseInt(req.params.key)))

        } 
    })
    
} )




//lefuttatás
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})