const express = require('express');
const app = express();
const path = require('path');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos desde el directorio "client"
app.use(express.static(path.join(__dirname, 'client')));

// Ruta para servir el archivo index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


app.get('/dogs', (req, res) => {
    const dogs = []
    dogs.push({ name: 'Roger' })
    dogs.push({ name: 'Syd' })
    res.json(dogs)
})

app.get('/dogs/:id', (req, res) => {
    const dogs = [{
          id: 1,
       name: 'Roger'
      }]
  
    const dog = dogs.filter(dog => dog.id == req.params.id)
    if (dog.length) {
      res.json(dog[0])
    } else {
      res.status(404).send('File not found')
    }
})

app.post('/dog', (req, res) => {
    const dog = {
      name: req.body.name,
      age: req.body.age
    }
    //we have the dog data, we can go on
})

app.put('/dog/:id', (req, res) => {
    const dog = {
      name: req.body.name,
      age: req.body.age
    }
    //we have the new dog data, we can update it
})

app.delete('/dog/:id', (req, res) => {
    //delete the dog with the specified `id`  from our database
  
    // ...
  
    res.status(200).send('OK')
})

app.listen(3000, () => console.log('Server ready'))