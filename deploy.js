const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'flee taste element vacuum airport parade forest dice ball among live master',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/dd221a6cddee4c6898cecc9fa801be33'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async function() {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
