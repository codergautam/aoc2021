var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
//convert hex to binary
var hex2bin = data => data.split('').map(i => 
	parseInt(i, 16).toString(2).padStart(4, '0')).join('');

	//bin to dec
	var bin2dec = data => parseInt(data, 2);

var binary = hex2bin(readFileLines());
const meaning = (typeId = 0, values = []) => {
    switch (typeId) {
        case 0: return values.reduce((sum, x) => sum + x);
        case 1: return values.reduce((sum, x) => sum * x);
        case 2: return Math.min(...values);
        case 3: return Math.max(...values);
        case 5: return (values[0] > values[1]) ? 1 : 0;
        case 6: return (values[0] < values[1]) ? 1 : 0;
        case 7: return (values[0] === values[1]) ? 1 : 0;
    }
}

const removeAndReturn = length => {
    const slice = binary.slice(0, length);
    binary = binary.slice(length);
    return slice;
}

const calc = () => {
    //remove the version not needed
    binary = binary.slice(3)
    //type id
    const typeId = bin2dec(removeAndReturn(3));

    if (typeId === 4) { // literal value
        let isLastGroup = false;
        let num = '';

        while (!isLastGroup) {
            const startsWith = removeAndReturn(1);
            num += removeAndReturn(4);
            isLastGroup = startsWith === '0';
        }
        //remove the values, and return it so it can be used to find to calculate
        return bin2dec(num);
    } else { // operator
        //remove typeid and return it
        const typeIdLength = removeAndReturn(1);
        //array of subpackets
        const values = [];

        if (typeIdLength === '0') {
            //remove the 15 bits
            let remaining = bin2dec(removeAndReturn(15));

            while (remaining > 0) {
                const curSize = binary.length;

                //calculate all tree values
                values.push(calc());
                remaining -= curSize - binary.length;
            }
        } else {
            //same thing but for typeid 11 
            const length = bin2dec(removeAndReturn(11));
            for (let i = 0; i < length; i++) values.push(calc());
        }

        return meaning(typeId, values);
    }
}

console.log(calc());