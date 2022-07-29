const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const pieceData = require("./database_Jarvis/piece.json");
const appareilData = require("./database_Jarvis/appareil.json");
let userData = require("./database_Jarvis/user.json");
const statuUserData = require("./database_Jarvis/statusUtilisateur.json");

const error400 = require("./data_error/error400.json");
const error400_1 = error400.filter(p => p.id_error === 1);
const error400_2 = error400.filter(p => p.id_error === 2);
const error400_3 = error400.filter(p => p.id_error === 3);
const error400_4 = error400.filter(p => p.id_error === 4);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
// ************************************ FUNCTIONS **********************************

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
        // res.send(`<h2>Hello !!!</h2>`)

});
app.get("/index", (req, res) => {
    res.sendFile(__dirname + '/index.html')

});
//  Login API
app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/pages/login.html')
});


app.post("/login", function(req, res) {
    var email = req.body.email;
    var password = req.body.mdp;
    let error = false;
    let message = ''
    let userReturn = [];
    userReturn = userData.filter(p => p.email_u === email && p.mdp_u === password);
    console.log('userReturn0 = ', userReturn);
    console.log('email entrer : ', email);
    console.log('mot de passe : ', password);

    if (userReturn == '') {
        if (email == '' || password == '') {
            res.status(400).send(error400_1);

        }
        if (email !== '' || password !== '') {
            res.status(400).send(error400_2);

        }

    } else {
        error = false;
        message = "L'utilisateur a été authentifié avec succées"
        res.status(200).send({ "error": error, "message": message, "user": userReturn })

    }

})

app.get("/login/:mdpAdmin/:email", function(req, res) {
    var mdpAdmin = req.params.mdpAdmin;
    var email = req.params.email;
    var password = req.params.mdp;
    const userRet = userData.filter(p => p.email_u === email);
    if (mdpAdmin === '00000000') {
        // On verifie ici si le demandeur a le droit de voir les information de bdd (c-à-d il possède le mdp "00000000") 
        res.send(userRet)
    } else {
        res.send('error mdp admin')
    }
    console.log(userRet);
})

// Register API
app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/pages/register.html')
});

app.post("/register", (req, res) => {
    var email = req.body.email;
    var password = req.body.mdp;
    // let newUserRet = []
    // newUserRet = userData.filter(p => p.email_u === email && p.mdp_u === password);
    const exempleJson = require("./database_Jarvis/exemple.json");


    // userData.push(req.body);
    console.log(userData);

    console.log(req.body.firstname);
    if (
        req.body.firstname !== '' && req.body.lastname !== '' && req.body.email !== '' && req.body.sexe !== '' && req.body.mdp !== '' && req.body.dateNaissance !== ''
    ) {

        // userData.push(req.body);

        let id_u, id_domicile, prenom_u,
            nom_u, date_de_naissance_u, email_u, sexe_u, mdp_u,
            lien_parente, personneUser = {};

        id_u = 0;
        id_domicile = 0;
        prenom_u = req.body.lastname;
        nom_u = req.body.firstname;
        date_de_naissance_u = req.body.dateNaissance;
        email_u = req.body.email;
        sexe_u = req.body.sexe;
        mdp_u = req.body.mdp;
        lien_parente = 0;

        console.log('ici!!!!!!!!!');
        personneUser = {
            id_u,
            id_domicile,
            prenom_u,
            nom_u,
            date_de_naissance_u,
            email_u,
            sexe_u,
            mdp_u,
            lien_parente
        }
        console.log(personneUser);
        const userDataSTR = JSON.stringify(userData);
        const donnees = JSON.stringify(personneUser)
        console.log(userDataSTR);
        const supprDernierString = userDataSTR.substring(0, userDataSTR.length - 1)
        console.log('*************', supprDernierString);

        let writeFileK;
        writeFileK = supprDernierString + ',' + donnees + ']';
        console.log('--------->', writeFileK);
        fs.writeFileSync("" + __dirname + "/database_Jarvis/user.json", writeFileK, function(erreur) {
                if (erreur) {
                    console.log(erreur)
                }
                console.log(personneUser);

            })
            // userData.push(req.body);
        const userRet = userData.filter(p => p.mdp_u === password);
        res.send(userRet);
    } else {
        res.send(error400_3)
        let id_u, id_domicile, prenom_u,
            nom_u, date_de_naissance_u, email_u, sexe_u, mdp_u,
            lien_parente, personneUser = {};
        id_u = 0;
        id_domicile = 0;
        prenom_u = req.body.lastname;
        nom_u = req.body.firstname;
        date_de_naissance_u = req.body.dateNaissance;
        email_u = req.body.email;
        sexe_u = req.body.sexe;
        mdp_u = req.body.mdp;
        lien_parente = 0;
        personneUser = {
            id_u,
            id_domicile,
            prenom_u,
            nom_u,
            date_de_naissance_u,
            email_u,
            sexe_u,
            mdp_u,
            lien_parente
        }


    }
});

app.listen(port, () => {
    console.log('notre application est démarrée en http://localhost:' + port)

})