 const express = require('express');
 const app = express();
 const fs = require('fs')
 let userData = require("./database_Jarvis/user");
 /*
 app.use((req, res, next) => {
     console.log('Requête reçue !');
     next();
 });

 app.use((req, res, next) => {
     res.status(201);
     next();
 });

 app.use((req, res, next) => {
     res.json({ message: 'Votre requête a bien été reçue !' });
     next();
 });

 app.use((req, res, next) => {
     console.log('Réponse envoyée avec succès !');
 });

 module.exports = app;
 // Cette application Express contient quatre éléments de middleware :
 // le premier enregistre « Requête reçue ! » dans la console et passe l'exécution ;
 // le deuxième ajoute un code d'état 201 à la réponse et passe l'exécution ;
 // le troisième envoie la réponse JSON et passe l'exécution ;
 // le dernier élément de middleware enregistre « Réponse envoyée avec succès ! » dans la console.

 */

 // *******************bodyParser*********************
 //  const express = require("express");
 //  const bodyParser = require("body-parser")

 //HTML page:login POST CALCULATRICE
 /*<!DOCTYPE html>
  <html lang="en" dir="ltr"> 

     <head>
         <meta charset="utf-8">
         <title>Calculator</title>
     </head>

     <body>
         <h1>Simple Calculator.</h1>
         <form action="/login" method="post">
             <input type="text" name="num1" placeholder="First Number">
             <input type="text" name="num2" placeholder="Second Number">

             <button type="submit" name="submit">
                 <!-- calculator -->
             </button>
         </form>
     </body>

 </html> */
 /*
 // New app using express module
 const app = express();
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 app.get("/login", function(req, res) {
     res.sendFile(__dirname + "/pages/login.html");
 });

 app.post("/login", function(req, res) {
     var num1 = Number(req.body.num1);
     var num2 = Number(req.body.num2);

     var result = num1 + num2;
     console.log(num1);
     res.send("Addition : " + result);
 });
 // ****************************************************
 */

 // ***********PARKING EXAMPLES **************
 /* Le standard d'API REST impose
 GET /parkings
 GET /parkings/:id
 POST /parkings
 PUT /parkings/:id
 DELETE /parkings/:id
 */
 const parkings = require('./database_Jarvis/user.json');
 app.use(express.json());
 app.get('/parkings', (req, res) => {
     res.status(200).json(parkings)
 })

 app.get('/parkings/:id', (req, res) => {
     const id = parseInt(req.params.id)
     const parking = parkings.find(parking => parking.id_u === id)
     res.status(200).json(parking)
 })

 app.post('/parkings', (req, res) => {
         parkings.push(req.body)
         res.status(200).json(parkings)
     })
     /* Pour tester notre route POST, nous allons utiliser l'outil Postman qui nous permet de manipuler facilement des API. */
 app.put('/parkings/:id', (req, res) => {
         const id = parseInt(req.params.id)
         let parking = parkings.find(parking => parking.id === id)
         parking.name = req.body.name,
             parking.city = req.body.city,
             parking.type = req.body.type,
             res.status(200).json(parking)
     })
     /* ℹ️ Pour modifier un document dans une Node JS API, les méthodes PUT ou PATCH sont à privilégier. Une requête PUT va modifier l'intégralité du document par les valeurs du nouvel arrivant. Une requête PATCH va uniquement mettre à jour certains champs du document. */

 app.delete('/parkings/:id', (req, res) => {
     const id = parseInt(req.params.id)
     let parking = parkings.find(parking => parking.id === id)
     parkings.splice(parkings.indexOf(parking), 1)
     res.status(200).json(parkings)
 })

 // *****************************************

 // READ & WHRITE FICHIER JSON **********************

 //   let fichier = fs.readFileSync('user.json')
 //  let personne = JSON.parse(fichier)
 //  console.log(personne)
 // ou
 //  fs.readFile('user.json', function(erreur, fichier) {
 //          let personne = JSON.parse(fichier)
 //          console.log(personne)
 //      })
 // ou tout simplement utiliser require
 // WHRITE
 let personne = {
     "prenom": "Marie",
     "age": 88,
     "passion": "loisirs créatifs, histoire",
     "taille": 172
 }

 let donnees = JSON.stringify(personne)

 function writeInData(params) {
     fs.writeFileSync("./database_Jarvis/" + params + ".json", donnees)
 }

//  ou
//   fs.writeFile('personne2.json', donnees, function(erreur) {
//           if (erreur) {
//               console.log(erreur)
//           }



 const exempleJson = require("./database_Jarvis/exemple.json");
 console.log(exempleJson);
 const exempleJsonSTR = JSON.stringify(exempleJson);
 console.log(exempleJsonSTR);
 const supprDernierString = exempleJsonSTR.substring(0, exempleJsonSTR.length - 1)
 console.log('*************', supprDernierString);

 let writeFileK;
 writeFileK = supprDernierString + ',' + donnees + ']';
 console.log('--------->', writeFileK);
 //   fs.writeFileSync("./database_Jarvis/exemple.json", writeFileK, (err) => {
 //       if (err) { console.log(err); }
 //   });
 /*fs.writeFileSync("./database_Jarvis/exemple.json", "," + donnees + ']', (err) => {
     if (err) { console.log(err); }
     //  else {
     //      // Get the file contents after the append operation
     //      console.log("\nFile Contents of file after append:",
     //          fs.readFileSync("exemple.json", "utf8"));
     //  }
 });*/

 //  fs.readFileSync(exempleJson);
 //  console.log(readFileSynK, "utf8");

 //  fs.writeFile('./database_Jarvis/personne2.json', exempleJson, function(erreur) {
 //      if (erreur) {
 //          console.log(erreur)
 //      }
 //  });
 //************************************* 
 app.listen(3000, function() {
     console.log("server is running on port 3000");
 })