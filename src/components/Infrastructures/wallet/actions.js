import { walletConstant } from "./config";
export const walletActions = payload => dispatch => dispatch({
    type : walletConstant.SET_WALLET,
    payload
});