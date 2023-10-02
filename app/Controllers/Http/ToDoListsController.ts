import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ToDoList from 'App/Models/ToDoList'

export default class ToDoListsController {
    public async createTask({ request, response }: HttpContextContract) {
        const body = request.body()

        const task = await ToDoList.create(body)

        response.status(201)

        return {
            message: 'To do list criada com sucesso',
            data: task,
        }
    }
    //public async store({ request, response }: HttpContextContract) {
    //    return this.createTask({ request, response })
    //}

    public async getAllTasks() {
        const allTasks = await ToDoList.all()

        return {
            data: allTasks,
        }
    }
    //public async index({ request, response }: HttpContextContract) {
    //    return this.getAllTasks({ request, response })
    //}

    public async getAllFavsTasks() {
        const allFavsTasks = await ToDoList.query().where('is_fav', true)

        return {
            data: allFavsTasks,
        }
    }

    public async getFiltredTasks({ params, request }: HttpContextContract) {
        const color = request.qs()
        const isFav = params
        //const isFav = params.favs === true
        console.log(color)
        console.log(isFav)

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

        response.status(204)
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

        response.status(204)
    }
}
