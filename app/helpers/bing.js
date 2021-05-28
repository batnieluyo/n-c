const axios = require('axios');

const getDistance = async (origin, destination) => {
    try {
        return await axios.get("http://dev.virtualearth.net/REST/V1/Routes/Driving", {
            params: {
                'wayPoint.1': origin,
                'wayPoint.2': destination,
                'optimize': 'time',
                'avoid': 'highways',
                'maxSolutions': '1',
                'distanceUnit': 'km',
                'key': 'AjWGxy0-msXunJ66d1qQsRA8u2-JUWvBb8nfPrLQIQhOrmZ1e_XPQzvQZx1an3jd',
            }
        })
    } catch (error) {
        console.error(error)
    }
};

module.exports = getDistance;