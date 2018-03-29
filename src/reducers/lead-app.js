import * as actionType from '../actions/action'

const leadApp = (state,action)=>{
        state=Object.assign(state||{},getState());
    switch(action.type){
        case actionType.LOGGEDIN:
            setState({user:action.payload})
            return Object.assign({},state,{user:action.payload});
        case actionType.LOGOUT:
            setState({user:undefined})
            return Object.assign({},state,{user:undefined});
        default :
            return state
    }
}

const getState=()=>{
    return JSON.parse(window.localStorage.getItem('$LEAD_CRM_DATA'));
}

const setState=(nData)=>{
    let data = Object.assign(getState()||{},nData);
    window.localStorage.setItem('$LEAD_CRM_DATA',JSON.stringify(data))
}

export default leadApp