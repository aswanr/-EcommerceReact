'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _testingLibraryReact = require('@testing-library/react');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

test('renders learn react link', function () {
  (0, _testingLibraryReact.render)(_react2['default'].createElement(_App2['default'], null));
  var linkElement = _testingLibraryReact.screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});