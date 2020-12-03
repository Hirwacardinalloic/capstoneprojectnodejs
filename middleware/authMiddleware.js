const jwt =require('jsonwebtoken');


module.exports = function (req, res, next) {
    
    const token = req.header('authorization');
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.send('Access denied');
            }else {
                console.log(decodedToken);

                next();

            }
        });

    }else {
        res.json({message: "you are not logged in"})
    }
}
