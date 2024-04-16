const fs = require('fs');

function generateRandomArray(k) {
    let arr = [];
    for(let i = 0; i < k; i++) {
        arr.push(Math.round(Math.random()));
    }
    return arr;
}

nBits = 512;
let arr = generateRandomArray(nBits);
let data = {
    preImage: arr
};

fs.writeFileSync('input.json', JSON.stringify(data, null, 4));