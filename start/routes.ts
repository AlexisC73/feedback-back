/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/registers_controller')
const LoginsController = () => import('#controllers/login_controller')
const GetMeController = () => import('#controllers/get_me_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [RegistersController, 'handle'])
    router.post('/login', [LoginsController, 'handle'])
    router.get('/me', [GetMeController, 'handle'])
  })
  .prefix('/auth')
