const db = require("../../../models");
const ShippingCollection = require('../../helpers/shipping.collection');

module.exports = {
    async index(req, res) {

        const records = await db.Shipping.findAll({
            include: [db.ShippingStatus],
            order: [["id", "DESC"]]
        });

        await ShippingCollection(records)

        return res.json(records);
    },
    async store(req, res) {
        const body = req.body;
        const shipping = await db.Shipping.create({
            customer: body.customer,
            shippingStatusId: body.shipping_status_id,
            descript: body.description,
            originLat: body.origin.latitude,
            originLong: body.origin.longitude,
            currentLat: null,
            currentLong: null,
            endLat: body.destination.latitude,
            endLong: body.destination.longitude
        });

        res.status(201);

        return res.json(shipping);
    },
    async show(req, res) {
        const id = req.params.id;
        const record = await db.Shipping.findByPk(id, {
            include: [db.ShippingStatus]
        });

        return res.json(record);
    },
    async update(req, res) {
        const id = req.params.id;
        const body = req.body;
        const record = await db.Shipping.findByPk(id);

        record.customer = body.customer;
        record.shippingStatusId = body.shipping_status_id;
        record.descript = body.description;
        record.currentLat = body.transit.latitude;
        record.currentLong = body.transit.longitude;

        await record.save();
        await record.reload();

        return res.json(record);
    },
    async destroy(req, res) {
        const id = req.params.id;
        const record = await db.Shipping.findByPk(id);

        await record.destroy();

        return res.json();
    },
}