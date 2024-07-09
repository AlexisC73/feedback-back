/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/auth/registers_controller')
const LoginsController = () => import('#controllers/auth/login_controller')
const GetMeController = () => import('#controllers/auth/get_me_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [RegistersController, 'handle'])
        router.post('/login', [LoginsController, 'handle'])
        router.get('/me', [GetMeController, 'handle'])
      })
      .prefix('/auth')
  })
  .prefix('/api')
