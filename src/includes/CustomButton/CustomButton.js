import React from 'react'
import { Button, makeStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames';
import PropTypes from 'prop-types';
const style = ({colors}) => ({
    btn : {
        borderRadius : 5,
        color : colors.text,
    },
    small : {
        fontSize : 10,
        color : colors.text,
    },
    custom : {
        boxShadow : "5px 5px 2px " + colors?.accent,
        padding : "10px 40px",
        border : "solid 1px " + colors?.accent,
        background : colors?.secondary,
        color : colors?.accent,
        textTransform : "capitalize",
        fontWeight : "bold",    
        "&:hover" : {
            background : colors?.backgroundAccent,
            color : colors.text,
        }    
    },
    primary : {
        textTransform : "capitalize",
        background : colors.primary,
        color : colors.accent,
        paddingLeft : 20,
        paddingRight : 20,
        padding : "10px 40px",
        "&:hover" : {
            background : colors?.backgroundAccent,
            color : colors.textSecondary,
        } 
    },
    secondary : {
        textTransform : "capitalize",
        background : colors.secondary,
        color : colors.accent,
        paddingLeft : 20,
        paddingRight : 20,
        padding : "10px 40px",
        "&:hover" : {
            background : colors.secondary,
            color : colors.accent,
        } 
    },
    accent : {
        textTransform : "capitalize",
        background : colors.accent,
        color : colors.text,
        paddingLeft : 20,
        paddingRight : 20,
        padding : "10px 40px",
        "&:hover" : {
            background : colors?.backgroundAccent,
            color : colors.secondary,
        } 
    },
    background : {
        textTransform : "capitalize",
        background : colors.background,
        color : colors.textBackground,
        paddingLeft : 20,
        paddingRight : 20,
        padding : "10px 40px",
        "&:hover" : {
            background : colors?.background,
            color : colors.text,
        } 
    },
    danger : {
        textTransform : "capitalize",
        background : colors.backgroundDanger,
        color : colors.danger,
        paddingLeft : 20,
        paddingRight : 20,
        padding : "10px 40px",
        "&:hover" : {
            background : colors?.danger,
            color : colors.text,
        } 
    },
    fullWidth : {
        width : "100%",
    }
})
function _CustomButton({classes, children, type="primary", fullWidth, ...props}) {
    return <Button
        className={classNames(classes[type], fullWidth ? classes.fullWidth : "", classes.btn)}
        variant="contained"
        {...props}
    >
        {children}
    </Button>
}
_CustomButton.propTypes = {
    type : PropTypes.oneOf(["primary", "secondary", "custom", "danger"]),
    small : PropTypes.bool,
}
export const CustomButton = withStyles(style)(_CustomButton);
export {CustomButton as default};