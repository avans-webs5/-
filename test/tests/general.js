module.exports = function(app, passportStub, request, assert, should, expect){

    //let's set up the data we need to pass to the login method
    const adminCredentials = {
        email: 'admin@admin.com', 
        password: 'test123'
    }

    const userCredentials = {
        email: 'user@user.com', 
        password: 'test123'
    }

    // Login the user before running any tests
    var authenticatedAdmin = request.agent(app);
    var authenticatedUser = request.agent(app);

    before(function(done){
        authenticatedAdmin
          .post('/login')
          .send(adminCredentials)
          .end(function(err, response){
            expect('Location', '/');
            done();
        });
    });

    before(function(done){
        authenticatedUser
          .post('/login')
          .send(userCredentials)
          .end(function(err, response){
            expect('Location', '/');
            done();
        });
    });


    // Login
    describe('Login routes', function (done) {

        it('should return html', function (done) {
            request(app).get('/login')
            .expect('Content-Type', /html/)
            .expect(200, done);
        });
    });


    // Admin routes
    describe('GET /admin', function(done){
        
        it('should return a 200 response if the user is logged in', function(done){
            authenticatedAdmin.get('/admin')
            .expect(200, done);
        });
        
        it('should return a 401 response if the user is NOT logged in', function(done){
            request(app).get('/admin')
            .expect(401, done);
        });
    });

    // User routes
    describe('User routes', function(done){
        
        it('should return a 401 response when not logged in', function(done){
            request(app).get('/users')
            .expect(401, done);
          
        });
        
        it('should return a 200 response when logged in', function(done){
            authenticatedAdmin.get('/users/1/matches')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should be able to get your own profile as json', function (done) {
            authenticatedUser.get('/users/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should NOT be able to get someone elses profile', function (done) {
            authenticatedUser.get('/users/4')
                .expect('Content-Type', /json/)
                .expect(403, done);
        });

        it('should be able to get every profile as admin', function (done) {
            authenticatedAdmin.get('/users/6')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should create a user succesfully', function (done) {
            let newUser = {
                _id: 7,
                firstName: "Test",
                lastName: "Test",
                email: "test@avans.nl",
                password: "test123",
                profilePicture: "https://dailyanimeart.files.wordpress.com/2014/09/fairy-tail-401-happy-by-kurokawanao1.png",
                birthDate: "1999-11-11",
                study: "Software Engineering",
                studyYear: 3,
            }
            request(app).post('/users')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should edit a user succesfully', function (done) {
            let newUser = {
                password: "test123",
                profilePicture: "https://dailyanimeart.files.wordpress.com/2014/09/fairy-tail-401-happy-by-kurokawanao1.png",
                study: "Software Engineering Guap",
                studyYear: 3,
            }
            authenticatedAdmin.put('/users/7')
                .send(newUser)
                .expect('Content-Type', /json/)
                .expect({
                    "error": false,
                    "message": "Succesfully edited user."
                })
                .expect(200, done);
        });

        it('should delete a user succesfully', function (done) {
            authenticatedAdmin.delete('/users/7')
                .expect('Content-Type', /json/)
                .expect({
                    "n": 1,
                    "ok": 1,
                    "deletedCount": 1
                })
                .expect(200, done);
        });

    });

    // Match routes
    describe('Match routes', function(done){
       
        it('should return a 401 response when not logged in', function(done){
            request(app).get('/matches')
            .expect(401, done);
        });

        it('should return a 200 response when logged in as a admin', function(done){
            authenticatedAdmin.get('/matches')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should return a 403 forbidden response when logged in as a normal user', function(done){
            authenticatedUser.get('/matches')
            .expect(403, done);
        });

    });

    // Profile routes
    describe('Profile routes', function(done){
       
        it('should return a 200 response when logged in', function(done){
            authenticatedAdmin.get('/profile')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should return a success message when liking a user and matching him', function(done){
            let like = {
                user: 2
            }
            authenticatedAdmin.put('/profile/likes')
            .send(like)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({ error: false, isMatched: true, message: "Succesfully added like", with: 2 }, done);
        });

        it('should return an error message when liking a user that you have already liked', function (done) {
            let like = {
                user: 2
            }
            authenticatedAdmin.put('/profile/likes')
                .send(like)
                .expect('Content-Type', /json/)
                .expect(409)
                .expect({ error: true, message: "Already liked this person!" }, done);
        });

        it('should return a 200 response when disliking a user', function(done){
            let dislike = {
                user: 6
            }
            authenticatedAdmin.put('/profile/dislikes')
            .send(dislike)
            .expect('Content-Type', /json/)
            .expect(200, done);
        });


    });

}