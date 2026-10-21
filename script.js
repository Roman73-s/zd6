'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var typeRadios = document.getElementsByName('serviceType');
  var optionsBlock = document.getElementById('options-block');
  var propertyBlock = document.getElementById('property-block');
  var serviceOption = document.getElementById('serviceOption');
  var serviceProperty = document.getElementById('serviceProperty');
  var quantityInput = document.getElementById('quantity');
  var resultBlock = document.getElementById('calc-result');

  function calculate() {
    var type = document.querySelector('input[name="serviceType"]:checked').value;
    var qty = parseInt(quantityInput.value, 10) || 1;
    var basePrice = 0;

    if (type === 'type1') {
      basePrice = 1000;
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.add('d-none');
    } else if (type === 'type2') {
      basePrice = 2000;
      var optionPrice = parseInt(serviceOption.value, 10);
      basePrice += optionPrice;
      optionsBlock.classList.remove('d-none');
      propertyBlock.classList.add('d-none');
    } else if (type === 'type3') {
      basePrice = 3000;
      if (serviceProperty.checked) {
        basePrice += 1500;
      }
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.remove('d-none');
    }

    var total = basePrice * qty;
    resultBlock.textContent = 'Итого: ' + total.toLocaleString('ru-RU') + ' ₽';
  }

  // Слушатели событий
  typeRadios.forEach(function (radio) {
    radio.addEventListener('change', calculate);
  });

  serviceOption.addEventListener('change', calculate);
  serviceProperty.addEventListener('change', calculate);
  quantityInput.addEventListener('input', calculate);
});
