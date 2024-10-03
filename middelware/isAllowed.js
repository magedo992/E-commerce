exports.isAllowed = (...roles) => {
  return (req, res, next) => {
      const { Role } = req.user;

     
      if (!roles.includes(Role)) {
        console.log(Role);
        
          return res.status(403).json({
              message: 'You are not allowed to access this route'
          });
      }

      next(); 
  };
};
