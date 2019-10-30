// const expect =require('chai');
// const request=require('supertest');


// const app=require('../app');
// const con =require('../server/config/db_connection');

// describe('POST /user',()=>{
   
//     it('OK , registering the user',(done)=>{
//         request(app).post('/api/users/register')
//         .send({firstname:"melaku",lastname:"zegeye",email:"mele@gmail.com",username:"mele",password:"pwd",role:"professional"})
//         .then((res)=>{
//             const body=res.body;
//             expect(body).to.contain.property('_id');
//             expect(body).to.contain.property('username');
//             expect(body).to.contain.property('firstname');
//             expect(body).to.contain.property('lastname');
//             expect(body).to.contain.property('password');
//             expect(body).to.contain.property('email');
//             done();

//         })
//     })

//     it('Ok , get all the users',(done)=>{
//         request(app).get('/api/users')
//     })
// })