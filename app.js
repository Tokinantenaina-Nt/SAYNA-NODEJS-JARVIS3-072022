const express = require('express');
const app = express();
const port = 3000;
const produitData = require('./data-produit');
const pieceData = require('./database_Jarvis/piece');
const appareilData = require('./database_Jarvis/appareil');
const userData = require('./database_Jarvis/user');
const statuUserData = require('./database_Jarvis/statusUtilisateur.json')

// ************************************ FUNCTIONS **********************************
// ------------------------------------- Racine-------------------------------------
app.get('/', (req, res) => (
    res.send(`<h2>Hello !!!</h2>`)
))

// ----- Exemple : Produit
/* app.get('/api/produit/:idReq', (req, res) => {
    const idReq = parseInt(req.params.idReq);
    // const produitName = 'Akondropapay'
    // console.log(produitData.produits.find((p) => p.id_produit === idReq).nom);
    const produitName = (produitData.produits.find((p) => p.id_produit === idReq).nom);
    res.send(
        `information sur le produit n° ` + idReq +
        ` et le nom du produit est : ` + produitName
    );

});*/

// ------- Requete de la base de donné Jarvis : selon l'énoncé ***************************
//LISTE :


// ----------------- Piece where Domicile is 'id_dom'... ------------------------------
app.get('/api/piece/list/:id_dom', (req, res) => {
    const id_dom = parseInt(req.params.id_dom);
    const nomPiece = pieceData.filter(p => p.id_domicile === id_dom).map(p => `<li>` + p.nom_piece + `</li>`).join(' ');
    const id_domicile_dataDom = pieceData.map((p) => p.id_domicile);
    const nomPieces = pieceData.map(p => p.nom_piece);
    console.log(id_domicile_dataDom);
    // console.log('les nom piece domicile 5', nomPiece);
    if (nomPiece) {
        res.send(
            'Listes des pieces du domicile numero ' + id_dom + ' :' +
            nomPiece
        );

    } else {
        res.send(
            `Listes de toutes les pieces <em> (* tous les domiciles inclus `
            // domicile n° ' + id_dom + ' n\'existe pas encore
            `)</em>:` + nomPieces
        );
    }
});
// ----------------------------------------------------------------------

// -----------------Appareil where Piece is 'id_piece'... ----------------

app.get('/api/appareil/list/:id_piece', (req, res) => {
    const id_piece = parseInt(req.params.id_piece);
    const nomAppareil = appareilData.filter(p => p.id_piece === id_piece).map(p => `<li>` + p.nom_appareil + `</li>`).join(' ');
    const nomAppareils = appareilData.map(p => p.nom_appareil);
    if (nomAppareil) {
        res.send(
            'Listes des appareils de la piece numero ' + id_piece + ' :' +
            nomAppareil
        );
    } else {
        res.send(
            'Listes de toutes les appareils <em> (* toutes les pieces et domiciles inclus) </em>:' +
            nomAppareils
        );
    }
});
// ---------------------------------------------------------------------------

// -----------------Utilisateur where domicile is 'id_dom'... ----------------
app.get('/api/utilisateur/list/:id_dom', (req, res) => {

    const id_dom = parseInt(req.params.id_dom);
    const nomUser = userData.filter(p => p.id_domicile === id_dom).map(p => p.nom_u + ' ' + p.prenom_u);
    const nomUsers = userData.map(p => p.nom_u + ' ' + p.prenom_u + ' ');
    if (userData.id_domicile) {
        res.send(
            'Listes des utilisateurs du domicile numero ' + id_dom + ' : ' +
            nomUser
        );

    } else {
        res.send(
            'Listes de tous les utilisateurs <em> (* tous les domiciles inclus) </em>: ' +
            nomUsers
        );
    }
    console.log(nomUser);
});
// ---------------------------------------------------------------------------

// -----------------prorietaires et coproprietaires... -----------------------
app.get('/api/status/list/proprietaire', (req, res) => {

    const proprietaire = statuUserData.filter(p => p.status === 'proprietaire').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const coproprietaire = statuUserData.filter(p => p.status === 'co-proprio').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const statusUsers = statuUserData.map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    res.send(
        'Listes des proprietarires : ' +
        proprietaire
    );
});
app.get('/api/status/list/co-proprietaire', (req, res) => {

    const proprietaire = statuUserData.filter(p => p.status === 'proprietaire').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const coproprietaire = statuUserData.filter(p => p.status === 'co-proprio').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const statusUsers = statuUserData.map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    res.send(
        'Listes des co-proprietarires : ' +
        coproprietaire
    );
});
app.get('/api/status/list/', (req, res) => {

    const proprietaire = statuUserData.filter(p => p.status === 'proprietaire').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const coproprietaire = statuUserData.filter(p => p.status === 'co-proprio').map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    const statusUsers = statuUserData.map(p => p.nom + ' ' + p.prenom + ' ' + `<em>` + p.status + `</em>`);
    res.send(
        'Listes des membres : ' +
        statusUsers
    );
});

// --------------------------------------------------------------------------- 
// -----------------  Appareil where Piece is 'id_dom'... ------------------

app.get('/api/appareils/list/:id_dom', (req, res) => {
    const id_dom = parseInt(req.params.id_dom);
    const nomAppareil = appareilData.filter(p => p.id_domicile === id_dom).map(p => `<li>` + p.nom_appareil + `</li>`).join(' ');
    const nomAppareils = appareilData.map(p => p.nom_appareil);
    if (nomAppareil) {
        res.send(
            'Listes des appareils dans le domicile numero ' + id_dom + ' :' +
            nomAppareil
        );
    } else {
        res.send(
            'Listes de toutes les appareils <em> (* toutes les pieces et domiciles inclus) </em>:' +
            nomAppareils
        );
    }
});
// ---------------------------------------------------------------------------

app.listen(port, () => {
    console.log('notre application est démarrée en http://localhost:' + port)

})