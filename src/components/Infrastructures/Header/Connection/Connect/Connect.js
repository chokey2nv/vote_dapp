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
        [walletStrings.contractAddresses] : contractAddresses,
        [walletStrings.web3] : web3,
    } = walletReducer,
    closePopover = ()=>setState({anchorEl : null}),
    listAction = useCallback(networkType => {
        closePopover();
        setState({openDialog : true, dialogType : networkType});
    }, []),
    connectToWallet = useCallback(wallet => {
        (async () => {
            let networkType;
            if(wallet === WALLET_KEYS.TRUSTWALLET)
                networkType = WALLET_KEYS.BINANCE;
            else networkType = WALLET_KEYS.ETHEREUM;
            await walletConnection(wallet)
            setState({dialogType : wallet})
        })();
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
                onClick={({target : _anchorEl})=>{
                    while(String(_anchorEl.tagName).toUpperCase() !== "BUTTON")
                        _anchorEl = _anchorEl.parentElement
                    setState({anchorEl : anchorEl ? null : _anchorEl})
                }}
                active={Boolean(anchorEl)}
            >
                Connect
            </CustomButton>
            <CustomPopover
                onClose={closePopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                    horizontal : "left",
                }}
            >
                <List>
                    {[
                        // {_id : WALLET_KEYS.BINANCE, name : "Binance Smart Chain Network", avatar : "/assets/bnb.png"},
                        {_id : WALLET_KEYS.ETHEREUM, name : "Ethereum Network", avatar : "/assets/eth.png"},
                    ].map((network, index)=>{
                        const {_id, name, avatar} = network;
                        return <ListItem className={classes.list} key={index} button onClick={()=> listAction(_id)}>
                            <ListItemAvatar>
                                <img src={avatar}/>
                            </ListItemAvatar>
                            <ListItemText secondary={name} secondaryTypographyProps={{
                                className: classes.list
                            }}/>
                        </ListItem>
                    })}
                </List>
            </CustomPopover>
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