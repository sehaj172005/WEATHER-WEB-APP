
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');


const publicPath = path.join(__dirname, 'public');
const viewsPath = path.join(publicPath, 'views');
const partialsPath = path.join(__dirname, 'templates', 'partials');

app.use(express.static(publicPath));




hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
