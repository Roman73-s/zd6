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
    
    // Получаем количество, берем модуль (на случай если минус проскочил)
    var qty = Math.abs(parseInt(quantityInput.value, 10));
    
    // Если ввели 0, пустоту или текст - ставим 1
    if (isNaN(qty) || qty < 1) {
      qty = 1;
      quantityInput.value = 1; 
    }

    var basePrice = 0;

    if (type === 'optics') {
      basePrice = 10000;
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.add('d-none');
    } else if (type === 'deck') {
      basePrice = 20000;
      var optionPrice = parseInt(serviceOption.value, 10);
      basePrice += optionPrice;
      optionsBlock.classList.remove('d-none');
      propertyBlock.classList.add('d-none');
    } else if (type === 'arms') {
      basePrice = 30000;
      if (serviceProperty.checked) {
        basePrice += 15000;
      }
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.remove('d-none');
    }

    var total = basePrice * qty;
    resultBlock.textContent = 'Итого: ' + total.toLocaleString('ru-RU') + ' €$';
  }

  typeRadios.forEach(function (radio) {
    radio.addEventListener('change', calculate);
  });

  serviceOption.addEventListener('change', calculate);
  serviceProperty.addEventListener('change', calculate);
  
  // Слушаем любое изменение в поле ввода
  quantityInput.addEventListener('input', calculate);
});
