const {PublicResolver
} = require('@ensdomains/ens-contracts')

var addrSet = PublicResolver.contract.methods['setAddr(bytes32,address)'](node, accounts[1]).encodeABI();
console.log(addrSet);