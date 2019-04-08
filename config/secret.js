module.exports = {
    
    JWTsecret: 'beepboopgetyoasswooped',
    facebookAuth: {
         clientID: '400566127408430',
         clientSecret: '054233186b7829e9586c88568f7c9ed7',
         callbackURL: 'http://localhost:3000/auth/facebook/callback',
         profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
         profileFields: ['id', 'email', 'first_name', 'last_name']
     },
 
     googleAuth: {
         clientID: '1028713385581-bcaimms307pqtjgkcn4gn0qciiccdfju.apps.googleusercontent.com',
         clientSecret: 'o2bX1VwNoXabgnmneXe5wJ8e',
         callbackURL: 'http://localhost:3000/auth/google/callback'
     }
 
 }