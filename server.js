const express = require('express');
const bodyParser = require('body-parser');
const information = require('./data/information.json');

const app = express();

app.set('view engine', 'pug'); 
app.use(express.static(__dirname + '/dist'));

// const fs = require('fs');

// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extende: true }));

// const routes = require('./routes/routes.js')(app, fs);

app.get('/', (req, res) => {
  res.render('index', {
    title: information.intro.title,
    intro: information.intro.text,
    paragraphs: information.paragraphs,
    projects: information.projects
  })
})

const server  = app.listen(5000, () => {
  console.log('listening on port %s...', server.address().port);
})