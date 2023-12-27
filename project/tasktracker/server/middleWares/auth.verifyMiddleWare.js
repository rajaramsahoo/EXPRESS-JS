import jwt from 'jsonwebtoken';
const private_key = "code"


function middleWare(req, res, next) {
    try {
        // console.log(req.headers.authorization);
        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        let decode = jwt.verify(token, private_key);
        // console.log(decode) ;
        req.payload = decode;
        // console.log(req.payload);
        // res.status(200).send("working");
         next ()
    }
    catch (err) {
        console.log(err);
        return res.status(404).send("unAuthorized person")
    }

}

export default middleWare