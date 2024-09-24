exports.isAllowed=(...Roles)=>
{
    return (req,res,next)=>
    {
    if(!Roles.includes(req.user.Role))
    {
  return res.status(401).json({
    'message':'you not allowed to access this route'
 })
;
    }
    next();
    }

}