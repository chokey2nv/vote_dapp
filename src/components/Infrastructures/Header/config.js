export const headerStrings = {
    showDashboard : "showDashboard",
}
export const headerConstants = {
    SET_GIFT_DAPP_DASHBOARD : "SET_GIFT_DAPP_DASHBOARD",
}
export const headerReducer = (state = {
    // [headerStrings.showDashboard] : false
}, action) => {
    const {type, payload} = action;
    switch(type){
        case headerConstants.SET_GIFT_DAPP_DASHBOARD : 
            return {...state, ...payload};
        default : return {...state};
    }
}
export const HEADER_REDUCER_NAME = "headerReducer";
export {headerReducer as default};