<template>
  <v-data-table :headers="dataHeaders" :items="dataItems" class="height-100 border-radius-4">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title class="width-100">
          <slot />
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.name }}</td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'TableAgent',
  props: ['dataItems', 'dataHeaders'],
}
</script>
<style lang="scss">
.border-top-radius {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.height-100 {
  height: 100%;
}

.width-100 {
  width: 100%;
}

.border-radius-4 {
  border-radius: 4px;
  overflow: hidden;
}
</style>
