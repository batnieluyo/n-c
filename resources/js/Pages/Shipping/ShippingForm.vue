<template>
  <div class="shadow sm:rounded-md sm:overflow-hidden">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
      <div class="grid grid-cols-3 gap-6">

        <div class="col-span-6">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre del cliente</label>
          <input type="text" v-model="form.customer" id="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>

        <div class="col-span-6 sm:col-span-2">
          <label for="shipping_status" class="block text-sm font-medium text-gray-700">Estado del envío</label>
          <select id="shipping_status" v-model="form.shipping_status_id" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Selecciona</option>
            <option v-for="status in statuses" :value="status.id">
              {{ `${status.name} - ${status.description}` }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
          Descripción del envío
        </label>
        <div class="mt-1">
          <textarea id="description" v-model="form.description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Agrega indicaciones extra o notas que consideres necesarias"></textarea>
        </div>
      </div>
    </div>
    <template v-if="
      form.customer !== '' && form.shipping_status_id !=='' &&
      form.origin.latitude !=='' && form.destination.latitude !== '' && form.description !== ''
    ">
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button @click="save" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <template v-if="loading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </template>
          {{ loading ? 'Guardando... ' : 'Guardar envío'}}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    shippingStatuses: {
      type: Array
    },
    form: {
      type: Object
    },
    formAction: {
      type: String,
    },
    method: {
      type: String,
      default: 'post'
    },
    redirectTo: {
      type: String,
    }
  },
  data() {
    return {
      statuses: this.shippingStatuses,
      loading: false,
    }
  },
  methods: {
    save() {
      const self = this;

      if (self.loading) {
        return;
      }

      self.loading = true

      axios({
        method: this.method,
        url: this.formAction,
        data: self.form
      }).then(({ data }) => {
        self.loading = false;
        this.$swal.fire({
          title: 'Éxito',
          text: 'Información guardada correctamente',
          icon: 'success',
          confirmButtonText: 'Entendido'
        }).then((result) => {
          if (self.method === 'post') {
            location.replace(self.redirectTo);
          }
        });
      })
    }
  },
  created() {
    if (this.method === 'post') {
      this.statuses = this.shippingStatuses.filter((status) => {
        return (status.short_code === 'pending');
      });
    }
  }
}
</script>