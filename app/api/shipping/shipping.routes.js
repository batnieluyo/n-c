const Shipping = require("./shipping.controller");
const ShippingStatus = require("./shipping_status.controller");
const Distance = require("./distance.controller");

module.exports = (router) => {
    router.get('/api/shipping_statuses', ShippingStatus.index);
    router.get('/api/distance', Distance.index);

    router.get('/api/shipping', Shipping.index);
    router.post('/api/shipping', Shipping.store);
    router.get('/api/shipping/:id', Shipping.show);
    router.put('/api/shipping/:id', Shipping.update);
    router.delete('/api/shipping/:id', Shipping.destroy);
}