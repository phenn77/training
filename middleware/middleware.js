const response = require('../lib/message');

const middleware = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');

            return response.error(res, message);
        }
    }
}

module.exports = middleware;