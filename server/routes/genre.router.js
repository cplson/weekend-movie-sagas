const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const queryText = `SELECT name
  FROM genres
  JOIN movies_genres ON genres.id = movies_genres.genre_id
  JOIN movies ON movies.id = movies_genres.movie_id
  WHERE movies.id = $1;`;

  pool.query(queryText, [req.params.id]).then(result => {

    console.log('got genres from db', result.rows);
    res.send(result.rows);
  }).catch(error => {
    console.log('error getting genres from db', error);
    res.sendStatus(500);
  })
});

module.exports = router;