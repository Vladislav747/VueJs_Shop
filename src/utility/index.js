import Noty from 'noty'

export const showNoty = function (text, type = 'error') {
  new Noty({
    text,
    type,
    timeout: 3000,
    layout: 'topCenter'
  }).show()
}

export const PRODUCT_CATEGORIES = [
  'Мясо',
  'Рыба',
  'Хлеб',
  'Вода',
];

//Для тестирования в случае если нету никаких заданий
export const defaultProducts = [];

export const PRODUCT_MANUFACTURES = [
  'Bosch',
  'Samsung'
];

export const generateRandomSeed = function(){
  return Math.random().toString(36).substr(2, 10)
}

