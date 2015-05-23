'use strict';
var xmldoc = require('xmldoc');
var clor = require('clor');
var gitUrl = require('./package').repository.url;

module.exports = {
  
  'EJdict': function(node) {
    var itemNode = new xmldoc.XmlDocument(node);

    log('');

    // title
    var title = getTitle(itemNode.valueWithPath('Head.div.span'))
    log(
        '' +
        clor.bold(title[0])
    );

    var contents = getJpContent(itemNode.valueWithPath('Body.div.div'));
    contents.forEach(function (content) {
      log(
          clor.gray.dim(' - ') + 
          clor.magenta(content)
         ) 
    });

  },

  'EdictJE': function(node) {
    var itemNode = new xmldoc.XmlDocument(node);
    
    log('');

    // title
    var title = getTitle(itemNode.valueWithPath('Head.div.span'))
    log(
        '' +
        clor.bold(title[0]) +
        clor.green(title[1]) 
    );

    // content
    itemNode.descendantWithPath('Body.div.div')
            .eachChild(function (child, index) {
            if(child.val === '(P)' || child.val === '') return;
              log(
                  clor.gray.dim(' - ') + 
                  clor.magenta(child.val)
                 ) 
            });

    log('');
  },

  'error': function(error) {
    log(
      clor.line() +
      clor.red('Error: ') +
      error
    )
    log(
      clor.line() +
      clor.grey('~ en-jp translation in your terminal ~') +
      clor.grey.italic.line('   ' + gitUrl)
    )
  }
}

function getTitle(title) {
  return title.replace(/\s+/g, ' ').split(' ');
}

function getJpContent(content) {
 return content.split('\t')
}

function log(message, indent) {
  indent = indent || 1;
  var space = '';
  for(var i = 1; i < indent; i ++) {
    space += '  '; 
  }
  console.log(space, message || '');
}
