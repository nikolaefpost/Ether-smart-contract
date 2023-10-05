const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'state among hammer glove twin elephant neutral twelve milk brown ignore chase',
    'https://goerli.infura.io/v3/8cbba53ed05940e2a557ee44f47f9212'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({
            data: '0x' + compiledFactory.evm.bytecode.object,
            // arguments: [INITIAL_STRING]
        })
        .send({
            from: accounts[0],
            gas: '4700000' // Specify the gas limit for deployment
        })


    console.log('Contract deploy to', result.options.address)
    provider.engine.stop();
}
deploy();