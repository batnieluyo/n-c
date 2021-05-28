const getDistance = require('../../helpers/bing');

module.exports = {
    async index(req, res) {

        const origin = req.query.origin;
        const destination = req.query.destination;

        await getDistance(origin, destination).then(({ data }) => {
            return res.json(data);
        }).catch(error => {
            return res.status(422).json({
                message: "Ha ocurrido un problema en el API"
            });
        })
    }
}