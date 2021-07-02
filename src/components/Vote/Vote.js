import { makeStyles } from '@material-ui/core'
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, errorToast } from '../../includes';
import proposalContract from '../../utils/web3/proposalContract';
import { walletStrings, WALLET_REDUCER_NAME } from '../Infrastructures';
import VoteDetails from './VoteDetails/VoteDetails';
import { CONTRACTS, VOTE_TYPES } from '../../utils';
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
    },
    btnContainer : {
        display : "flex",
        marginTop : 20,
    },
    voteBtn : {
        margin : 10,
        alignItems : "center",
    },
    icon : {
        marginRight : 5
    },
    btnNo : {
        color : colors.black
    }
}))
export default function Vote () {
    const classes = style(),
        dispatch = useDispatch(),
        [state, _setState] = useState({
            votesForYes : 0, votesForNo : 0,
            voteFee : 0, vote : null,
            proposalId : null
        }),
        {votesForYes, votesForNo, vote, proposalId, voteFee} = state,
        setState = _state => _setState(state=>({...state, ..._state})),
        address = useSelector(state=>state[WALLET_REDUCER_NAME][walletStrings.address]),
        contracts = useSelector(state=>state[WALLET_REDUCER_NAME][walletStrings.contracts]),
        {
            [CONTRACTS.PROPOSAL] : _contract
        } = contracts || {},
        getBlockData = async () => {
            const [voteFee, vote, votesForYes, votesForNo, proposalId]  = 
                await Promise.all([
                    proposalContract().voteFee(),
                    proposalContract().getVotes(),
                    proposalContract().votesForYes(),
                    proposalContract().votesForNo(),
                    proposalContract().proposalId(),
                ]);
            setState({voteFee, vote, votesForYes, votesForNo, proposalId});
        },
        voteProposal = useCallback(async (voteType)=>{
            if(vote !== "0") 
                return errorToast("You have already voted for this proposal!")(dispatch);
            await proposalContract().vote(voteType);
            getBlockData();
        }, [vote]);
        if(_contract) _contract.events.VoteCasted({})
        .on('data', function(event){
            getBlockData();
        })
        .on('error', console.error);
    useEffect(() => {
        getBlockData();
    }, [address]);
    
    console.log(state)
    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <div className={classes.header}>Vote For Proposal</div>
                <div className={classes.subheader}>Let us know your position about this proposal (ID : {proposalId}) by voting!</div>
                <div className={classes.subheader}>You will require a token of <strong>{voteFee || 0} ETH </strong>for this vote</div>
            </div>
            <div className={classes.voteCount}>
                <div className={classes.countContainer}>
                    <div className={classes.voteUp}>{votesForYes}</div>
                    {" / "}
                    <div className={classes.voteDown}>{votesForNo}</div>
                </div>
            </div>
            <div className={classes.btnContainer}>
                <CustomButton 
                    onClick={()=>voteProposal(VOTE_TYPES.YES)}
                    classes={{
                        btn : classes.voteBtn
                    }}
                >
                    <ThumbUp className={classNames(classes.icon, classes.btnYes)}/> YES
                </CustomButton>
                <CustomButton 
                    onClick={()=>voteProposal(VOTE_TYPES.NO)}
                    classes={{
                        btn : classNames(classes.voteBtn, classes.btnNo),
                    }}
                >
                    <ThumbDown className={classNames(classes.icon, classes.btnNo)}/> NO
                </CustomButton>
            </div>
            <VoteDetails
                {...state}
            />
        </div>
    )
}