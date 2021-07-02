import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { WALLET_KEYS } from '../../../../../../utils'
import walletUtil from '../../../../../../utils/web3/walletUtil'
const style = makeStyles(theme => ({
    root : {
        background : theme.colors.background,
        padding : 10,
        // border : "solid 1px " + theme.colors.accent,
    },
    listItem : {
        borderRadius : 0,
        padding : 10,
        "&:hover" : {
            background : theme.colors.backgroundAccent
        },
        [theme.breakpoints.only("xs")] : {
            maxWidth : 300,
        },
    },
    list : {
        color : theme.colors.textSecondary,
        minWidth : 300,
        padding : 10,
    },
    icon : {
        width : 25,
        height : 25,
    },
    header : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        color : theme.colors.textSecondary,
        margin : 20,
    },
    iconBtn : {
        padding : 5
    },
    icon : {
        color : theme.colors.textSecondary,
    },
    divider : {
        background : theme.colors.textSecondary,
    },
    avatar : {
        width : 50,
        height : 50
    }
}))
function BinanceNetwork({web3, onSelect, onClose, ...props}) {
    const dispatch = useDispatch(),
    classes = style(),
    {getCurrentProvider, getWalletNames} = walletUtil || {};
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span>Connect to Binance Network</span>
                {onClose && <IconButton className={classes.iconBtn} onClick={onClose}>
                    <Close fontSize="small" className={classes.icon}/>
                </IconButton>}
            </div>
            <Divider className={classes.divider}/>
            <List>
                {[
                    {
                        _id : WALLET_KEYS.METAMASK, 
                        name : getWalletNames(getCurrentProvider(web3)),
                        avatar : `/assets/${getCurrentProvider(web3)}.png`},
                    {_id : WALLET_KEYS.TRUSTWALLET, name : "Binance (Browser Extension)", avatar : "/assets/binance.png"}
                ].map((wallet, index)=>{
                    const {_id, name, avatar} = wallet;
                    return <ListItem key={index} className={classes.listItem} button onClick={()=>onSelect && onSelect(_id)}>
                        <ListItemText secondary={name} secondaryTypographyProps={{
                            className : classes.list
                        }}/>
                        <ListItemIcon>
                            <img className={classes.avatar} src={avatar}/>
                        </ListItemIcon>
                    </ListItem>
                })}
            </List>
        </div>
    )
}
BinanceNetwork.propTypes = {
    onSelect : PropTypes.func,
    onClose : PropTypes.func,
}
export default BinanceNetwork;
export {BinanceNetwork};