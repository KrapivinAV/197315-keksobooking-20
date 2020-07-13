'use strict';

window.card = (function () {

  return {
    create: function (data) {
      var cardTemplate = document.querySelector('#card').content;
      var cardPopup = cardTemplate.querySelector('.popup');
      var card = cardPopup.cloneNode(true);
      var cardAvatar = card.querySelector('.popup__avatar');
      var cardTitle = card.querySelector('.popup__title');
      var cardAddress = card.querySelector('.popup__text--address');
      var cardPrice = card.querySelector('.popup__text--price');
      var cardType = card.querySelector('.popup__type');
      var cardCapacity = card.querySelector('.popup__text--capacity');
      var cardTime = card.querySelector('.popup__text--time');
      var cardFeatures = card.querySelector('.popup__features');
      var cardFeaturesItems = cardFeatures.children;
      var cardDescription = card.querySelector('.popup__description');
      var cardPhotos = card.querySelector('.popup__photos');
      var cardPhoto = cardPhotos.querySelector('.popup__photo');

      cardAvatar.src = data.author.avatar;
      cardTitle.textContent = data.offer.title;
      cardAddress.textContent = data.offer.address;
      cardPrice.innerHTML = data.offer.price + '&#x20bd;<span>/ночь</span>';
      cardType.textContent = window.constants.TRASLATED_TYPES[data.offer.type];
      cardCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

      for (var i = window.constants.FEATURES.length - 1; i >= 0; i--) {
        if (data.offer.features.includes(window.constants.FEATURES[i])) {
          cardFeaturesItems[i].textContent = window.constants.FEATURES[i];
        } else {
          cardFeatures.removeChild(cardFeaturesItems[i]);
        }
      }

      cardDescription.textContent = data.offer.description;

      for (i = 0; i < data.offer.photos.length; i++) {
        cardPhoto.src = data.offer.photos[i];
        if (i !== (data.offer.photos.length - 1)) {
          cardPhotos.appendChild(cardPhoto.cloneNode());
        }
      }

      return card;
    }
  };
})();
