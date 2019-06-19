const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Pontus',
        email: 'pontus@example.com',
        password: 'MyPass1234!'
    }).expect(201)

    // Make sure the user was created
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Make sure that the correct data is returned when creating the user
    expect(response.body).toMatchObject({
        user: {
            name: 'Pontus',
            email: 'pontus@example.com'
        },
        token: user.tokens[0].token
    })

    // Make sure that the password was hashed correctly
    expect(user.password).not.toBe('MyPass1234!')

})

test('Should login existing user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Make sure that we get a new token back and it is stored in the database
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email: 'doesntexist@example.com',
        password: 'badpass'
    }).expect(400)
})

test('Should get profile for authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should delete account for authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        // Make sure the user is deleted properly
        const user = await User.findById(userOneId)
        expect(user).toBeNull()
})

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Roger'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Roger')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Gothenburg'
        })
        .expect(400)
})