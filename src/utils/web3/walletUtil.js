import { walletActions, walletStrings } from '../../components';
import { store } from '../../helpers';
import { utilStrings, UTIL_REDUCER_NAME } from '../config';

const walletUtil = {
    disconnectUser : async () => {
        const utilReducer = store.getState()[UTIL_REDUCER_NAME],
        {
            [utilStrings.storageNetworkID] : storageNetworkID,
            [utilStrings.storageNetworkType] : storageNetworkType,
            [utilStrings.storageNetworkWallet] : storageNetworkWallet,
        } = utilReducer;
        localStorage.removeItem(storageNetworkID);
        localStorage.removeItem(storageNetworkType);
        localStorage.removeItem(storageNetworkWallet);
        walletActions({
            [walletStrings.address] : null,
            [walletStrings.web3] : null,
            [walletStrings.contracts] : null,
            [walletStrings.networkId] : null,
            [walletStrings.networkType] : null,
            [walletStrings.networkWallet] : null,
        })(store.dispatch);
        window.location.reload();
    },
    shortAddress : address => {
        if(!address) return "...";
        return String(address).substr(0, 4) +
            "..." +
        String(address).substr(address.length - 4, 4)
    },
    getAccounts : async () => {
        return await window.ethereum?.request({ method : "eth_requestAccounts"});
    }, 
    getChainId : async () => {
        return await window.ethereum.request({ method: 'eth_chainId' });
    }, 
    getBalance : async () => {
        const {walletReducer} = store.getState(),
        {
            [walletStrings.web3] : web3,
            [walletStrings.address] : address,
        } = walletReducer;
        const balance =  web3 && await web3.eth.getBalance(address);
        return balance / 10 ** 18;
    },
    SUPPORTED_NETWOR_IDS : [
        3,4
    ],
    ETHEREUM_NETWORK_IDS : [
        1,3,4,
    ],
    BINANCE_NETWORK_IDS : [
        97,56
    ],
    isSupportedNetwork : (networkId) => {
        return walletUtil.SUPPORTED_NETWOR_IDS.indexOf(networkId) !== -1 || (process.env.NODE_ENV === "development" && String(networkId).length >=13)
    },
    getNetNames : (networkId) => {
        switch(networkId) {
            case 1 : return "Ethereum Mainnet"; 
            case 3 : return "Ropsten Test Network";
            case 4 : return "Rinkeby Test Network";
            case 5 : return "Goerli Test Network";
            case 42 : return "Kovan Test Network";
            case 56 : return "Binance Smart Chain Network";
            case 97 : return "Binance Smart Chain Test Network";
            default : return "Unknown"
        }
    },
    NETWORK_NAMES : {
        MAIN : "main", 
        ROPSTEN : "ropsten",
        RINKEBY : "rinkeby",
        GOERLI : "goerli",
        KOVAN : "kovan",
        BSC : "bsc",
        BSC_TESTNET : "bsc_testnet",
        DEVELOPMENT : "development",
    },
    getTruffleNetworkName : (networkId) => {
        switch(networkId) {
            case 1 : return walletUtil.NETWORK_NAMES.MAIN;
            case 3 : return walletUtil.NETWORK_NAMES.ROPSTEN; 
            case 4 : return walletUtil.NETWORK_NAMES.RINKEBY;
            case 5 : return walletUtil.NETWORK_NAMES.GOERLI;
            case 42 : return walletUtil.NETWORK_NAMES.KOVAN;
            case 56 : return walletUtil.NETWORK_NAMES.BSC;
            case 97 : return walletUtil.NETWORK_NAMES.BSC_TESTNET;
            default : return walletUtil.NETWORK_NAMES.DEVELOPMENT;
        }
    },
    WALLETS : {
        METAMASK : "metamask",
        TRUST_WALLET  : "trust",
        GO_WALLET : "goWallet",
        ALPHA_WALLET : "alphaWallet",
        STATUS : "status",
        COINBASE : "coinbase",
        CIPHER : "cipher",
        MIST : "mist",
        PARITY : "parity",
        INFURA : "infura",
        LOCAL_HOST : "wallet",
    },
    getWalletNames : (wallet) => walletUtil.walletNameMapping()[wallet],
    walletNameMapping : () => ({
        [walletUtil.WALLETS.METAMASK] : "Metamask",
        [walletUtil.WALLETS.TRUST_WALLET] : "Trust Wallet",
        [walletUtil.WALLETS.GO_WALLET] : "Go Wallet",
        [walletUtil.WALLETS.ALPHA_WALLET] : "Alpha Wallet",
        [walletUtil.WALLETS.STATUS] : "Status Wallet",
        [walletUtil.WALLETS.COINBASE] : "Coinbase Wallet",
        [walletUtil.WALLETS.CIPHER] : "Cipher Wallet",
        [walletUtil.WALLETS.MIST] : "Mist Wallet",
        [walletUtil.WALLETS.PARITY] : "Parity Wallet",
        [walletUtil.WALLETS.INFURA] : "Infura Wallet",
        [walletUtil.WALLETS.LOCAL_HOST] : "Local Wallet",
    }),
    getCurrentProvider : () => {
        const web3 = window.ethereum || window.web3;
        if(!web3) return "wallet";
        else if(web3?.isMetaMask)
            return walletUtil.WALLETS.METAMASK;
        else if(web3?.isTrust)
            return walletUtil.WALLETS.TRUST_WALLET;
        else if(web3?.isGoWallet)
            return walletUtil.WALLETS.GO_WALLET;
        else if(web3?.isAlphaWallet)
            return walletUtil.WALLETS.ALPHA_WALLET;
        else if(web3?.isStatus)
            return walletUtil.WALLETS.STATUS;
        else if(web3?.isToshi)
            return walletUtil.WALLETS.COINBASE;
        else if(typeof window.__CIPHER__ !== "undefined")
            return walletUtil.WALLETS.CIPHER;
        else if(web3.currentProvider?.currentProvider?.constructor?.name === "EthereumProvider")
            return walletUtil.WALLETS.PARITY;
        else if(web3.currentProvider?.currentProvider?.host?.indexOf("infura") !== -1)
            return walletUtil.WALLETS.INFURA;
        else if(web3.currentProvider?.currentProvider?.host?.indexOf("localhost") !== -1)
            return walletUtil.WALLETS.LOCAL_HOST;
    }
}
export default walletUtil;