import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import walletUtil from '../../../../../../utils/web3/walletUtil'
import { WALLET_KEYS } from '../../../../../../utils'
const style = makeStyles(theme => ({
    root : {
        background : theme.colors.background,
        padding : 10,
        // border : "solid 1px " + theme.colors.accent,
    },
    listItem : {
        borderRadius : 0,
        padding : 10,
        [theme.breakpoints.only("xs")] : {
            maxWidth : 300,
        },
        "&:hover" : {
            background : theme.colors.backgroundAccent
        }
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
    }
}))
function GiftDappEthereumWallets({web3, onSelect, onClose, ...props}) {
    const dispatch = useDispatch(),
    classes = style(),
    {getCurrentProvider, getWalletNames} = walletUtil || {};
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span>Connect to a wallet</span>
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
                        avatar : `/assets/${getCurrentProvider(web3)}.png`
                    },
                    // {_id : WALLET_KEYS.TRUSTWALLET, name : "Trust Wallet", avatar : "/assets/trustwallet.png"}
                ].map((wallet, index)=>{
                    const {_id, name, avatar} = wallet;
                    return <ListItem key={index} className={classes.listItem} button onClick={()=>onSelect && onSelect(_id)}>
                        <ListItemText secondary={name} secondaryTypographyProps={{
                            className : classes.list
                        }}/>
                        <ListItemIcon>
                            <img src={avatar}/>
                        </ListItemIcon>
                        {/* <ListItemSecondaryAction>
                            <img src={avatar}/>
                        </ListItemSecondaryAction> */}
                    </ListItem>
                })}
            </List>
        </div>
    )
}
GiftDappEthereumWallets.propTypes = {
    onSelect : PropTypes.func,
    onClose : PropTypes.func,
}
export default GiftDappEthereumWallets;
export {GiftDappEthereumWallets};