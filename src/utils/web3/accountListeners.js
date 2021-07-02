import { walletStrings } from "../../components";
import { WALLET_REDUCER_NAME } from "../../components/Infrastructures/wallet/config";
import { store } from "../../helpers";
import { successToast, warningToast } from "../../includes";
import { utilStrings, UTIL_REDUCER_NAME } from "../config";
import { WALLET_KEYS } from "../constants";
import walletConnection from "./walletConnection";
import walletUtil from "./walletUtil";
function binanceListeners() {
    const BinanceChain = window.BinanceChain;
    if(!BinanceChain) return null;
    const dispatch = store.dispatch;
    BinanceChain.on("connect", (...args) => successToast("Connected!")(dispatch))
    BinanceChain.on('chainChanged', (chainId)=>{
        const walletReducer = store.getState()[WALLET_REDUCER_NAME],
        {
            [walletStrings.networkWallet] : networkWallet,
        } = walletReducer;
        if(networkWallet !== WALLET_KEYS.TRUSTWALLET) {
            return warningToast(
                `You are not connect to binance wallet, 
                disconnect and connect using binance!`
            )(dispatch)
        }
        window.location.reload()
    });
    BinanceChain.on('accountsChanged', async (accounts)=>{
        const walletReducer = store.getState()[WALLET_REDUCER_NAME],
        {
            [walletStrings.address] : address,
            [walletStrings.networkWallet] : networkWallet,
            [walletStrings.contractAddresses] : contractAddresses
        } = walletReducer;
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            warningToast('Account disconnection, Please connect to MetaMask.')(dispatch);
            walletUtil.disconnectUser();
        } else if(networkWallet !== WALLET_KEYS.TRUSTWALLET) {
            return warningToast(
                `You are not connect to binance wallet, 
                disconnect and connect using binance!`
            )(dispatch)
        } else if (accounts[0] !== address) {
            const utilReducer = store.getState()[UTIL_REDUCER_NAME],
            {
                [utilStrings.storageNetworkWallet] : storageNetworkWallet
            } = utilReducer,
            networkWallet = localStorage.getItem(storageNetworkWallet);
            walletConnection(contractAddresses, networkWallet)
            .then(()=>successToast("Connected to new account!")(dispatch));
        }
    });
    BinanceChain.on('disconnect', (...error) => {
        if(error) console.log(error);
        walletUtil.disconnectUser();
    });
}
function accountListeners(){
    const ethereum = window.ethereum;
    if(!ethereum) return null;
    const dispatch = store.dispatch;
    ethereum.on("connect", (...args) => successToast("Connected!")(dispatch))
    ethereum.on('chainChanged', (chainId)=>{
        const walletReducer = store.getState()[WALLET_REDUCER_NAME],
        {
            [walletStrings.networkWallet] : networkWallet,
        } = walletReducer;
        if(networkWallet !== WALLET_KEYS.METAMASK) {
            return warningToast(
                `You are not connect to metamask wallet, 
                disconnect and connect using metamask!`
            )(dispatch)
        }
        window.location.reload()
    });
    ethereum.on('accountsChanged', async (accounts)=>{
        const walletReducer = store.getState()[WALLET_REDUCER_NAME],
        {
            [walletStrings.address] : address,
            [walletStrings.networkWallet] : networkWallet,
            [walletStrings.contractAddresses] : contractAddresses
        } = walletReducer;
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            warningToast('Account disconnection, Please connect to MetaMask.')(dispatch);
            walletUtil.disconnectUser();
        } else if(networkWallet !== WALLET_KEYS.METAMASK) {
            return warningToast(
                `You are not connect to metamask wallet, 
                disconnect and connect using metamask!`
            )(dispatch)
        } else if (accounts[0] !== address) {
            const utilReducer = store.getState()[UTIL_REDUCER_NAME],
            {
                [utilStrings.storageNetworkWallet] : storageNetworkWallet
            } = utilReducer,
            networkWallet = localStorage.getItem(storageNetworkWallet);
            walletConnection(contractAddresses, networkWallet)
            .then(()=>successToast("Connected to new account!")(dispatch));
        }
    });
    ethereum.on('disconnect', (...error) => {
        if(error) console.log(error);
        walletUtil.disconnectUser();
    });
}
export default accountListeners;
export {accountListeners, binanceListeners};