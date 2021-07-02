import Web3 from 'web3'
import { WALLET_KEYS } from '../constants';
const resolveWeb3 = async (networkWallet) => {
    if(networkWallet === WALLET_KEYS.TRUSTWALLET){
        if(window.BinanceChain){
            const web3 = new Web3(window.BinanceChain);
            await window.BinanceChain.request({method: "eth_accounts"})
            return web3;
        } else throw new Error("Binance Extension not installed");
    }else {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Acccounts now exposed
                return web3;
            } catch (error) {
                console.error(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use Mist/MetaMask's provider.
            const web3 = window.web3;
            console.log('Injected web3 detected.');
            return web3;
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
          const web3 = new Web3(provider);
          console.log('No web3 instance injected, using Local web3.');
          return web3;
        }
    }
}

const getWeb3 = (networkWallet) =>
    new Promise(async (resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        try{
            window.addEventListener(`load`, async () => {
                try{
                    const web3 = await resolveWeb3(networkWallet);
                    resolve(web3);
                }catch(error){
                    console.log(error);
                    reject(error);
                }
            })
            // If document has loaded already, try to get Web3 immediately.
            if (document.readyState === `complete`) {
                const web3 = await resolveWeb3(networkWallet);
                resolve(web3);
            }
        }catch(error){
            reject(error);
        }
    })
export default getWeb3;
export {getWeb3};