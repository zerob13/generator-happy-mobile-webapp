Mash.DataHub = (function() {
  'use strict';

  var DataHub = {};
  var DataProviders = {};
  var assign = _M.assign;
  return assign(DataHub, {
    init: function() {
      //do nothing now;
    },
    //define a data provider
    defData: function(dataProviderName, factory) {
      if (typeof DataProviders[dataProviderName] !== 'undefined') {
        throw (new Error('DataProvider' + DataProvider + ' has already been defined.'));
        return;
      }
      DataProviders[dataProviderName] = {
        factory: factory,
        instance: null
      }
    },
    getData: function(dataProviderName) {
      var dp = DataProviders[dataProviderName];
      if (dp) {
        if (!dp.instance) {
          dp.instance = dp.factory();
        }
        return dp.instance;
      }
      return null;
    }
  });

})();
