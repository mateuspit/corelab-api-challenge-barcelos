/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ToDoList from 'App/Models/ToDoList'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

export default class ToDoListsController {
    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(CreateTaskValidator)

        const createTask = await ToDoList.create(body)

        response.created()

        return {
            message: 'Task criada com sucesso',
            data: createTask,
        }
    }

    public async index() {
        const allTasks = await ToDoList.all()

        return {
            data: allTasks,
        }
    }

    public async show({ params, request }: HttpContextContract) {
        const { color } = request.qs()
        const favs = params.id
        console.log(color)
        console.log(favs)

        //criar duas func
        //usar ternario
        //favs : comFav ? "semFav"
        if (favs === 'true') {
            const filtredTasks = await ToDoList.query()
                .where('is_fav', favs)
                .where('color', color)
            return {
                data: filtredTasks,
            }
        } else {
            const filtredTasks = await ToDoList.query().where('color', color)
            return {
                data: filtredTasks,
            }
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
