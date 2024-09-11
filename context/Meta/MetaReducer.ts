import ACTIONS from './MetaActions';

export const MetaReducer = (state:any, action:any) => {
    const { type, payload, key } = action;

    switch (type) {
        case ACTIONS.INITIAL_VALUE:  
            return {
                ...payload
            }        
        case ACTIONS.ADD_ITEM:  
            return {
                ...state,
                [key]: payload
            }        
        case ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                [key]: payload
            }     
        case ACTIONS.CLEAR:
            return {
                ...state,
                [key]: payload
            }     
        default:
            return state

    }
}