import jwt  from 'jsonwebtoken';

function generateToken(playload, private_key){
    var token = jwt.sign(playload, private_key);
    console.log("Encode JWT----->>>>");
    console.log(token);
    // return token

    var decode = jwt.verify(token,private_key);
    console.log("Decode JWT----->>>>");
    console.log(decode);
}
generateToken({ name: 'raja' },"code") 