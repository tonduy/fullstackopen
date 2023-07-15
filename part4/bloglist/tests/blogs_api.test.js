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

describe('Part 4.8 blog list tests', () => {
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
})

describe('Part 4.9 blog list tests', () => {
  test('4.9 blog list tests, verify id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())

  })
})

describe('Part 4.10 blog list tests', () => {
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
})

describe('Part 4.11 blog list tests', () =>  {
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
})

describe('Part 4.12 blog list tests', () =>  {
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
})

describe('Part 4.13 blog list tests', () =>  {
  test('4.13 blog list tests, a blog can be deleted ', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToDeleteId = blogsInDb[0].id

    await api
      .delete('/api/blogs/' + blogToDeleteId)
      .expect(204)

    const blogsInDbAfterDeletion = await helper.blogsInDb()

    expect(blogsInDbAfterDeletion).toHaveLength(helper.initialBlogs.length - 1)

    const checkBlogIsDeletedArray = blogsInDbAfterDeletion.filter(blog => blog.id === blogToDeleteId)

    expect(checkBlogIsDeletedArray).toHaveLength(0)
  })

  test('4.13 blog list tests, two blogs can be deleted ', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToDeleteId1 = blogsInDb[0].id
    const blogToDeleteId2 = blogsInDb[1].id

    await api
      .delete('/api/blogs/' + blogToDeleteId1)
      .expect(204)

    await api
      .delete('/api/blogs/' + blogToDeleteId2)
      .expect(204)

    const blogsInDbAfterDeletion = await helper.blogsInDb()

    expect(blogsInDbAfterDeletion).toHaveLength(helper.initialBlogs.length - 2)

    const checkBlogIsDeletedArray1 = blogsInDbAfterDeletion.filter(blog => blog.id === blogToDeleteId1)
    const checkBlogIsDeletedArray2 = blogsInDbAfterDeletion.filter(blog => blog.id === blogToDeleteId2)

    expect(checkBlogIsDeletedArray1).toHaveLength(0)
    expect(checkBlogIsDeletedArray2).toHaveLength(0)
  })
})


describe('Part 4.14 blog list tests', () =>  {
  test('4.14 blog list tests, likes of a blog can be updated ', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToUpdateId = blogsInDb[0].id

    const updatedBlog = {
      likes: 200
    }

    await api
      .put('/api/blogs/' + blogToUpdateId)
      .send(updatedBlog)
      .expect(200)

    const blogsInDbAfterUpdate = await helper.blogsInDb()

    const checkBlogIsUpdated = blogsInDbAfterUpdate.filter(blog => blog.id === blogToUpdateId)

    expect(checkBlogIsUpdated[0].likes).toBe(200)
  })

  test('4.14 blog list tests, likes and title of a blog can be updated ', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToUpdateId = blogsInDb[0].id

    const updatedBlog = {
      likes: 200,
      title: 'New Blog'
    }

    await api
      .put('/api/blogs/' + blogToUpdateId)
      .send(updatedBlog)
      .expect(200)

    const blogsInDbAfterUpdate = await helper.blogsInDb()

    const checkBlogIsUpdated = blogsInDbAfterUpdate.filter(blog => blog.id === blogToUpdateId)

    expect(checkBlogIsUpdated[0].likes).toBe(200)
    expect(checkBlogIsUpdated[0].title).toBe('New Blog')
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})