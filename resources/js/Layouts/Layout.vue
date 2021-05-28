<template>
  <section class="h-screen w-screen bg-gray-100 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
    <aside class="sm:h-full sm:w-16 w-full h-12 bg-gray-800 text-gray-200">
      <ul class="text-center flex flex-row sm:flex-col w-full">
        <li class="h-14 border-b border-gray-900 hidden sm:block">
          <a id="page-icon" href="/" class="h-full w-full hover:bg-gray-700 block p-3">
            <img class="object-contain h-full w-full" src="https://avatars1.githubusercontent.com/u/6157842?v=4" alt="open-source" />
          </a>
        </li>
        <li class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Inbox">
          <a id="page-icon" href="/" class="h-full w-full hover:bg-gray-700 block p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-delivery mx-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
              <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
              <line x1="3" y1="9" x2="7" y2="9"></line>
            </svg>
          </a>
        </li>
      </ul>
    </aside>
    <main  class="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
      <nav class="border-b bg-white px-6 py-2 flex items-center min-w-0 h-14">
        <h1 class="font-semibold text-lg"></h1>
        <span class="flex-1"></span>
        <span class="mr-2"></span>
        <button class="ml-auto border rounded-full ml-2 w-10 h-10 text-center leading-none text-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user mx-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          </svg>
        </button>
      </nav>


      <section class="flex-1 lg:mb-0 lg:min-h-0 lg:min-w-0">
        <router-view />
      </section>

      <footer class="px-6 py-3 border-t flex w-full items-end">
        <p class="text-gray-600">@batnieluyo</p>
      </footer>
    </main>
  </section>
</template>

<script>
export default {}
</script>