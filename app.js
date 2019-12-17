const express = require('express');
const admin = require('./routes/admin');

const app = express();
const port = 3000;


app.get('/', function (req, res) {
    res.send('first app mutation test for');
});
// Routing
app.use('/admin', admin);

app.listen(port, () => {
    console.log('Express listening on port', port);
});