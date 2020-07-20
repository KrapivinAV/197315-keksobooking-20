'use strict';

window.action = (function () {
  return {
    isEscEvent: function (evt, action) {
      if (evt.key === window.constants.EvtKey.CANCEL) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === window.constants.EvtKey.CONFIRM) {
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
