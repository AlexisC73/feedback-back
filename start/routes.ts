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
const AddFeedbacksController = () => import('#controllers/feedback/add_feedbacks_controller')
const GetFeedbacksController = () => import('#controllers/feedback/get_feedbacks_controller')
const EditFeedbacksController = () => import('#controllers/feedback/edit_feedbacks_controller')
const DeleteFeedbacksController = () => import('#controllers/feedback/delete_feedbacks_controller')
const UpvotesController = () => import('#controllers/feedback/upvotes_controller')
const CommentFeedbacksController = () =>
  import('#controllers/feedback/comment_feedbacks_controller')
const GetFeedbackCommentsController = () =>
  import('#controllers/feedback/get_feedback_comments_controller')
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

    router
      .group(() => {
        router.post('/', [AddFeedbacksController, 'handle'])
        router.get('/', [GetFeedbacksController, 'handle'])
        router.put('/:id', [EditFeedbacksController, 'handle'])
        router.delete('/:id', [DeleteFeedbacksController, 'handle'])
        router.post('/:id/upvote', [UpvotesController, 'handle'])
      })
      .prefix('/feedbacks')

    router
      .group(() => {
        router.post('/feedback/:id', [CommentFeedbacksController, 'handle'])
        router.get('/feedback/:id', [GetFeedbackCommentsController, 'handle'])
      })
      .prefix('/comments')
  })
  .prefix('/api')
