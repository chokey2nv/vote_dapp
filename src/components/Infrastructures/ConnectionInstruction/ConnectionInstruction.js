import { makeStyles } from '@material-ui/core'
import React from 'react'
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        background : colors.black,
        color : colors.text,
        borderRadius : 5,
        display : 'flex',
        justifyContent : 'center',
        padding : 50,
        flexDirection : "column",
        alignItems : "center",
        textAlign : "center",
        [breakpoints.down("sm")] : {
            padding : "50px 20px",
        }
    },
    header : {
        fontSize : 42,
        color : colors.primary,
    },
    subheader : {
        display : 'flex',
        alignItems : "center",
        marginTop : 20,
    },
}))
export default function ConnectionInstruction () {
    const classes = style();
    return (
        <div className={classes.root}>
            <div className={classes.header}>Proposal Vote Counter</div>
            <div className={classes.subheader}>
                Please connect to Rinkeby Test Network to participate in the proposal voting
            </div>
        </div>
    )
}