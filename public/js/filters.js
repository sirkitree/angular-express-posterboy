'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('convert', function() {
    return function(text, convert) {
      if (typeof text !== 'undefined') {
        var converted = marked(text);
        return converted;
      }
    }
  });
