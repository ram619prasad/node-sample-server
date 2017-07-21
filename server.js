const express = require('express');
var hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screemIt', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  var date = new Date().toString();
  var log = `${date}: ${req.method} - ${req.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log(error);
    }
  })
  next();
})

app.use((req, res, next) => {
  res.render('maintanence.hbs');
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>');
  res.render('home.hbs', {
    title: 'Home Page',
    welcome_message: 'This is the beginning of something great.'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request. Please navigate to http://localhost:3000'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
