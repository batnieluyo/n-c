const db = require("../../../models");

module.exports = {
    async index(req, res) {
        const status = await db.ShippingStatus.findAll({
            attributes: ['id', 'short_code','name', 'description']
        });
        return res.json(status);
    }
}