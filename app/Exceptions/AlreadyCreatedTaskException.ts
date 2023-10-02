import { Exception } from '@adonisjs/core/build/standalone'
export default class AlreadyCreatedTaskException extends Exception {
    constructor(message = 'Already created task', status = 409, code = 'E_VALIDATION_FAILURE') {
        super(message, status, code)
    }
}
