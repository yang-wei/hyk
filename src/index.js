import xmldoc from 'xmldoc';
import print from './print';
import { fetch, totalHitCount, dictionary, findItemId } from './utils';

export default function(word, source) {

  var dic = dictionary(word);
  var { searchDicItem, getDicItem } = source;

  return fetch(searchDicItem(word, dic))
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
