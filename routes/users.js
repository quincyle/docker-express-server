var express = require('express');
var router = express.Router();
const JsonAPIConverter = require('../utils/json-api-convert')

const RESOURCE_TYPE = 'users'
let USERS_GET_REQUEST_COUNT = 0

var mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 10,
  host: '159.203.188.137',
  user: 'qle',
  password: 'adminpw',
  database: 'uac'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  USERS_GET_REQUEST_COUNT = USERS_GET_REQUEST_COUNT + 1;
  console.log(USERS_GET_REQUEST_COUNT)

  pool.query('SELECT * from users', function (err, rows, fields) {
    if (err) throw err;
  
    const response = new JsonAPIConverter(rows, RESOURCE_TYPE).arrayResponse();
    
    res.json(response);
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id

  pool.query('SELECT * from users where id = ?',[id], function (err, rows, fields) {
    if (err) throw err

    if (rows.length === 0) {
      res.status(404);
      res.send('No id found.');
      return;
    }
  
    const item = rows[0];
    const response = new JsonAPIConverter(item, RESOURCE_TYPE).singleResponse();

    res.json(response);
  });
});

router.post('/', (req, res, next) => {
  const user = req.body.data.attributes

  return user

});

module.exports = router;
