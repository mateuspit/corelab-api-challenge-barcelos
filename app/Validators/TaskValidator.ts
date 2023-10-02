import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateTaskValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        title: schema.string(),
        text: schema.string(),
        is_fav: schema.boolean(),
        color: schema.string(),
    })
    public messages: CustomMessages = {}
}
export class UpdateTaskValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        title: schema.string.optional(),
        text: schema.string.optional(),
        is_fav: schema.boolean.optional(),
        color: schema.string.optional(),
    })
    public messages: CustomMessages = {}
}
