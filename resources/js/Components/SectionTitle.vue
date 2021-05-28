<template>
  <header class="bg-white shadow">
    <div class=" mx-auto py-6 px-4 sm:px-10 flex justify-between">
      <h1 class="text-3xl font-bold text-gray-900">
        <slot></slot>
      </h1>
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'head'
}
</script>