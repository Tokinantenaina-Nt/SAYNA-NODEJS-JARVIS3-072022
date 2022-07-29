const mysql = require('mysql');
console.log('Get connection ...');


var conn = mysql.createConnection({
    // database: 'mynodedb',
    host: "localhost",
    user: "root",
    password: "001300"
});
// console.log(conn)
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// "Select * from ?? where ?? > STR_TO_DATE( ? , '%d/%m/%Y') ";
// SELECT * FROM jarvis2.utilisateur where sexe_u = 'M';
// INSERT INTO `jarvis2`.`utilisateur` (`id_u`, `id_domicile`, `prenom_u`, `nom_u`, `date_de_naissance_u`, `email_u`, `sexe_u`, `mdp_u`, `lien_parente`) VALUES ('22', '0', 'Rakoto', 'Nandrasana', '1980-01-30', 'r@nandra', 'M', 'zer', '0');

// var sql1 = "Select * from ?? where ?? =  ?";
// var sql1 = "Select * from ?? ";
// var replaces = ['utilisateur', 'sexe_u', 'M']
// var replaces = ['utilisateur']
// sql = mysql.format(sql1, replaces);
// conn.query(sql, function(err, results) {
//     if (err) throw err;
//     console.log("SQL=" + sql);
//     console.log('**************************');
//     conn.query(sql, function(err, rows, fields, result) {
//         if (err) throw err;
//         for (var i = 0; i < rows.length; i++) {
//             console.log("\n------ Row " + i + " ---- ");
//             console.log(rows[i]);
//             console.log("\n");
//             // console.log("  - Emp_No: " + rows[i].Emp_No)
//             // console.log("  - Full_Name: " + rows[i].Full_Name);
//         }
//         console.log(result);
//         // console.log("Number of rows affected : " + result.affectedRows);
//         //     console.log("Number of records affected with warning : " + result.warningCount);
//         //     console.log("Message from MySQL Server : " + result.message);
//     });
// });
// SET FOREIGN_KEY_CHECKS = 0

// var sql3 = "SET GLOBAL FOREIGN_KEY_CHECKS=?";
// var valeur = [0];
// sqlFK = mysql.format(sql3, valeur)
// var sql2 = "INSERT INTO `jarvis2`.?? (??) VALUES (?) "
// var values = [
//     'utilisateur', [`id_u`, `id_domicile`, `prenom_u`, `nom_u`, `date_de_naissance_u`, `email_u`, `sexe_u`, `mdp_u`, `lien_parente`],
//     ['22', '0', 'Rakoto', 'Nandrasana', '1980-01-30', 'r@nandra', 'M', 'zer', '0']
// ];
// sql = mysql.format(sql2, values);
// conn.query(sqlFK, function(err, result) {
//     if (err) throw err;
//     console.log("SQL=" + sql);
//     console.log('ici!!!!!' + sqlFK);
//     console.log(result);
//     console.log("Number of rows affected : " + result.affectedRows);
//     console.log("Number of records affected with warning : " + result.warningCount);
//     console.log("Message from MySQL Server : " + result.message);
// })


// conn.query(sqlFK, function(err, resultats) {
//     if (err) throw err;
// })
//--------------------------------------------------------------------------------
conn.query("CREATE DATABASE mynodedb", function(err, result) {
    if (err) throw err;
    console.log("Base de données créée !");
});