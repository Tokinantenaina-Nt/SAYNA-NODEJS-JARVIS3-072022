const express = require('express');
const app = express();
const port = 3000;
const produitData = require('./data-produit');
const pieceData = require('./database_Jarvis/piece');
const appareilData = require('./database_Jarvis/appareil');
const userData = require('./database_Jarvis/user');



// *********** FUNCTION *************
// -----Racine-----
app.get('/', (req, res) => (
    res.send(`<h2>Hello !!!</h2>`)
))

// ----- Exemple : Produit
app.get('/api/produit/:idReq', (req, res) => {
    const idReq = parseInt(req.params.idReq);
    // const produitName = 'Akondropapay'
    // console.log(produitData.produits.find((p) => p.id_produit === idReq).nom);
    const produitName = (produitData.produits.find((p) => p.id_produit === idReq).nom);
    res.send(
        `information sur le produit n° ` + idReq +
        ` et le nom du produit est : ` + produitName
    );

});

// ----- Requete de la base de donné Jarvis : selon l'énoncé
//LISTE :


// -----------------Piece where Domicile is 'id_dom'... ----------------
app.get('/api/piece/list/:id_dom', (req, res) => {
    const id_dom = parseInt(req.params.id_dom);
    const nomPiece = pieceData.filter(p => p.id_domicile === id_dom).map(p => `<li>` + p.nom_piece + `</li>`).join(' ');
    const id_domicile_dataDom = pieceData.map((p) => p.id_domicile)
    const nomPieces = pieceData.map(p => `<li>` + p.nom_piece + `</li>`).join(' ');
    console.log(id_domicile_dataDom);
    // console.log('les nom piece domicile 5', nomPiece);
    if (nomPiece) {
        res.send(
            'Listes des pieces de la domicile numero ' + id_dom + ' :' +
            nomPiece
        );

    } else {
        res.send(
            'Listes de toutes les pieces <em> (toutes les domiciles inclues) </em>:' +
            nomPieces
        );
    }
});
// ----------------------------------------------------------------------

// -----------------Appareil where Piece is 'id_piece'... ----------------

app.get('/api/appareil/list/:id_piece', (req, res) => {
    const id_piece = parseInt(req.params.id_piece);
    const nomAppareil = appareilData.filter(p => p.id_piece === id_piece).map(p => `<li>` + p.nom_appareil + `</li>`).join(' ');
    const nomAppareils = appareilData.map(p => `<li>` + p.nom_appareil + `</li>`).join(' ');
    if (nomAppareil) {
        res.send(
            'Listes des appareils de la piece numero ' + id_piece + ' :' +
            nomAppareil
        );
    } else {
        res.send(
            'Listes de toutes les appareils <em> (toutes les pieces inclues) </em>:' +
            nomAppareils
        );
    }
});
// ---------------------------------------------------------------------------

/* // -----------------Utilisateur where domicile is 'id_dom'... ----------------
app.get('/api/domicile/list/:id_dom', (req, res) => {
    const id_dom = parseInt(req.params.id_dom);
    const nomPiece = pieceData.filter(p => p.id_domicile === id_dom).map(p => `<li>` + p.nom_piece + `</li>`).join(' ');
    const id_domicile_dataDom = pieceData.map((p) => p.id_domicile)
    const nomPieces = pieceData.map(p => `<li>` + p.nom_piece + `</li>`).join(' ');
    console.log(id_domicile_dataDom);
    // console.log('les nom piece domicile 5', nomPiece);
    if (nomPiece) {
        res.send(
            'Listes des pieces de la domicile numero ' + id_dom + ' :' +
            nomPiece
        );

    } else {
        res.send(
            'Listes de toutes les pieces <em> (toutes les domiciles inclues) </em>:' +
            nomPieces
        );
    }
});
// --------------------------------------------------------------------------- */

app.listen(port, () => {
    console.log('notre application est démarrée en http://localhost:' + port)
    console.log('http://localhost:3000/api/piece/list/5');
})