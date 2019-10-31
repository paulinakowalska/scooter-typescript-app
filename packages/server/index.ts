const express = require('express');
const app = express();
const port = 3000;

app.get('/info', (req, res) => res.send('Info'));
app.get('/scooters', (req, res) => res.send('Scooters'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
