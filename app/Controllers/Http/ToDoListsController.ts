/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ToDoList from 'App/Models/ToDoList'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

//import { schema } from '@ioc:Adonis/Core/Validator'

export default class ToDoListsController {
    public async createTask({ request, response }: HttpContextContract) {
        //const taskSchema = schema.create({
        //    title: schema.string(),
        //    text: schema.string(),
        //    is_fav: schema.boolean(),
        //    color: schema.string(),
        //})

        //const body = request.body()
        const body = await request.validate(CreateTaskValidator)

        const createTask = await ToDoList.create(body)

        response.created()

        return {
            message: 'Task criada com sucesso',
            data: createTask,
        }
    }

    public async getAllTasks() {
        const allTasks = await ToDoList.all()

        return {
            data: allTasks,
        }
    }

    public async getFiltredTasks({ params, request }: HttpContextContract) {
        const color = request.qs()
        const isFav = params
        //const isFav = params.favs === true
        console.log(color)
        console.log(isFav)

        //criar duas func
        //usar ternario
        //favs : comFav ? "semFav"
        if (isFav.favs === 'true') {
            const filtredTasks = await ToDoList.query()
                .where('is_fav', isFav.favs)
                .where('color', color.color)
            return {
                data: filtredTasks,
            }
        } else {
            const filtredTasks = await ToDoList.query().where('color', color.color)
            return {
                data: filtredTasks,
            }
        }
    }

    public async deleteTask({ params, response }: HttpContextContract) {
        const taskExists = await ToDoList.findByOrFail('id', params.id)

        await taskExists.delete()

        response.noContent()
    }

    public async editTask({ request, params, response }: HttpContextContract) {
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
