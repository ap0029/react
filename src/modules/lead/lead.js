import * as axios from 'axios'
import {BASE_URL} from '../user/user'


export const addLead =(lead)=>{
return axios.post(BASE_URL+'lead',lead)
}

export const getLeads =(team_id)=>{
return axios.get(BASE_URL+'leads?team_id='+team_id);
}

export const deleteLead =(user_id)=>{
return axios.delete(BASE_URL+'user/user_id');
}

export const updateLead =(lead)=>{
return axios.put(BASE_URL+'lead',lead);
}

export const getChannels =(lead)=>{
return axios.get(BASE_URL+'channels');
}

export const getTechnologyStacks =(lead)=>{
return axios.get(BASE_URL+'technology_stacks');
}

export const getAssociates =(lead)=>{
return axios.get(BASE_URL+'associates');
}

export const getStatuses =(lead)=>{
return axios.get(BASE_URL+'statuses');
}

export const getBillingTypes =(lead)=>{
return axios.get(BASE_URL+'billing_types');
}

export const suggestTechnologyStacks =(lead)=>{
return axios.post(BASE_URL+'suggest_technology_stacks',lead);
}

export const suggestAssociates =(lead)=>{
  return axios.post(BASE_URL+'suggest_associates',lead);
}
