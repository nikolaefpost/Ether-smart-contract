const ganache = require('ganache');
const {Web3} = require('web3');
const assert = require('assert');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({
            data: '0x' + compiledFactory.evm.bytecode.object,
        })
        .send({
            from: accounts[0],
            gas: '4700000' // Specify the gas limit for deployment
        })
        .on('receipt', function (receipt) {
            console.log('Contract deployed at address: ' + receipt.contractAddress);
        })
        .on('error', console.error);

    await factory.methods.createCampaign('100')
        .send({
            from: accounts[0],
            gas: '4700000' // Specify the gas limit for deployment
        });

    [campaignAddress] = await factory.methods.getDeployedCampaign().call();

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)


});

describe('Campaigns', () => {
    it('deploys a factory and campaign', () => {
        console.log(factory.options.address);
        assert.ok(factory.options.address); // Check if contract address exists.
        assert.ok(campaign.options.address); // Check if contract address exists.
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
         await campaign.methods.contribute().send({
             value: '200',
             from: accounts[1]
         });

         const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try{
            await campaign.methods.contribute().send({
                value: '50',
                from: accounts[2]
            });
            assert(false);
        }catch (err){
            assert(err)
        }
    });

    it('allows a manager to make a payment request', async () => {
        await campaign.methods.createRequest("Buy", 1000, accounts[1]).send({
            from: accounts[0],
            gas: '4700000'
        });

        const request = await campaign.methods.requests(0).call();
        assert.equal("Buy", request.description)
    });

    it('processes request', async () => {
        await campaign.methods.contribute().send({
            value: web3.utils.toWei('10', 'ether'),
            from: accounts[1]
        });


       await campaign.methods.createRequest("Buy 2", web3.utils.toWei('1', 'ether'), accounts[1]).send({
            from: accounts[0],
            gas: '4700000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '4700000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '4700000'
        })

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.toWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance)

        assert(balance > 94)
    });
});