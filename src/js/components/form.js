import {ACTIVE} from "../_const";

$.extend($.validator.messages, {
  required: 'Пожалуйста, заполните поле',
  remote: 'Исправьте это поле чтобы продолжить',
  email: 'Введите правильный email адрес.',
  url: 'Введите верный URL.',
  date: 'Введите правильную дату.',
  dateISO: 'Введите правильную дату (ISO).',
  number: 'Введите число.',
  digits: 'Введите только цифры.',
  creditcard: 'Введите правильный номер вашей кредитной карты.',
  equalTo: 'Повторите ввод значения еще раз.',
  accept: 'Пожалуйста, введите значение с правильным расширением.',
  maxlength: jQuery.validator.format('Нельзя вводить более {0} символов.'),
  minlength: jQuery.validator.format('Должно быть не менее {0} символов.'),
  rangelength: jQuery.validator.format('Введите от {0} до {1} символов.'),
  range: jQuery.validator.format('Введите число от {0} до {1}.'),
  max: jQuery.validator.format('Введите число меньше или равное {0}.'),
  min: jQuery.validator.format('Введите число больше или равное {0}.')
});

$('.form--callBack').validate({
  invalidHandler () {
    // $('.js-add-preloader').removeClass('is-loading');
  },
  rules: {
    emailphone: {
      required: true
    },
    name: {
      required: true
    },
  },
  onfocusin: false,
  onfocusout: false,
});

$('form')
  .delegate('*', 'focus blur', function () {
    const $elem = $(this);
    setTimeout(() => {
      if ($elem.val()) {
        $elem.parent()
          .addClass(ACTIVE, $elem.is(':focus'));
        $elem.parent()
          .addClass('has-val');
      } else {
        $elem.parent()
          .removeClass('has-val');
        $elem.parent()
          .toggleClass(ACTIVE, $elem.is(':focus'));
      }
    }, 0);
  });
