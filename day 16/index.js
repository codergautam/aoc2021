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
let neededLen = null;
let neededCnt = null;
let verCount = 0;
const removeAndReturn = length => {
    let slice = binary.slice(0, length);
    binary = binary.slice(length);

    return slice;
}

while (binary.length) {
    const version = bin2dec(removeAndReturn(3));
    const typeId = bin2dec(removeAndReturn(3));
    verCount += version;

    if (typeId === 4) { 
		//literal
        let isLastGroup = false;

        while (!isLastGroup) {
            let startsWith = removeAndReturn(1);

			//remove the numbers
			binary = binary.slice(4)
            isLastGroup = startsWith === '0';
        }
    } else { // operator
        const typeIdLength = removeAndReturn(1);
        if (typeIdLength === '0') {
            neededLen = bin2dec(removeAndReturn(15));
        } else {
            neededCnt = bin2dec(removeAndReturn(11));
        }
    }
}

console.log(verCount)