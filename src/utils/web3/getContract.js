import { store, listedTokenLabels, contractLabels } from "../../helpers"
import { errorToast, warningToast } from "../../includes";
import { walletActions, walletStrings } from "../../components";
import walletUtil from "./walletUtil";
import { CONTRACTS } from "../constants";
import PROPOSAL_ABI from "../abis/proposal.json";
export async function getContractInstance(web3, contractDefinition, address){ 
    const dispatch = store.dispatch;
    // get network ID and the deployed address
    try{
        let instance;
        //contract enters
        if(contractDefinition){
            const networkId = await web3.eth.net.getId();
            //address is always passed, just leaving this here
            if(!address)
                address = contractDefinition.networks[networkId].address;
            instance = new web3.eth.Contract(
                contractDefinition.abi,
                address
            )
        }else { 
            //eth.getCode(address)
            const networkId = await web3.eth.net.getId();
            const networkName = walletUtil.getTruffleNetworkName(networkId);
            // create the instance
            // const PROPOSAL_ABI = JSON.parse(
            //     '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');
            // const GIFT_ABI = require(`../../utils/abis/${networkName}/RigelGift.json`).abi;
            instance = new web3.eth.Contract(PROPOSAL_ABI, address);
        }
        return instance
    }catch(error){
        const {message} = error; 
        console.error(
            '*************** CONTRACT INSTANCE ERROR  ***************', 
            message
        );
        if(String(message).indexOf("address") !== -1) errorToast(
            "Address not found in the network. Ensure you have migrated your contract to this network"
        )(dispatch);
        else throw error;
    }
  }
function errorMessages(code){
    const dispatch = store.dispatch;
    switch(String(code)){
        case "-32603" : return "Network seems offline. ensure the network is setting are correct!";
        case "-32002" : return "Please check your metamask notification, for connection request";
        case "4001" : return "You canceled network connection... This will limit application function";
        default : 
            if(process.env.NODE_ENV === "development" && process.env.REACT_APP_NETWORK === "local"){
                // walletActions({
                //     [walletStrings.localNetworkSetup] : true
                // })(dispatch);
            }
            return "Check network connection!";
    }
}
async function getContracts(web3, addresses){
    const dispatch = store.dispatch;
    try{
        return {
            [CONTRACTS.PROPOSAL] : await getContractInstance(
                web3, 
                null, 
                addresses?.[CONTRACTS.PROPOSAL]
            ),
        }
    }catch({code, message}){
        warningToast(errorMessages(code))(dispatch);
        walletActions({
            [walletStrings.hasRequestConn] : true
        })(dispatch)
    }
}
  
export default getContracts;
  