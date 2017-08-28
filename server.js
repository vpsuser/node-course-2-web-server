const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('unable to append to server.log');
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintainPage: 'Site is under maintenance',
//     pageTitle: 'Site is down, we will be back as soon as possible!',
//     bodyText: 'Beauty is under stress',
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
   return new Date().getFullYear()
  // return 'TEST'
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  res.render('home.hbs', {
    welcomePage: 'Home Page',
    pageTitle: 'Welcome to Home Page',
    bodyText: 'This is the home page of a beautiful WebApp Server under development',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    ErrorMessage: 'This is very BAD ERROR',
    details: [
      'Error in the hell',
      'Hello my error on my ass...',
      'It is a magnificent error, ass hole',
      'Too bad profanity errors',
      'Take the error man, this is not GOOD AT ALL'
    ]
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
