require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});