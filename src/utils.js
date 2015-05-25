import got from 'got';

// Promise is awesome
var fetch = function(url) {
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

var totalHitCount = function(node) {
  var count = node.childNamed('TotalHitCount').val;
  return parseInt(count, 10); 
}

var dictionary = function(word) {
  // if word is japanese it will be converted to %...
  // In that case we want to use ja -> en dictionaty
  return encodeURIComponent(word).indexOf('%') === -1 ? 
         'EJdict' : 
         'EdictJE'; 
}

var findItemId = function(idNode) {
  return  idNode 
          .childNamed('TitleList')
          .childNamed('DicItemTitle')
          .valueWithPath('ItemID');
}

export { fetch, totalHitCount, dictionary, findItemId };
