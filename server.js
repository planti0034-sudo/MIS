const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1937258456123Mis!',
  database: 'mctl_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Read data from MySQL and render it in index.html
app.get('/', (req, res) => {
  const query = 'SELECT * FROM your_table';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('index.ejs', { data: results });
  });
});

// Add new data to MySQL
app.post('/add', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const query = 'INSERT INTO your_table (name, email) VALUES (?, ?)';
  connection.query(query, [name, email], (err) => {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
