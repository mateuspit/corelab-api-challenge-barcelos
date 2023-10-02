import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ToDoList from 'App/Models/ToDoList'
import TaskValidator from 'App/Validators/TaskValidator'
import AlreadyCreatedTaskException from 'App/Exceptions/AlreadyCreatedTaskException'
import WrongFilterException from 'App/Exceptions/WrongFilterException'

export default class ToDoListsController {
    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(TaskValidator)

        const taskExists = await ToDoList.findBy('title', body.title)

        if (taskExists) throw new AlreadyCreatedTaskException()

        await ToDoList.create(body)

        response.created({ message: 'Task created successfully!' })
    }

    public async index() {
        const allTasks = await ToDoList.all()

        return {
            data: allTasks,
        }
    }

    public async show({ params, request }: HttpContextContract) {
        const { color } = request.qs()
        const isFavString = params.id

        const isFavBoolean =
            isFavString.toLowerCase(isFavString) === 'true' ||
            isFavString.toLowerCase(isFavString) === 'false'

        if (!isFavBoolean || !color) throw new WrongFilterException()

        let query = ToDoList.query().where('color', color)

        if (isFavBoolean) {
            query = query.where('is_fav', true)
        }

        const filteredTasks = await query

        return {
            data: filteredTasks,
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        const taskExists = await ToDoList.findByOrFail('id', params.id)

        await taskExists.delete()

        response.noContent()
    }

    public async update({ request, params, response }: HttpContextContract) {
        const taskExists = await ToDoList.findByOrFail('id', params.id)

        //conferir se existe

        const body = request.body()

        taskExists.title = body.title
        taskExists.text = body.text
        taskExists.is_fav = body.is_fav
        taskExists.color = body.color

        await taskExists.save()

        response.noContent()
    }
}
