const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fetch = require('node-fetch');

// const url = 'https://api.opensea.io/api/v1/assets/?token_ids=114202576718100464364515408500349303551825088591531595726314326089392594092033&token_ids=114202576718100464364515408500349303551825088591531595726314326088293082464257';
// const url = 'https://api.opensea.io/api/v1/collections/?asset_owner=0xfc7c5e27df0dbf67554672f7aede5ff4ec3bea83';
// const url = 'https://api.opensea.io/api/v1/events/?collection_slug=makecoin01';
const url = 'https://api.opensea.io/api/v1/assets?collection=makecoin01';
const options = {method: 'GET', qs: {order_direction: 'desc', offset: '0', limit: '20'}};
var tokens;
fetch(url, options)
  .then(res => res.json())
  .then(json => {
    tokens = json.assets;
  })
  .catch(err => console.error('error:' + err));

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) { 
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        tokens = json.assets;
        console.log("I'm running!")
      })
      .catch(err => console.error('error:' + err));
    res.render('pages/index', {tokens: tokens})})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
