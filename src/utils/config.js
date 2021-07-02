/**
 * list of values that can changed by a reducer
 */
export const utilStrings = {
    processing : "processing",
    processMsg : "processMsg",
    processComponent : "processComponent",
    storageNetworkID : "storageNetworkID",
    storageNetworkType : "storageNetworkType",
    storageNetworkWallet : "storageNetworkWallet",
    refreshCount : "refreshCount",
}
/**
 * single reducer action type (modified architecture)
 */
export const utilConstants = {
    SET_UTILS : "SET_UTILS",
}
/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @returns Object 
 * @des This is a modified reducer with a singliton structure
 * it listen to only one type (change to state is done by only type),
 * the new variable being changed overrides the initial one
 * variables that be changed are already stated above in {utilStrings}
 */
export const utilReducer = (state={}, action) => {
    const {type, payload} = action;
    switch(type){
        case utilConstants.SET_UTILS : 
            return {...state, ...payload};
        default : return {...state};
    }
}
// using a name variable to avoid making mistakes when fetch state of this reducer 
// vscode automatically activate intelliscence 
export const UTIL_REDUCER_NAME = "utilReducer";
export {utilReducer as default};