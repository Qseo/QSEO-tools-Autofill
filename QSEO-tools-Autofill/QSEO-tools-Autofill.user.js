// ==UserScript==
// @name          QSEO-tools-Autofill
// @namespace     http://qseo.ru
// @description   Autofill tool for quick submit forms on sites via url. Homepage: https://github.com/Qseo/QSEO-tools-Autofill/
// @icon          http://qseo.ru/logo/logo_q.svg
// @version       1.3
// @updateURL     https://github.com/Qseo/QSEO-tools-Autofill/raw/master/QSEO-tools-Autofill/QSEO-tools-Autofill.user.js
// @downloadURL   https://github.com/Qseo/QSEO-tools-Autofill/raw/master/QSEO-tools-Autofill/QSEO-tools-Autofill.user.js
// @include       http*://*/*_autofill=*
// @grant         GM_info
// ==/UserScript==

// alert('x');

var jquery_url = '//code.jquery.com/jquery-latest.min.js';

if( window.location.host.match(/yandex\./) ) {
  jquery_url = '//yastatic.net/jquery/1.11.0/jquery.min.js';
}

var query = window.location.search.substring(1);

if ( /_autofill=/g.test(query) ) {
  var debug = /debug=/g.test(query);

  if (typeof jQuery === "function") {
    if (debug) {
      console.log("Running with local copy of jQuery!");
    }

    GM_main(jQuery);
  }
  else {
    if (debug) {
      console.log("fetching jQuery from some 3rd-party server.");
    }

    add_jQuery(GM_main);
  }
}

function GM_main($) {
  window.decode = function(s) {
    return decodeURIComponent( s.replace(/\+/g, " ") );
  };

  window.qseoToolsGetUrlParams = function() {
    var params = {},
        match,
        search = /([^&=]+)=?([^&]*)/g,
        query  = window.location.search.substring(1);

    // Костыль для урлов энкоженых несколько раз. Повторный urlencode происходит при редиректе. Решение тут http://stackoverflow.com/questions/6520484/mod-rewrite-urlencoding-an-already-urlencoded-querystring-parameter-any-way-to
    var i = 0, query_prev;

    while(query != decode(query) && i < 10) {
      query_prev = query;
      query = decode(query);
      i++;
    }

    query = query_prev;
    // --- END

    while (match = search.exec(query)) {
      params[ decode(match[1]) ] = match[2];
    }

    return params;
  };

  window.qseoReplaceUrlPlaceholders = function(str) {
    str = str.replace(/\$\$/g, '#');
    str = str.replace(/\@\@/g, '&');

    return str;
  };

  var urlParams = qseoToolsGetUrlParams();

  if ( !urlParams ) return;

  if(urlParams['debug']) {
    var debug = true;
  }

  window.qseoAutofillDoCommands = function(commands, start) {
    var count = commands.length;
    var item;

    start = start || 0;

    for(i = start; i < count; i++) {
      item = commands[i];

      if(item) {
        if(debug) {
          console.log('Parsing _autofill item "' + item + '"');
        }

        var parts = item.split(/=(.+)?/);

        parts[0] = qseoReplaceUrlPlaceholders( decode(parts[0]) );
        parts[1] = qseoReplaceUrlPlaceholders( decode(parts[1]) );

        if(parts[0] == 'href') {
          var url = $(parts[1]).attr('href');

          if(!url) {
            url = $(parts[1])[0].attr('href');
          }

          if(debug) {
            console.log('Going to href link "' + url + '" on selector "' + parts[1] + '"');
          }

          window.location.href = url;
        }
        else if(parts[0] == 'click') {
          if(debug) {
            console.log('Clicking jquery selector "' + parts[1] + '"');
          }

          $(parts[1]).trigger('click');
        }
        else if(parts[0] == 'sleep') {
          if(debug) {
            console.log('Sleeping ' + parts[1] + ' ms.');
          }

          setTimeout(function() {
            window.qseoAutofillDoCommands(commands, i + 1);
          }, parts[1]);

          return;
        }
        else {
          if(debug) {
            console.log('Filling jquery selector "' + parts[0] + '" via value "' + parts[1] + '"');
          }

          $(parts[0]).val(parts[1]);
        }
      }
    }
  };

  if(urlParams['_autofill']) {
    var commands = urlParams['_autofill'].split(';');

    qseoAutofillDoCommands(commands);
  }
}

function add_jQuery(callbackFn) {
  var D           = document;
  var targ        = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
  var scriptNode  = D.createElement('script');

  scriptNode.src  = jquery_url;
  scriptNode.addEventListener("load", function () {
    var scriptNode = D.createElement("script");

    scriptNode.textContent = 'var gm_jQuery = jQuery.noConflict(true);\n' + '(' + callbackFn.toString() + ')(gm_jQuery);';

    targ.appendChild(scriptNode);
  }, false);

  targ.appendChild(scriptNode);
}