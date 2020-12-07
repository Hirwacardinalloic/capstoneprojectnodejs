const jwt =require('jsonwebtoken');
require('dotenv').config();


function requireAuth(req, res, next) {
  
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token==null)
          res.status(401).send({message:'Login first'});
        jwt.verify(token, process.env.SECRET_KEY, (err, user_id)=>{
          if(err)
            res.status(403).send('Provide a valid token');
          
          next();
          
        });
       
}

module.exports = requireAuth;
