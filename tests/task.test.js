const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')

const { 
    userOne, 
    userTwo, 
    taskOne, 
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create test for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From tests'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
    expect(task.owner).toEqual(userOne._id)
})

test('Should get tasks for authenticated user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body).toHaveLength(2)
})

test('Should not delete other users tasks', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`) // taskOne is owned by userOne
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`) // userTwo should not be able to delete it
        .send()
        .expect(404)

    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})