const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  app.get('/auth/google/callback', passport.authenticate('google'));
  
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/auth-or-not',checkAuthentication,function(req,res){
    //do something only if user is authenticated
  });

  app.get('/api/logout', (req, res) => {
    req.logOut();
    res.send(req.user);
  });
};

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //if user is looged in, req.isAuthenticated() will return true 
      console.log("authenticated")
      next();
  } else{
      res.redirect("/login");
  }
}
