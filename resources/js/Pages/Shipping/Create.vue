<template>
  <div class="p-8">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0 mb-8">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Programar nuevo envío</h3>

          <template v-if="legends.time !== ''">
            <p class="flex inline mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <polyline points="12 7 12 12 15 15"></polyline>
              </svg>
              <span class="ml-2">{{ legends.time}}, tiempo aproximado de entrega</span>
            </p>
            <p class="flex inline" :class="legends.distance > 20 ? 'text-red-500' : 'text-green-500'">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="11" r="3"></circle>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>
              <span class="ml-2">{{ legends.distance}} Kms</span>
            </p>
          </template>
        </div>

        <div id="mapid" class="w-full" style="height: 400px;"></div>
      </div>
      <div class="pt-5 sm:pt-16  md:col-span-2">
        <template v-if="legends.distance === ''">
          <p class="text-pink-600">Haz click en el mapa para indicar el destino</p>
        </template>
        <template v-else-if="legends.distance <= 20">
          <shipping-form
              form-action="/api/shipping"
              :form="form"
              :shipping-statuses="options.shipping_status"
              redirect-to="/"
          />
        </template>
        <template v-else>
          <p>La distancia de entrega no puede ser mayor a 20 Km</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ShippingForm from "./ShippingForm";

export default {
  components: {
    ShippingForm
  },
  data() {
    return {
      map: null,
      marker: null,
      options: {
        shipping_status: []
      },
      legends: {
        time: '',
        distance: ''
      },
      form: {
        shipping_status_id: '',
        customer: '',
        description: '',
        origin: {
          latitude: '',
          longitude: ''
        },
        destination: {
          latitude: '',
          longitude: ''
        }
      }
    }
  },
  methods: {
    calculateDistance() {
      const self = this;
      const origin = this.form.origin;
      const destination = this.form.destination;

      axios.get(`/api/distance`, {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
        }
      }).then(({ data }) => {
        data.resourceSets.map((item) => {
          let resource = item.resources[0];
          self.legends.time = new Date(resource.travelDuration * 1000).toISOString().substr(11, 8);
          self.legends.distance = resource.travelDistance;
        })
      }).catch((err) => {
        console.error(err)
      });

    }
  },
  created() {
    axios.get('/api/shipping_statuses').then(({ data }) => {
      this.options.shipping_status = data;
    })
  },
  mounted() {

    const self = this;

    setTimeout(() => {

      self.map = L.map('mapid');

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(self.map);

      navigator.geolocation.getCurrentPosition( (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        self.form.origin.latitude = lat;
        self.form.origin.longitude = lon;

        self.map.setView(new L.LatLng(lat, lon), 15);

        L.marker([lat, lon]).addTo(self.map);

      });

      // Add marker on click
      self.map.on('click', (e) => {

        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        if (self.marker !== null) {
          self.map.removeLayer(self.marker);
        }

        self.form.destination.latitude = lat;
        self.form.destination.longitude = lon;

        self.calculateDistance();

        self.marker = L.marker([lat,lon]).addTo(self.map);
      });

    }, 500);

  }
}
</script>