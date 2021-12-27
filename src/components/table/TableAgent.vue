<template>
    <div>
        <v-data-table
            :headers="headersInfo"
            :items="netiface"
            class="elevation-1 flex-1"
        >
            <template v-slot:top>
            <v-toolbar flat class="border-top-radius">
                <v-toolbar-title style="width: 100%">
                    <slot />
                    <hr />
                </v-toolbar-title>
            </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                More info about {{ item.name }}
            </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    name: 'TableAgent',
    props: {
        headers: {
            type: Object,
            default: {}
        },
        items: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="scss">
    
</style>