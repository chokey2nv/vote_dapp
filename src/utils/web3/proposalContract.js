import { walletStrings, WALLET_REDUCER_NAME } from "../../components";
import { store } from "../../helpers";
import { CONTRACTS } from "../constants";

export default function proposalContract(instance){
    const {
        [WALLET_REDUCER_NAME] :  walletReducer
    } = store.getState() || {},
    {
        contracts,
        [walletStrings.address] : address,
    } = walletReducer || {};
    if(!instance){
        const {[CONTRACTS.PROPOSAL] : proposalContract} = contracts || {};
        instance = proposalContract;
    }
    const voteFee = () => instance?.methods?.VOTE_FEE().call();
    return {
        voteFee : async() => parseInt(await voteFee()) / (10 ** 18),
        getVotes : (userAddress) => instance?.methods?.getVote(userAddress || address).call(),
        vote : async (userAddress) => {
            return instance?.methods?.vote(userAddress).send({from : address, value : await voteFee()})
        },
        clean : async () => instance?.methods?.clean().call(),
        votesForYes : async () => instance?.methods?.votesForYes().call(),
        votesForNo : async () => instance?.methods?.votesForNo().call(),
        proposalId : async () => instance?.methods?.proposalId().call(),
    }
}