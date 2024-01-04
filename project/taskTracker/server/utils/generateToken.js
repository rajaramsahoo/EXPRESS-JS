import jwt  from 'jsonwebtoken';
const private_key = "code"

export default function generateToken(playload){
    var token = jwt.sign(playload, private_key);
    // console.log("Encode JWT----->>>>");
    // console.log(token);
    return token;
}
