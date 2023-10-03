import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
    Route.get('/health', async ({ response }) => {
        const report = await HealthCheck.getReport()
        return report.healthy ? response.ok(report) : response.badRequest(report)
    })

    Route.resource('/todolists', 'ToDoListsController').apiOnly()
}).prefix(`/api`)
