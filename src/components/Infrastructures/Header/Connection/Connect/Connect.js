import React, { useCallback, useState } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton, CustomDialog,  CustomPopover, successToast } from '../../../../../includes'
import EthereumNetwork from './EthereumNetwork/EthereumNetwork'
import { WALLET_REDUCER_NAME, walletStrings } from '../../../wallet'
import { BinanceNetwork } from './BinanceNetwork'
import ConnectionProgress from './ConnectionProgress/ConnectionProgress'
import walletConnection from '../../../../../utils/web3/walletConnection'
import { WALLET_KEYS } from '../../../../../utils'
const style = makeStyles(({colors}) => ({
    root : {
        display : "flex",
        alignItems : "center",
    },
    eth : {
        margin: "0px 5px",
        padding: 13,
        borderRadius : 5,
        color : colors.textDark,
    },
    list : {
        color : colors.textSecondary,
        "&:hover" : {
            background : colors.backgroundAccent,
        }
    },
    
    dialogPaper : {
        background : colors.background,
        border : "solid 1px " + colors.accentSecondary,
        color : colors.text,
        overflow : "visible",
    },
    dialogClose : {
        background : colors.text,
        top : -40,
        padding : 5,
        "&:hover" : {
            background : colors.accent,
            color : colors.textSecondary
        }
    },
    btn : {
        borderRadius : 5,
        color : colors.text
    }
}))
function Connect() {
    const classes = style(),
    dispatch = useDispatch(),
    [state, _setState] = useState({
        anchorEl : null, openDialog : false, dialogType : "",
    }),
    {anchorEl, openDialog, dialogType} = state,
    setState = (_state, callback) => _setState(state=>({...state, ..._state}), callback),
    walletReducer = useSelector(state => state[WALLET_REDUCER_NAME]),
    {
        [walletStrings.web3] : web3,
    } = walletReducer,
    closePopover = ()=>setState({anchorEl : null}),
    listAction = useCallback(networkType => {
        closePopover();
        setState({openDialog : true, dialogType : networkType});
    }, []),
    connectToWallet = useCallback(async wallet => {
        await walletConnection(wallet)
        setState({dialogType : wallet})
    }, []),
    closeDialog = () => {
        setState({dialogType : "", openDialog : false});
    }
    return (
        <div className={classes.root}>
            <div className={classes.eth}>0 ETH</div>
            <CustomButton
                classes={{
                    btn : classes.btn
                }}
                onClick={() => listAction(WALLET_KEYS.ETHEREUM)}
            >
                Connect
            </CustomButton>
            <CustomDialog
                within
                classes={{
                    dialogPaper : classes.dialogPaper,
                    _close : classes.dialogClose,
                }}
                open={openDialog}
                close={closeDialog}
            >
                {dialogType === WALLET_KEYS.ETHEREUM && <EthereumNetwork
                    onSelect={connectToWallet}
                />}
                {dialogType === WALLET_KEYS.BINANCE && <BinanceNetwork
                    onSelect={connectToWallet}
                    web3={web3}
                />}
                {[WALLET_KEYS.METAMASK, WALLET_KEYS.TRUSTWALLET].indexOf(dialogType) !== -1 && <ConnectionProgress
                    wallet={dialogType}
                    web3={web3}
                />}
            </CustomDialog>
        </div> 
    )
}
Connect.propTypes = {
    
}
export default Connect;
export {Connect};