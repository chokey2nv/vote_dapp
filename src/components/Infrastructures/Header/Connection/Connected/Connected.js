import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, withWidth } from '@material-ui/core'
import walletUtil from '../../../../../utils/web3/walletUtil'
import { errorToast, CustomButton } from '../../../../../includes';
import { WALLET_REDUCER_NAME, walletStrings } from '../../../wallet';
import { WALLET_KEYS } from '../../../../../utils';
const style = makeStyles(({breakpoints, colors}) => ({
    root : {
        display : 'flex',
        alignItems : "center",
        background : colors.success,
        borderRadius : 5,
    },
    amount_add_holder : {
        padding : 5,
        display : "flex",
        margin : "0px 5px",
        borderRadius : 5,
        alignItems : "center",
    }, 
    eth : {
        margin : "0 10px",
        background : "black",
        padding : 5,
        borderRadius : 5,
    },
    address : {
        display : "flex",
        alignItems : "center",
        padding : 10,
        borderRadius : 0,
        cursor : "pointer",
    },
    metamask_img : {
        height : 13,
        width : 13,
        [breakpoints.up("sm")] : {
            marginLeft : 5
        }
    },
    btn : {
        background : colors.black,
        boxShadow : "none",
        marginLeft : 10,
        "&:hover" : {
            background : colors.black,
        }
    }
}))
function _Connected({width, ...props}) {
    const [mainBalance, setMainBalance] = useState(0),
    dispatch = useDispatch(),
    walletReducer = useSelector(state=>state[WALLET_REDUCER_NAME]),
    {
        [walletStrings.address] : address,
        [walletStrings.contracts] : contracts,
        [walletStrings.networkType] : networkType,
        [walletStrings.networkWallet] : networkWallet
    } = walletReducer,
    classes = style();
    useEffect(()=>{
        (async() => {
            try{
                const balance = await walletUtil.getBalance();
                setMainBalance(balance);
            }catch({message}){
                errorToast(message)(dispatch);
            }
        })();
    }, [])
    const _symbol = networkType === WALLET_KEYS.BINANCE ? " BNB" : " ETH";
    return (
        <div className={classes.root}>
           <div className={classes.amount_add_holder}>
                <div className={classes.eth}>
                    {Number(mainBalance).toLocaleString()} 
                    {_symbol}
                </div>
                <div className={classes.address}>
                    {width !== "xs" && walletUtil.shortAddress(address)}
                    <img src={`/assets/${networkWallet === WALLET_KEYS.TRUSTWALLET ? "bnb" : "metamask"}.png`} className={classes.metamask_img}/>
                </div>
            </div>
            <CustomButton onClick={()=>walletUtil.disconnectUser()} classes={{
                btn : classes.btn
            }}>Disconnect</CustomButton>
        </div>
    )
}
_Connected.propTypes = {
    
}
export const Connected = withWidth()(_Connected);
export {Connected as default};