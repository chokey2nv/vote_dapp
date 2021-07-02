import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import proposalContract from '../../utils/web3/proposalContract';
import { walletStrings, WALLET_REDUCER_NAME } from '../Infrastructures';
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        display : "flex",
        flexDirection : "column",
        justifyContent : 'center',
        alignItems : "center",
    },
    headerContainer : {
        display : "flex",
        flexDirection : "column",
        justifyContent : 'center',
        alignItems : "center",
    },
    header : {
        color : colors.textPrimary,
        fontSize : 32,
        fontWeight : "bold",
    },
    subheader : {
        fontSize : 14,
        color : colors.textDark
    },
    voteCount : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        marginTop : 50,
        color : colors.textDark,
        border : `solid 1px ${colors.primaryDark}`,
        borderRadius : 10,
        minWidth : 200,
        minHeight : 200,
        padding : 20,
    },
    countContainer : {
        display : "flex",
        alignItems : "flex-end",
        fontSize : 32
    },
    voteUp : {
        color : colors.textSuccess,
        fontSize : 48,
    },
    voteDown : {
    }
}))
export default function Vote () {
    const classes = style(),
        [state, _setState] = useState({
            votesForYes : 0, votesForNo : 0,
            voteFee : 0, votes : null,
            proposalId : null
        }),
        {votesForYes, votesForNo, proposalId, voteFee} = state,
        setState = _state => _setState(state=>({...state, ..._state})),
        address = useSelector(state=>state[WALLET_REDUCER_NAME][walletStrings.address]),
        getBlockData = async () => {
            const [voteFee, votesForYes, votesForNo, proposalId]  = 
                await Promise.all([
                    proposalContract().voteFee(),
                    proposalContract().votesForYes(),
                    proposalContract().votesForNo(),
                    proposalContract().proposalId(),
                ]);
            setState({voteFee, votesForYes, votesForNo, proposalId});
        };
    useEffect(() => {
        getBlockData();
    }, [address]);
    
    console.log(state)
    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <div className={classes.header}>Vote For Proposal</div>
                <div className={classes.subheader}>Let us know your position about this proposal (ID : {proposalId}) by voting!</div>
                <div className={classes.subheader}>You will require a token of {voteFee} ETH for this vote</div>
            </div>
            <div className={classes.voteCount}>
                <div className={classes.countContainer}>
                    <div className={classes.voteUp}>{votesForYes}</div>
                    {" / "}
                    <div className={classes.voteDown}>{votesForNo}</div>
                </div>
            </div>
        </div>
    )
}