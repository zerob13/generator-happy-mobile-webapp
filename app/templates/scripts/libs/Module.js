Mash.Module = (function() {

  'use strict';

  var MODULE_SELECTOR = 'zmod';
  var modules = {};
  var instance = {};
  var globalConfig = {};
  var eventTypes = ['click', 'mouseover', 'mouseout', 'mousedown', 'mouseup',
    'mouseenter', 'mouseleave', 'keydown', 'keyup', 'submit', 'change',
    'contextmenu', 'dblclick', 'input', 'focusin', 'focusout', 'tap'
  ];
  var assign = _M.assign;

  function isFired(element) {
    var ins = instance[element.id];
    return (typeof ins === 'object');
  }

  function bindEventListener(mod, element) {
    for (var i = 0; i < eventTypes.length; i++) {
      if (mod[eventTypes[i]]) {
        var callback = mod[eventTypes[i]];
        $(element).on(eventTypes[i], function(event) {
          callback(event, event.target, element);
        });
      }
    }
  }

  function unbindeventListener(mod, element) {
    $(element).off();
  }
  return assign(modules, {

    init: function(params) {
      assign(globalConfig, params || {});
      this.fireAll(document.documentElement);
    },
    getConfig: function() {
      return globalConfig;
    },
    defMod: function(moduleName, factory) {
      if (typeof modules[moduleName] !== 'undefined') {
        throw (new Error('Module ' + moduleName + ' has already been added.'));
        return;
      }
      modules[moduleName] = {
        factory: factory,
        counter: 1
      };

    },
    fireAll: function(root) {
      var moduleElements = $('[data-' + MODULE_SELECTOR + ']', root);
      console.log(moduleElements);
      for (var i = 0; i < moduleElements.length; i++) {
        this.fireMod(moduleElements[i]);
      }

    },
    fireMod: function(element) {
      var modName = $(element).data(MODULE_SELECTOR);
      var modData = modules[modName];
      if (!modData) {
        throw (new Error('Module type "' + modName + '" is not defined.'));
        return;
      }
      if (!isFired(element)) {
        if (!element.id) {
          element.id = 'zmod-' + modName + '-' + modData.counter;
        }
        modData.counter++;
        var _mod = modData.factory();
        bindEventListener(_mod, element);
        instance[element.id] = _mod;
        this.updateView(element);
      }
    },
    unfireMod: function(element) {
      var modName = $(element).data(MODULE_SELECTOR);
      var modData = modules[modName];
      if (!isFired(element)) {
        return;
      }
      var _mod = instance[element.id];
      modData.counter--;
      unbindeventListener(_mod, element);
      delete instance[element.id];
    },
    updateView: function(element) {
      var _mod = instance[element.id];
      var htmlText;
      if (typeof(_mod['template']) !== 'function') {
        return;
      }
      htmlText = _mod.template();
      $(element).html(htmlText);
    }
  });

})();
