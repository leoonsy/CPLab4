const Ciphers = require('./ciphers');
const _ = require('lodash');

let text = 'ТЕРМИНАТОРПРИБЫВАЕТСЕДЬМОГОВПОЛНОЧЬ', key = 5;
//Простая перестановка
const simplePermutationResult = Ciphers.simplePermutation(text, key);
console.log(simplePermutationResult);

//Одиночная перестановка по ключу
key = 'ПЕЛИКАН';
const singlePermutationResult = Ciphers.singlePermutation(text, Ciphers.getNormilizedKey([...key], 'STRING_ARRAY'), true);
console.log(singlePermutationResult);

//Двойная перестановка
text = 'ПРИЛЕТАЮВОСЬМОГО';
let colsKey = [3, 0, 2, 1], rowsKey = [2, 0, 3, 1];
console.log(Ciphers.doublePermutation(text, colsKey, rowsKey))

//Шифрование магическими квадратами
const square = [
    16, 3, 2, 13,
    5, 10, 11, 8,
    9, 6, 7, 12,
    4, 15, 14, 1
]
console.log(Ciphers.magicSquare(text, Ciphers.getNormilizedKey(square, 'NUMBER_ARRAY')));

//Шифр Плейфера
text = 'ВСЕТАЙНОЕСТАНЕТЯВНЫМ';
key = 'БАНДЕРОЛЬВГЖЗИЙКМПСТУФХЦЧШЩЫЪЭЮЯ';
console.log(Ciphers.playfair(text, key));

