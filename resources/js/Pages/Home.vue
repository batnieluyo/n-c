<template>
  <div>
    <section-title class="mb-4">
      <div class="flex inline">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-delivery mx-auto w-8 h-9 mr-4" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="7" cy="17" r="2"></circle>
          <circle cx="17" cy="17" r="2"></circle>
          <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
          <line x1="3" y1="9" x2="7" y2="9"></line>
        </svg> Lista de envíos
      </div>
      <template v-slot:right>
        <div>
          <router-link :to="{name: 'shipping.create'}" class="bg-blue-500 text-white p-2 rounded transition hover:bg-blue-600 flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </router-link>
        </div>
      </template>
    </section-title>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción del envío
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" width="200">
                    Estado del envío
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" width="150">
                    Tiempo / Distancia
                  </th>
                  <th scope="col" class="relative px-6 py-3" width="20">
                    <span class="sr-only">Editar</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="record in records" :key="record.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ record.customer }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ record.descript }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 text-xs leading-5 font-semibold rounded-full mx-auto text-center" :class="status_style[record.ShippingStatus.short_code]">
                      {{ record.ShippingStatus.name }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ record.time }}</div>
                    <div class="text-sm text-gray-500">{{ record.distance }} km</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link :to="{name: 'shipping.show', params: {id: record.id}}" class="flex w-full rounded p-2 bg-blue-400 text-white hover:bg-blue-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                      </svg>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../Components/SectionTitle";

export default {
  components: {
    SectionTitle
  },
  data() {
    return {
      records: [],
      status_style: {
        pending: 'bg-yellow-100 text-yellow-800',
        in_shipping_process: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
      }
    }
  },
  created() {
    axios.get('/api/shipping').then(({ data }) => {
      this.records = data;
    }).catch((err) => {
      console.error(err);
    })
  }
}
</script>