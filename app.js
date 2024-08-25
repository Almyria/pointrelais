const express = require('express');
const session = require('express-session');
const axios = require("axios");

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'PersonneConnaitLeMotDePasseBouhLesNuls!!!!',
    resave: false,
    saveUninitialized: true,
}));

const webhookUrl = "https://discord.com/api/webhooks/1277292390134321284/t7wdiyVzS-O3uEHc7iuA8dttFlyZfnR7o-DJgNmAcxUKnIVfgLCjaxZixiRTLshD0fmJ";

let passwordFound = false;
let pseudoJoueurGagnant = "";
let messagePourLesNuls = "";
let discordMessageSent = false;

app.get('/', (req, res) => {
    if (passwordFound) {
        res.render('trop-tard', { pseudo: pseudoJoueurGagnant, message: messagePourLesNuls });
    } else {
        res.render('index', { error: '' });
    }
});

app.post('/connexion', async (req, res) => {
    if (passwordFound) {
      res.redirect('/');
    } else {
      const { pseudo, password1, password2, password3, password4 } = req.body;
      // Sanitize input with Regex, allow only letters, numbers and spaces
      const regex = /^[a-zA-Z0-9 ]*$/;
      if (!regex.test(pseudo)) {
          return res.render('index', { error: 'Les caractères spéciaux ne sont pas autorisés' });
      }
      //if (password1 === "1" && password2 === "2" && password3 === "3" && password4 === "4") {
      if (password1 === "Millenium" && password2 === "ZelvacLeGoat" && password3 === "polygone" && password4 === "Les Ratz") {
          req.session.accessGranted = true;
          passwordFound = true;
          pseudoJoueurGagnant = pseudo;
          res.redirect('/gg');
      } else {
          res.render('index', { error: 'Les mots de passe ne correspondent pas' });
      }
    }
});

app.get('/gg', (req, res) => {
  if (req.session.accessGranted) {
    res.render('gg', { pseudo: pseudoJoueurGagnant, message: messagePourLesNuls, discordMessageSent: discordMessageSent });
  } else {
    if (passwordFound) {
      res.redirect('/');
    } else {
      res.render('index', { error: 'BIEN TENTÉ!!!!' });
    }
  }
});

app.post('/gg', (req, res) => {
    if (req.session.accessGranted) {
        const { message } = req.body;
        messagePourLesNuls = message;
        if (discordMessageSent === false) {
            //send discord webhook
            var embeds = [
                {
                    "title": "Message de "+pseudoJoueurGagnant,
                    "description": messagePourLesNuls,
                    "color": 5814783
                }
            ];

            let data = JSON.stringify({ embeds });

            var config = {
                method: "POST",
                url: webhookUrl,
                headers: { "Content-Type": "application/json" },
                data: data,
            };
             
            //Send the request
            axios(config)
                .then((response) => {
                    console.log("[Discord] Webhook delivered successfully");
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        }
        discordMessageSent = true;
        res.redirect('/gg');
    } else {
        res.render('index', { error: 'BIEN TENTÉ!!!!' });
    }
});

app.listen(43123, () => {
  console.log('Server started on port 43123');
});