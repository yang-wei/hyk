/*!
 * Testing the main flow
 */
import chai from 'chai';
import nock from 'nock';
var { expect } = chai; 

import { fetch, totalHitCount, dictionary, findItemId } from '../lib/utils';
import { searchDicItem, getDicItem } from '../lib/api_source';
import xmldoc from 'xmldoc';

const fakeWord = 'fakeWord', fakeId = 1; 
const dic = dictionary(fakeWord);

describe('hyk main', function() {

  before(function() {

      let [ , dejizoSearchParams ] = searchDicItem(fakeWord, dic).split('?');
      let [ , dejizoGetParams ] = getDicItem(fakeId, dic).split('?');


      var scope= nock('http://public.dejizo.jp')
                .get(`/NetDicV09.asmx/SearchDicItemLite?${dejizoSearchParams}`)
                .replyWithFile(201, __dirname + '/source/searchDicItem.xml')
                .get(`/NetDicV09.asmx/GetDicItemLite?${dejizoGetParams}`)
                .replyWithFile(201, __dirname + '/source/getDicItem.xml')

  });

 it('should make sure promise flow is correct', function() {

  return fetch(searchDicItem(fakeWord, dic))
  .then(function(res) {
    expect(res.statusCode).to.equal(201);
    return res.body
  })
  .then(function(data) {
    var idNode = new xmldoc.XmlDocument(data);
    var id = findItemId(idNode);
    expect(id).to.equal('1');
    return id;
  })
  .then(function(itemId) {
    return fetch(getDicItem(itemId, dic)) 
  })
  .then(function(res) {
    expect(res.statusCode).to.equal(201);
    var itemNode = new xmldoc.XmlDocument(res.body);
  })
  
 });

});
