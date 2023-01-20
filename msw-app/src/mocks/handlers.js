import { rest } from 'msw'

/* 
  - Rest API request needs method, path, and a function that reruns the mocked response
  - Works exactly like Express Routers I've used in the backend

  rest.all intercepts all methods 
  Service Worker 
*/

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Sesssion authenticates user
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Sets status code
      ctx.status(200)
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    // Checks user authentication
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized'
        })
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json({ username: 'admin' })
    )
  })
]