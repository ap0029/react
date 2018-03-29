import * as axios from 'axios'
import {BASE_URL} from '../user/user'


export const addTemplate =(lead)=>{
return axios.post(BASE_URL+'template',lead)
}

export const getTemplates =(team_id)=>{
return axios.get(BASE_URL+'templates?team_id='+team_id);
}

export const deleteTemplate =(lead)=>{
    lead.active = 'false';
return axios.put(BASE_URL+'template',lead);
}

export const updateTemplate =(lead)=>{
return axios.put(BASE_URL+'template',lead);
}

