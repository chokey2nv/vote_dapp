export const customPopoverString = {
    popoverId : "popoverId",
    anchorEl : "anchorEl",
    options : "options",
    customListItem : "customListItem",
    customComponent : "customComponent",
    onCloseCallback : "onCloseCallback",
    props : "props",
    anchorOrigin : "anchorOrigin",
    classes : "classes",
}
export const initialState = {
    popoverId : null,
    anchorEl : null,
    options : null,
    customListItem : null,
    customComponent : null,
    onCloseCallback : null,
    props : null,
    anchorOrigin : "left",
    classes : null,
}
export const customPopoverConstant = {
    SET_CUSTOM_POPOVER : "SET_CUSTOM_POPOVER",
    SET_CUSTOM_POPOVER_CLOSE : "SET_CUSTOM_POPOVER_CLOSE",
}
export const customPopoverReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case customPopoverConstant.SET_CUSTOM_POPOVER : 
            return {...state, ...payload};
        case customPopoverConstant.SET_CUSTOM_POPOVER_CLOSE : 
            return {...state, ...initialState};
        default : return {...state};
    }
}
export const CUSTOM_POPOVER_REDUCER_NAME = "customPopoverReducer";