import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import contractAddresses from '../../../utils/web3/addresses.json';
import walletConnection from '../../../utils/web3/walletConnection';
import { errorToast } from '../../../includes';
import { utilStrings, UTIL_REDUCER_NAME } from '../../../utils/config';
import { utilActions } from '../../../utils';
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        
    }
}))
export default function Setup () {
    const dispatch = useDispatch(),
    classes = style(),
    utilReducer = useSelector(state=>state[UTIL_REDUCER_NAME]),
    {
        [utilStrings.processing] : processing,
        [utilStrings.processMsg] : processMsg,
    } = utilReducer,
    STORAGE_NETWORK_ID = "giftDappNetworkId",
    STORAGE_NETWORK_TYPE = "giftDappNetworkType",
    STORAGE_NETWORK_WALLET = "giftDappNetworkWallet";
    useEffect(() => {
        utilActions.payload({
            [utilStrings.storageNetworkID] : STORAGE_NETWORK_ID,
            [utilStrings.storageNetworkType] : STORAGE_NETWORK_TYPE,
            [utilStrings.storageNetworkWallet] : STORAGE_NETWORK_WALLET,
        })(dispatch);
        (async()=>{
            try{
                const networkWallet = localStorage.getItem(STORAGE_NETWORK_WALLET);
                //if there no networktype in the storage, don't login, allow use to choice network
                if(networkWallet){
                    walletConnection(contractAddresses, networkWallet, false)
                }
            }catch(error) {
                errorToast(error.message)(dispatch);
            }
            
        })();
    }, [])
    return (
        <div className={classes.root}>
            
        </div>
    )
}
export {Setup}