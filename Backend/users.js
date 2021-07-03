import bcrypt from 'bcryptjs';

export default [
   {
        name:'Qhizer Shareef',
        password: bcrypt.hashSync('123456',10),
        profile:'https://i.pinimg.com/75x75_RS/88/cc/dc/88ccdc5880e499426212fb42c1cce2a4.jpg',
        followers:[],
        email:'mrtobot085@gmail.com'
    },
    {
        name:'Qhizer Shareef 1',
        password: bcrypt.hashSync('123456',10),
        profile:'https://i.pinimg.com/75x75_RS/88/cc/dc/88ccdc5880e499426212fb42c1cce2a4.jpg',
        followers:[],
        email:'mrtobot084@gmail.com'
    },
    {
        name:'Qhizer Shareef 2',
        password: bcrypt.hashSync('123456',10),
        profile:'https://i.pinimg.com/75x75_RS/88/cc/dc/88ccdc5880e499426212fb42c1cce2a4.jpg',
        followers:[],
        email:'mrtobot082@gmail.com'
    },
    {
        name:'Qhizer Shareef 3',
        password: bcrypt.hashSync('123456',10),
        profile:'https://i.pinimg.com/75x75_RS/88/cc/dc/88ccdc5880e499426212fb42c1cce2a4.jpg',
        followers:[],
        email:'mrtobot083@gmail.com',
        pinsCollection:[{...pinId,collectionBoard:'boardName'}],
        boards:[]
    }
]