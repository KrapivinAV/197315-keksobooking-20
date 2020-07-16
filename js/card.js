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

      if (data.author.avatar && data.author.avatar !== '') {
        cardAvatar.src = data.author.avatar;
      } else {
        cardAvatar.classList.add('hidden');
      }

      if (data.offer.title && data.offer.title !== '') {
        cardTitle.textContent = data.offer.title;
      } else {
        cardTitle.classList.add('hidden');
      }

      if (data.offer.address && data.offer.address !== '') {
        cardAddress.textContent = data.offer.address;
      } else {
        cardAddress.classList.add('hidden');
      }

      if (data.offer.description && data.offer.description !== '') {
        cardDescription.textContent = data.offer.description;
      } else {
        cardDescription.classList.add('hidden');
      }

      if (data.offer.price && data.offer.price !== '') {
        cardPrice.innerHTML = data.offer.price + '&#x20bd;<span>/ночь</span>';
      } else {
        cardPrice.classList.add('hidden');
      }

      if (data.offer.type && data.offer.type !== '') {
        cardType.textContent = window.constants.TRASLATED_TYPES[data.offer.type];
      } else {
        cardType.classList.add('hidden');
      }

      if (data.offer.rooms && data.offer.rooms !== '' && data.offer.guests && data.offer.guests !== '') {
        cardCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      } else {
        cardCapacity.classList.add('hidden');
      }

      if (data.offer.checkin && data.offer.checkin !== '' && data.offer.checkout && data.offer.checkout !== '') {
        cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      } else {
        cardTime.classList.add('hidden');
      }

      if (data.offer.features && data.offer.features.length !== 0) {
        for (var i = window.constants.FEATURES.length - 1; i >= 0; i--) {
          if (data.offer.features.includes(window.constants.FEATURES[i])) {
            cardFeaturesItems[i].textContent = window.constants.FEATURES[i];
          } else {
            cardFeatures.removeChild(cardFeaturesItems[i]);
          }
        }
      } else {
        cardFeatures.classList.add('hidden');
      }

      if (data.offer.photos && data.offer.photos.length !== 0) {
        data.offer.photos.forEach(function (item, j) {
          cardPhoto.src = item;
          if (j !== (data.offer.photos.length - 1)) {
            cardPhotos.appendChild(cardPhoto.cloneNode());
          }
        });
      } else {
        cardPhotos.classList.add('hidden');
      }

      return card;
    }
  };
})();
