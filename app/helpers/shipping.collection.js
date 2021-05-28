const getDistance = require('./bing');

async function ShippingCollection(data) {

    const asyncRes = await Promise.all(data.map(async (model) => {
        let time = '00:00:00';
        let distance  = 'N/A';

        if (model.currentLat !== null) {
            const origin = `${model.currentLat},${model.currentLong}`;
            const destination = `${model.endLat},${model.endLong}`;
            const bing = await getDistance(origin, destination).then(({data}) => {
                data.resourceSets.map((item) => {
                    let resource = item.resources[0];
                    time = new Date(resource.travelDuration * 1000).toISOString().substr(11, 8);
                    distance = resource.travelDistance;
                });
                return data;
            });
        }

        model.setDataValue('time', time);
        model.setDataValue('distance', distance);

        return data;
    }));

}

module.exports = ShippingCollection;