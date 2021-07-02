import getWeb3 from "./getWeb3";
import { walletActions, walletStrings } from "../../components";
import { store } from "../../helpers";
import { errorToast, warningToast } from "../../includes";
import accountListeners, { binanceListeners } from "./accountListeners";
import getContracts from "./getContract";
import { utilStrings, UTIL_REDUCER_NAME } from "../config";
import contractAddresses from './addresses.json';
import walletUtil from "./walletUtil";
import { WALLET_KEYS } from "../constants";
export default async function walletConnection(networkWallet, callback){
    const dispatch = store.dispatch,
    ethereum = window.ethereum;
    try{        
        let web3 = await getWeb3(networkWallet),
        networkId = await web3.eth.net.getId();
        if(!walletUtil.isSupportedNetwork(parseInt(networkId))){
            return errorToast("Network not support for now! Supported Networks : RINKEBY")(dispatch);
        }
        const addresses = contractAddresses && contractAddresses[
            walletUtil.getTruffleNetworkName(networkId)
        ];
        console.log('*************************************** contract address ***********************************')
        console.log(addresses, contractAddresses)
        console.log('*************************************** contract address ***********************************')
        const accounts = await web3.eth.getAccounts(),
        contracts = await getContracts(web3, addresses),
        address = accounts && accounts[0];
        const utilReducer = store.getState()[UTIL_REDUCER_NAME],
        {
            [utilStrings.storageNetworkID] : storageNetworkID,
            [utilStrings.storageNetworkType] : storageNetworkType,
            [utilStrings.storageNetworkWallet] : storageNetworkWallet,
        } = utilReducer;    
        walletActions({
            [walletStrings.web3] : web3,
            [walletStrings.addresses] : addresses,
            [walletStrings.contractAddresses] : contractAddresses,
        })(dispatch);
        if(!address){
            if(ethereum){
                accounts = await ethereum.enable();
                // accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
                address = accounts && accounts[0];
            }
        }
        const networkType = walletUtil.ETHEREUM_NETWORK_IDS.indexOf(networkId) !== -1 ||
            (walletUtil.BINANCE_NETWORK_IDS.indexOf(networkId) === -1) /* if not binance it is development so default to ether */ ?
            WALLET_KEYS.ETHEREUM : WALLET_KEYS.BINANCE;
        walletActions({
            [walletStrings.address] : address,
            [walletStrings.contracts] : contracts,
            [walletStrings.networkId] : networkId,
            [walletStrings.networkType] : networkType,
            [walletStrings.networkWallet] : networkWallet,
            [walletStrings.hasRequestConn] : true,
        })(dispatch);
        localStorage.setItem(storageNetworkID, networkId);
        localStorage.setItem(storageNetworkType, networkType);
        localStorage.setItem(storageNetworkWallet, networkWallet);
        accountListeners();
        binanceListeners();
        callback && callback();
        return {web3, accounts, contracts};
    }catch(error){
        warningToast("Check network connection!")(dispatch);
        console.error(error);
        await walletUtil.disconnectUser();
        walletActions({
            [walletStrings.hasRequestConn] : true
        })(dispatch)
        callback && callback(error);
        return null;
    }
}