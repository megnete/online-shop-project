function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.save(action);
}

<<<<<<< HEAD
module.exports = {createUserSession : createUserSession};
=======
function destroyUserAuthSession(req){
    req.session.uid = null;
}

module.exports = {createUserSession : createUserSession,
    destroyUserAuthSession : destroyUserAuthSession
};
>>>>>>> f4b623b (Initial commit)
