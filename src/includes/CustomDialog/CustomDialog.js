
import React, { PureComponent } from 'react'
import { withStyles, Dialog, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Close } from '@material-ui/icons';
const styles = theme => ({
    dialogPaper : {
    },
    close : {
        position : "fixed",
        top : 20,
        right : 20,
        zIndex : 1100
    },
    _close : {
        position : "absolute"
    }
})
class _CustomDialog extends PureComponent {
    render() {
        const {classes, children, open, close, within} = this.props;
        return (
            <Dialog classes={{paper : classNames("animated", "zoomIn", classes.dialogPaper)}} open={open}>
                {close && <IconButton 
                    className={classNames(classes.close, within ? classes._close : "")} 
                    onClick={close}>
                    <Close color="secondary"/>
                </IconButton>}
                {children}
            </Dialog>
        )
    }
}
_CustomDialog.propTypes = {
    classes : PropTypes.object.isRequired,
    open : PropTypes.bool.isRequired,
    close : PropTypes.func,
    within : PropTypes.bool,
}
export const CustomDialog = withStyles(styles)(_CustomDialog);
export {CustomDialog as default};