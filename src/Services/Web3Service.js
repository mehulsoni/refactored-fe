import Web3 from 'web3';
import { DAI_CONTRACT, SEND_TOKEN_ABI } from '../Constants/AbiJsonConstant';

const EthereumTx = require('ethereumjs-tx').Transaction;

export const getMetaMaskProvider = () => {
    return window.web3.currentProvider;
};

export const verifyInjectedProvider = (check) => {
    return window.ethereum
        ? window.ethereum[check] || (window.web3 && window.web3.currentProvider)
            ? Web3.web3
                ? window.web3.currentProvider[check]
                : true
            : false
        : window.web3 && window.web3.currentProvider
        ? window.web3.currentProvider[check]
        : false;
};

export const getTransactionList = (web3Provider, address) => {
    const currentBlock = web3Provider.eth.blockNumber;
    let n = web3Provider.eth.getTransactionCount(address, currentBlock);
    let bal = web3Provider.eth.getBalance(address, currentBlock);
    const transactions = [[0, address, address, '102134234231300'.toString(10)]];
    for (let i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
        try {
            const block = web3Provider.eth.getBlock(i, true);
            if (block && block.transactions) {
                block.transactions.forEach(function (e) {
                    if (address == e.from) {
                        if (e.from != e.to) bal = bal.plus(e.value);
                        console.log(i, e.from, e.to, e.value.toString(10));
                        transactions.push([i, e.from, e.to, e.value.toString(10)]);
                        --n;
                    }
                    if (address == e.to) {
                        if (e.from != e.to) bal = bal.minus(e.value);
                        console.log(i, e.from, e.to, e.value.toString(10));
                        transactions.push([i, e.from, e.to, e.value.toString(10)]);
                    }
                });
            }
        } catch (e) {
            console.error('Error in block ' + i, e);
        }
    }
    return transactions;
};

export const isEnabled = async () => {
    window.ethereum.autoRefreshOnNetworkChange = false;
    try {
        return await window.ethereum.enable();
    } catch (e) {
        alert('User has denied account access to DApp...');
    }
};

export const listAccounts = (web3Provider, fn) => {
    try {
        function callback(error, result) {
            if (error) {
                console.log(error);
            } else {
                fn(result);
            }
        }
        web3Provider.eth.getAccounts(callback);
    } catch (e) {
        console.log('User has denied account access to DApp...');
    }
};

export const getAccountBalance = (web3Provider, address, fn) => {
    try {
        web3Provider.eth.getBalance(address, (err, balance) => {
            fn(web3Provider.utils.fromWei(balance, 'ether') + ' ETH');
        });
    } catch (e) {
        console.log('User has denied account access to DApp...');
    }
};

export const callBalanceOf = (web3Provider, _fromAddress, _toAddress) => {
    return new Promise(async (resolve, reject) => {
        const contract = new web3Provider.eth.Contract(DAI_CONTRACT, _toAddress);
        await contract.methods.balanceOf(_fromAddress).call((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const callTransferOf = (web3Provider, _fromAddress, _toAddress, value) => {
    return new Promise(async (resolve, reject) => {
        const contract = new web3Provider.eth.Contract(DAI_CONTRACT, _toAddress);
        await contract.methods.transfer(_fromAddress, value).call((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const signMessage = async (web3Provider, hash, account, fn) => {
    return await web3Provider.eth.sign(hash, account).then((message) => fn(message));
};

function createRawTx(
    _fromAddress,
    _toAddress,
    _transferAmount,
    count,
    contractAddress,
    contract,
    gasPriceGwei,
    gasLimit,
    web3,
) {
    const chainId = 3;
    const rawTransaction = {
        from: _fromAddress,
        nonce: '0x' + count.toString(16),
        gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
        gasLimit: web3.utils.toHex(gasLimit),
        to: contractAddress,
        value: '0x0',
        data: contract.methods.transfer(_toAddress, _transferAmount).encodeABI(),
        chainId: chainId,
    };
    return rawTransaction;
}

export const sendToken = async (
    web3Provider,
    _fromAccount,
    _toAccount,
    _transferAmount,
    _privateKey,
    _tokenAddress,
) => {
    const count = await web3Provider.eth.getTransactionCount(_fromAccount).catch(console.error);
    console.log(`num transactions so far: ${count}`);
    const contractAddress = _tokenAddress;
    const contract = new web3Provider.eth.Contract(SEND_TOKEN_ABI, contractAddress, {
        from: _fromAccount,
    });

    const gasPriceGwei = 3;
    const gasLimit = 3000000;
    const rawTransaction = createRawTx(
        _fromAccount,
        _toAccount,
        _transferAmount,
        count,
        contractAddress,
        contract,
        gasPriceGwei,
        gasLimit,
        web3Provider,
    );
    const privateKey = new Buffer(_privateKey, 'hex');
    const tx = new EthereumTx(rawTransaction);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    return web3Provider.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
};
