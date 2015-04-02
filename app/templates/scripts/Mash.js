var Mash = (function() {

  var _template_map = {};
  var mash = {};

  /*
   * load Mustache Template with cache
   * url: template url
   * _callback(template): a function with argument template
   * one : if one is true,this template will not be cached
   */
  mash.loadTemplate = function(url, _callback, one) {
    if (url in _template_map && !one) {
      if (_callback && typeof(_callback) == 'function') {
        _callback(_template_map[url]);
      }
    } else {
      $.get(url, function(template) {
        Mustache.parse(template);
        _template_map[url] = template;
        if (_callback && typeof(_callback) == 'function') {
          _callback(template);
        }
      });
    }
  }

  /*
   * load template and render it
   * url:template url
   * data:template's data
   * _callback(rendered):a function callback with rendered html
   * one : if one is true,this template will note be cached
   */
  mash.loadAndRender = function(url, data, _callback, one) {
    mash.loadTemplate(url, function(template) {
      var rendered = Mustache.render(template, data);
      if (_callback && typeof(_callback) == 'function') {
        _callback(rendered);
      }
    }, one);
  }

  /*
   * get current url's Param value
   * sParam:Param's key
   * return param's value
   */
  mash.getUrlParams = function(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }

  // convert parameters from url-style string to associative array
  function transformToAssocArray(prmstr) {
    var params = {},
      prmarr = prmstr.split("&");

    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  }

  /*
   * edit current Url's Params
   * key:Param's key
   * value:Param's value
   * return: new param string(include all params)
   */
  mash.editUrlParams = function(key, value) {
    key = encodeURI(key);

    var prmstr = window.location.search.substr(1);
    var params = (prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {});

    if (Object.keys(params).length === 0) {
      if (value !== false)
        return '?' + key + '=' + encodeURI(value);
      else
        return '';
    }

    if (value !== false)
      params[key] = encodeURI(value);
    else
      delete params[key];

    if (Object.keys(params).length === 0)
      return '';

    return '?' + $.map(params, function(value, key) {
      return key + '=' + value;
    }).join('&');

  }

  /*
   * get is a absolute path
   * path:url
   * return:true means absolute.
   */
  mash.isPathAbsolute = function(path) {
    return /^(?:\/|[a-z]+:\/\/)/.test(path);
  }

  /*
   * convert url to absolute
   * url:url
   * return:absolute url
   */
  mash.getAbsoluteUrl = function(url) {
    var a = document.createElement('a');
    a.href = url;
    url = a.href;
    return url;
  }

  mash.uiInit = function() {
    mash.gotoTab(0);
    $('.nav-tab').on('click', function() {
      var index = $(this).index();
      mash.gotoTab(index);
    });
  }


  mash.showFloat = function() {
    $('.float-view').css('-webkit-transform', 'translate3d(0,0,0)');
  }

  mash.gotoTab = function(index) {
    $(".container-tab").removeClass('-active').eq(index).addClass('-active');
  }


  return mash;
})();

window.Mash = Mash;
window._M = Mash;
