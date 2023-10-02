import { Exception } from '@adonisjs/core/build/standalone'

export default class WrongFilterException extends Exception {
    constructor(message = 'Some filter is wrong', status = 400, code = 'E_FILTER_FAILURE') {
        super(message, status, code)
    }
}
