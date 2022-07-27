const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => (

        res.send(`<h2>Hello !!!</h2> </br>
    <h3> Actualiser !!! </h3>`)

    ))
    // app.get('/api/produit/1', (req, res) => {
    //     res.send(
    //         `information sur le produit n° 1`
    //     )
    // });

app.get('/api/produit/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    res.send(
        `information sur le produit n° ` + id
    )
});
console.log('console ato mandeh');
app.listen(port, () => console.log('notre application est démarrée en http://localhost:' + port))