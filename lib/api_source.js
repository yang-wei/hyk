module.exports = {
  
  searchDicItem: function(word, dic) {

 return "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=" + dic + "&Word=" + encodeURIComponent(word) + "&Scope=HEADWORD&Match=EXACT&Merge=OR&Prof=XHTML&PageSize=20&PageIndex=0"
},

  getDicItem: function(id, dic) {
  return "http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic="+ dic + "&Item=" + id + "&Loc=&Prof=XHTML";
}

}
