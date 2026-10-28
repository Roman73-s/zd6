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
    
    // Берем значение из поля
    var qty = parseInt(quantityInput.value, 10);
    
    // Если поле пустое или меньше 1 (например, стерли), для расчета берем 1
    if (isNaN(qty) || qty < 1) {
      qty = 1;
      // НЕ пишем 1 обратно в поле, чтобы не мешать пользователю вводить!
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
  
  // Обработка поля ввода
  quantityInput.addEventListener('input', function() {
    // Если каким-то образом ввели минус, стираем его на месте
    if (this.value < 0) {
      this.value = Math.abs(this.value);
    }
    // Пересчитываем
    calculate();
  });
});
