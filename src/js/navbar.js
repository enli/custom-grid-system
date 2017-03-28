'use strict';

(function () {
  var REGEX_IN = /(^|\s)in($|\s)/;
  var REGEX_TOGGLE_IN = /\s*in\s*/;

  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
  });

  function initNavbar() {
    var toggles = document.querySelectorAll('button[data-target]');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', clickHandler);
    });
  }

  function clickHandler() {
    var target = this.getAttribute('data-target');
    if (target) {
      // Only ID based targets are supported
      target = document.getElementById(target.substring(1));
      toggleVisibility(target);
    } else {
      console.error('data-target not specified.');
    }
  }

  function isElementVisible(element) {
    return element.className.match(REGEX_IN);
  }

  function toggleVisibility(element) {
    if (!element) {
      console.error('Element not found to toggle visibility.');
      return;
    }

    if (isElementVisible(element)) {
      hideElement(element);
    } else {
      showElement(element);
    }
  }

  function hideElement(element) {
    var matches = element.className.match(REGEX_IN);
    element.className = element.className.replace(REGEX_TOGGLE_IN, '');
  }

  function showElement(element) {
    element.className += ' in';
  }
})();
