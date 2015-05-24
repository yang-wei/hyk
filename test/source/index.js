var path = require('path');

module.exports = {

  searchDicItem(word, dic) {
    return path.resolve( __dirname + '/searchDicItem.xml' )
  },

  getDicItem(id, dic) {
    return path.resolve( __dirname + '/getDicItem.xml')
  } 

}
