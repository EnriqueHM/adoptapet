const passport = require('passport');
// estrategia de autenticacion mas popular
const LocalStrategy = require('passport').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, next) {
    Usuario.findOne({email: email})
    .then( function(user) {
        if (!user || !user.validarPassword(password)){
            return next(null, false, {error: { 'email o contraseña': 'incorrecto(a)'}});
        }
        return next(null, user);
    })
    .catch(next)
}))