var got = require('got');
var Promise = require('lie');
var xmldoc = require('xmldoc');
var print = require('./print');
var searchDicItem = require('./api_source').searchDicItem ;
var getDicItem = require('./api_source').getDicItem;

module.exports = function(word) {

  var dic = dictionary(word);

  fetch(searchDicItem(word, dic))
  .then(function(res) {
    return res.body
  })
  .then(function(data) {
    var idNode = new xmldoc.XmlDocument(data);

    if(totalHitCount(idNode) === 0) {
      throw 'Word not found. Make sure it is a word and spelling is correct.';
    }
    return findItemId(idNode);
  })
  .then(function(itemId) {
    return fetch(getDicItem(itemId, dic))
  })
  .then(function(res) {
    var itemNode = new xmldoc.XmlDocument(res.body);
    print[dic](itemNode);
  })
  .catch(function(error) {
    print['error'](error)
  });

}

// Promise is awesome
function fetch(url) {
 return new Promise(function (resolve, reject) {
    got(url, function(err, body, res) {
      if (err) {
        err.body = body;
        err.response = res;
        return reject(err)
      } 
      res.body = body;
      resolve(res);
    });
 }); 
}

function totalHitCount(node) {
  var count = node.childNamed('TotalHitCount').val;
  return parseInt(count, 10); 
}

function dictionary(word) {
  // if word is japanese it will be converted to %...
  // In that case we want to use ja -> en dictionaty
  return encodeURIComponent(word).indexOf('%') === -1 ? 
         'EJdict' : 
         'EdictJE'; 
}

function findItemId(idNode) {
  return  idNode 
          .childNamed('TitleList')
          .childNamed('DicItemTitle')
          .valueWithPath('ItemID');
}
