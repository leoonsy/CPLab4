const Ciphers = require('./ciphers');
const _ = require('lodash');

let text = 'послезавтрабудеточеньинтересныйфильм', key = 6;
//Простая перестановка
const simplePermutationResult = Ciphers.simplePermutation(text, key);
console.log(simplePermutationResult);

//Одиночная перестановка по ключу
key = 'беседа';
const singlePermutationResult = Ciphers.singlePermutation(text, Ciphers.getNormilizedKey([...key], 'STRING_ARRAY'), true);
console.log(singlePermutationResult);

//Двойная перестановка
let colsKey = [3, 2, 0, 5, 4, 1], rowsKey = [0, 2, 1, 4, 5, 3];
console.log(Ciphers.doublePermutation(text, colsKey, rowsKey))

//Шифрование магическими квадратами
const square = [
    26, 32, 18, 9, 11, 15,
    7, 16, 21, 23, 20, 24,
    14, 10, 25, 35, 19, 8,
    34, 27, 6, 12, 2, 30,
    17, 22, 5, 3, 31, 33,
    13, 4, 36, 29, 28, 1
]
console.log(Ciphers.magicSquare(text, Ciphers.getNormilizedKey(square, 'NUMBER_ARRAY')));

//Шифр Плейфера
key = 'бандерольвгжзийкмпстуфхцчшщыъэюя';
console.log(Ciphers.playfair(text, key));

