const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('4.8 blog list tests, blogs are returned in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('4.8 blog list tests, all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('4.9 blog list tests, verify id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => expect(blog.id).toBeDefined())

})

test('4.10 blog list tests, verify blog can be added ', async () => {
  const newBlog = {
    _id: '7a424bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

  const getNewBlogIds = blogsInDb.map(blog => blog.id)

  expect(getNewBlogIds).toContain(
    '7a424bc61b54a676234d17fc'
  )
})

test('4.11 blog list tests, verify likes are 0 if undefined ', async () => {
  const newBlog = {
    _id: '8a424bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

  const getNewBlogIds = blogsInDb.filter(blog => blog.id === newBlog._id)

  expect(getNewBlogIds[0].likes).toBe(
    0
  )
})

test('4.12 blog list tests, verify 400 error if title is missing ', async () => {
  const newBlog = {
    _id: '8a424bc51b54a676234d17fc',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('4.12 blog list tests, verify 400 error if url is missing ', async () => {
  const newBlog = {
    _id: '8a424bc51b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('4.12 blog list tests, verify 400 error if title and url are missing ', async () => {
  const newBlog = {
    _id: '8a424bc51b54a676234d17fc',
    author: 'Robert C. Martin',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})



afterAll(async () => {
  await mongoose.connection.close()
})