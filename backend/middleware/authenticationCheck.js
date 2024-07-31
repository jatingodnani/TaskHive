const { jwtvalidate } = require('../services/jwt.js');

function authenticatiionCheck(){
  return (req, res, next) => {
    let token;

   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'No Token found' });
    }

    try {
   
      const userpayload = jwtvalidate(token);
      req.user = userpayload;
      console.log('Authenticated User:', req.user);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
    console.log('AuthenticationCheck Working', req.user);
    next();
  };

}
module.exports = { authenticatiionCheck };
