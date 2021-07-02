//We are using combine reducer, so each reducer event has a name
//event/string  name for wallet reducer
export const walletConstant = {
    SET_WALLET : "SET_WALLET"
}
/**
 * Reducer pattern used for just state modification only
 * hence an object is always passed as the payload (key-value pair)
 * simplied the reduced switch actions
 * 
 * ===> this is the key for the payload objects
 */
export const walletStrings = {    
    address : "address",
    networkId : "networkId",
    networkWallet : "networkWallet",
    addresses : "addresses",
    web3 : "web3",
    contracts : "contracts",
    networkType : "networkType",
    giftContractAddress : "giftContractAddress",
}
/**
 * GENERAL REDUCER : To handle the common stuffs like notifications and alerts
 * @param {Object} state - the initial state of the wallet reducer
 * @param {action} action - contains the type and payload of the dispatch event
 */
export const walletReducer = (state={
    [walletStrings.balance] : 0
}, action) => {
    const {type, payload} = action;
    switch(type){
        case walletConstant.SET_WALLET : 
            return {...state, ...payload}
        default : return state;
    }
}
export const WALLET_REDUCER_NAME = "walletReducer";