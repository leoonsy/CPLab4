const _ = require('lodash');

class Ciphers {
    /**
     * Простая перестановка (транспонирование)
     * @param {string} text 
     * @param {number} key 
     * @returns {string}
     */
    static simplePermutation(text, key) {
        const result = Array(key).fill('');
        for (let i = 0; i < result.length; i++) 
            for (let idx of _.range(i, text.length, key))
                result[i] += text[idx];

        return result.join('');
    }

    /**
     * Одиночная перестановка по ключу
     * @param {string} text 
     * @param {number[]} key 
     * @returns {string}
     */
    static singlePermutation(text, key, doSimplePermutation = false) {
        console.assert(text.length % key.length == 0);
        
        if (doSimplePermutation)
            text = this.simplePermutation(text, text.length / key.length);
        let result = [];
        for (let block of _.range(0, text.length, key.length)) {
            let temp = [key.length];
            for (let i of _.range(key.length))
                temp[key[i]] = text[block + i];
            
            result = result.concat(temp);
        }
        return result.join('');
    }

    /**
     * Двойная перестановка
     * @param {string} text 
     * @param {number[]} colsKey 
     * @param {number[]} rowsKey 
     * @returns {string}
     */
    static doublePermutation(text, colsKey, rowsKey) {
        let result = this.singlePermutation(text, colsKey);
        result = this.simplePermutation(result, colsKey.length);
        result = this.singlePermutation(result, rowsKey);
        return this.simplePermutation(result, rowsKey.length);
    }

    /**
     * Получить массив индексов, определяющих порядок >= над элементами
     * @param {any[]} arr 
     * @returns {number[]}
     */
    static getNormilizedKey(arr, type) {
        let sortedKey;
        switch (type) {
            case 'STRING_ARRAY':
                sortedKey = [...arr].sort((a, b) => a >= b);
                break;
            case 'NUMBER_ARRAY':
                sortedKey = [...arr].sort((a, b) => a - b);
                break;
            default:
                throw new Error('Неизвестный тип для нормализации');
        }
        return arr.map(e => sortedKey.indexOf(e));
    }

    /**
     * Шифрование магическими квадратами
     * @param {string} key 
     * @param {number[]} square 
     * @returns {string}
     */
    static magicSquare(text, square) {
        console.assert(text.length == square.length);
        
        let result = [];
        square.forEach((v, idx) => result[idx] = text[v]);
        return result.join('');
    }

    /**
     * Шифр Плейфера
     * @param {string} text 
     * @param {string} key
     * @returns {string} 
     */
    static playfair(text, key) {
        //реализация для матрицы 8x4 русского алфавита
        let result = [...text];
        for (let i = 1; i < result.length; ) {
            if (result[i] == result[i - 1])
                result.splice(i, 0, 'Х');
            i += 2;
        }

        if (result.length % 2 !== 0)
            result.push('X');
        
        for (let i of _.range(0, text.length, 2)) 
            [result[i], result[i + 1]] = this.playfairProcess(result[i], result[i + 1], key);

        return result.join('');  
    }

    /**
     * Вспомогательный метод для шифра Плейфера
     * @param {string} a 
     * @param {string} b 
     * @param {string} key 
     * @returns {string[]} 
     */
    static playfairProcess(a, b, key) {
        let [aidx, bidx] = [key.indexOf(a), key.indexOf(b)];
        let [ai, aj] = [aidx / 8 | 0, aidx % 8];
        let [bi, bj] = [bidx / 8 | 0, bidx % 8];

        if (ai == bi) 
            return [key[ai * 8 + (aj + 1) % 5], key[bi * 8 + (bj + 1) % 5]];
        
        if (aj == bj)
            return [key[((ai + 1) % 5) * 8 + aj], key[((bi + 1) % 5) * 8 + bj]];   
            
        return [key[ai * 8 + bj], key[bi * 8 + ai]];
    }
}

module.exports = Ciphers;