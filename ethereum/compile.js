const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');


const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contracts = output.contracts['Campaign.sol'];
// console.log(contracts)

fs.ensureDirSync(buildPath)
for (let contractFileName in contracts){
    fs.outputFileSync(
        path.resolve(buildPath, contractFileName + '.json'),
        JSON.stringify(contracts[contractFileName], null, 2)
    )
}

// module.exports = contract;