'use strict';

window.action = (function () {
  return {
    isEscEvent: function (evt, action) {
      if (evt.key === window.constants.CANCEL_EVT_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === window.constants.CONFIRM_EVT_KEY) {
        action();
      }
    },
    isPrimaryButtonDownEvent: function (evt, action) {
      if (evt.button === window.constants.PRIMARY_BUTTON_DOWN) {
        action();
      }
    }
  };
})();
