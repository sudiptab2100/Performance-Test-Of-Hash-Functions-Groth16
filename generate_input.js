const fs = require('fs');

function generateRandomArray(k) {
    let arr = [];
    for(let i = 0; i < k; i++) {
        let randomNum = BigInt('0x' + require('crypto').randomBytes(27).toString('hex'));
        arr.push(randomNum.toString());
    }
    return arr;
}

const nInputs = 2;
const arr = generateRandomArray(nInputs);
const data = {
    preImage: arr
};

fs.writeFileSync('input.json', JSON.stringify(data, null, 4));