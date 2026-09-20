const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Leer los archivos JSON locales (simulando MongoDB)
const reviewsData = JSON.parse(fs.readFileSync('./data/reviews.json', 'utf8')).reviews;
const dealersData = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8')).dealerships;

// Endpoints
app.get('/fetchReviews', (req, res) => {
    res.json(reviewsData);
});

app.get('/fetchReviews/dealer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(reviewsData.filter(r => r.dealership === id));
});

app.get('/fetchDealers', (req, res) => {
    res.json(dealersData);
});

app.get('/fetchDealers/:state', (req, res) => {
    const state = req.params.state;
    res.json(dealersData.filter(d => d.state === state));
});

app.get('/fetchDealer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(dealersData.filter(d => d.id === id));
});

// Endpoint falso para inserción (para que no falle si intentas postear)
app.post('/insert_review', (req, res) => {
    res.json({ status: "success", message: "Review inserted successfully (mocked)" });
});

app.listen(port, () => {
    console.log(`Servidor Node.js corriendo sin Docker en http://localhost:${port}`);
});