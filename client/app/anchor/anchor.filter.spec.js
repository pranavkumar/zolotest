'use strict';

describe('Filter: anchor', function () {

  // load the filter's module
  beforeEach(module('zolotestApp'));

  // initialize a new instance of the filter before each test
  var anchor;
  beforeEach(inject(function ($filter) {
    anchor = $filter('anchor');
  }));

  it('should return the input prefixed with "anchor filter:"', function () {
    var text = 'angularjs';
    expect(anchor(text)).toBe('anchor filter: ' + text);
  });

});
