<template>
    <v-card>
        <v-card-title>
            <slot />
            </v-card-title>
        <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="dataLabel"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="dataHeaders"
            :items="dataItems"
            :search="search"
        ></v-data-table>
        <div class="download-csv">
            <button class="btn">
                <svg fill="#006BB4" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true"><path d="M9 10.114l1.85-1.943a.52.52 0 01.77 0c.214.228.214.6 0 .829l-1.95 2.05a1.552 1.552 0 01-2.31 0L5.41 9a.617.617 0 010-.829.52.52 0 01.77 0L8 10.082V1.556C8 1.249 8.224 1 8.5 1s.5.249.5.556v8.558zM4.18 6a.993.993 0 00-.972.804l-1.189 6A.995.995 0 002.991 14h11.018a1 1 0 00.972-1.196l-1.19-6a.993.993 0 00-.97-.804H4.18zM6 5v1h5V5h1.825c.946 0 1.76.673 1.946 1.608l1.19 6A2 2 0 0114.016 15H2.984a1.992 1.992 0 01-1.945-2.392l1.19-6C2.414 5.673 3.229 5 4.174 5H6z"></path></svg>
                <span class="btn-text">Download CSV</span>
            </button>
        </div>
    </v-card>
</template>
<script>
export default {
    name: 'TableAgentSearch',
    props: ['dataLabel', 'dataHeaders', 'dataItems', 'dataSearch'],
    data() {
        return {
            search: '',
        }
    }
}
</script>
<style lang="scss">
    .download-csv {
        text-align: right;
        color: #006BB4;
        /* padding: 12px; */
        margin: 12px 12px 0 12px;
    }
    .btn {
        padding: 8px;
    }
    .btn svg {
        position: relative;
        top: 2px;
    }
    .btn-text {
        padding-left: 6px;
    }
</style>