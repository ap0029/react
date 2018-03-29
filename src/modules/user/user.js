import * as axios from 'axios'

export const login =(email,password)=>{
    console.log("login");
return axios.post(BASE_URL+'user/login',{
    email:email,
    password:password
})
}

export const addUser =(name,email,password,role,technologyStack,team_id)=>{
    console.log("add user");
return axios.post(BASE_URL+'/user',{
    name:name,
    email:email,
    password:password,
    role:role,
    technology_stack:technologyStack,
    team_id:team_id
})
}

export const getUsers =(team_id)=>{
return axios.get(BASE_URL+'users?team_id='+team_id);
}

export const deleteUser =(user_id)=>{
return axios.delete(BASE_URL+'user/user_id');
}

export const editUser =(user)=>{
return axios.put(BASE_URL+'user',{
    user
});
}

export const BASE_URL = 'http://192.168.1.238/lead-crm/public/';