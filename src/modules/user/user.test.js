import * as UserService from './user';


test('login with valid email and password should pass',()=>{
    expect.assertions(1);
    return UserService.login('ap0011@zehntech.com','indore').then(data=>{
        expect(data).toEqual(expect.objectContaining({
         id: expect.any(Number),
             id: expect.any(Number),
             name: expect.any(String),
             role: expect.any(String),
             team_id: expect.any(String),
             email: expect.any(String),
             created_at: expect.any(String),
            updated_at: expect.any(String)
        }))
    }).catch(err=>console.log('test err '+JSON.stringify(err)))
})