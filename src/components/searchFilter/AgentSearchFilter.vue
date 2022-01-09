<template>
  <div class="agent-container">
    <v-container fluid ma-0 pa-0 fill-height>
      <v-row class="d-flex">
        <v-col cols="12">
          <v-autocomplete
            :input="model"
            :items="items"
            :loading="isLoading"
            :search-input="search"
            chips
            item-text="description"
            clearable
            item-value="name"
            label="Filter or search agent"
            append-icon=""
            multiple
          >
            <template #selection="{ item }">
              <span v-text="item.name"></span>
            </template>
            <template #item="{ item }">
              <!-- <v-list-item-avatar color="indigo" class="text-h5 font-weight-light white--text">  </v-list-item-avatar> -->
              <div class="search-wrap">
                <div class="search-title">
                  <span class="iconSearch">
                    <svg fill="#865f74" width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true"><path d="M8 9a5 5 0 110-8 5 5 0 110 8zm.75-.692a4 4 0 100-6.615A4.981 4.981 0 0110 5a4.981 4.981 0 01-1.25 3.308zM4.133 8V5.559h2.496v-.625H4.133V2.996h2.719v-.633H3.43V8h.703z"></path></svg>
                  </span>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </div>
                <v-list-item-content>
                  <v-list-item-title v-text="item.description"></v-list-item-title>
                </v-list-item-content>
              </div>
            </template>
            <!-- <template v-else #item="{ item }">
              <v-list-item-avatar color="indigo" class="text-h5 font-weight-light white--text">
                {{ appendItem.name.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title :v-text="item.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title :v-text="item.description"></v-list-item-title>
              </v-list-item-content>
            </template> -->
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AgentSearchFilter',
  data: () => ({
    isLoading: false,
    // key name contain header in table
    items: [],
    model: null,
    search: null,
    queryString: null,
    defaultItem: []
  }),
  computed: {},
  watch: {
    model(val) {
      console.log('model', val)
      const queryString = ['!=', '=']
      let valueMapping = null
      console.log('search', this.search)
      
      // check search text null or keyword not start with item default
      if (!val || queryString.includes(val[0])) {
        console.log('test')
        this.initSearchItems()
      }
      const checkMappingItem = this.defaultItem.some((item) => {
        if (val[val.length - 1] === item.name) {
          valueMapping = { ...item }
        }
        return val[val.length - 1] === item.name
      })
      // check search step 1
      if (checkMappingItem) {
        console.log('mapping item')
        this.items = [
          {
            description: valueMapping.description,
            name: valueMapping.name,
          },
          {
            description: 'Equal',
            name: '=',
          },
          {
            description: 'Not equal',
            name: '!=',
          },
        ]
      }
      // check search condition
      const checkEqualSearchText = queryString.some((item) => {
        // trường hợp end model kp là = or != 
        if (val.length === 1) {
          console.log('check search condition false')
          return val[0].endsWith(item)
        }
        // trường hợp init: model rỗng
        if (val.length === 0) {
          return false
        }
        // trường hợp end model là = or != 
        // let search = ''
        // val.forEach(el => {
        //   console.log('search foreach', search)
        //   search = search + el          
        // });
        // this.search = search
        return val[val.length - 1].endsWith(item)
      })
      if (checkEqualSearchText) {
        console.log('query string')
        const params = {
          fields: val[val.length - 2],
          q: 'id!=000',
          limit: '30',
        }
        this.$store.dispatch('agent/getAgentStat', params).then((data) => {
          console.log('data', data)
          this.items = data.map((ele) => {
            return { name: ele[Object.keys(ele).pop()] }
          })
        })
      }
    },
    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0)

      // this.isLoading = true
      // this.$emit('')
      // Lazily load input items
      // fetch('')
      //   .then((res) => res.clone().json())
      //   .then((res) => {
      //     this.items = res
      //     console.log('item', this.items)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      //   .finally(() => (this.isLoading = false))
    },
  },
  created() {
    this.initSearchItems()
    this.defaultItem = [...this.items]
  },
  methods: {
    initSearchItems() {
      const newItems = [
        {
          description: 'Filter by agent connection status',
          name: 'status',
        },
        {
          description: 'Filter by OS platform',
          name: 'os.platform',
        },
        {
          description: 'Filter by agent IP',
          name: 'ip',
        },
        {
          description: 'Filter by agent name',
          name: 'name',
        },
        {
          description: 'Filter by agent id',
          name: 'id',
        },
        {
          description: 'Filter by agent group',
          name: 'group',
        },
        {
          description: 'Filter by node name',
          name: 'node_name',
        },
        {
          description: 'Filter by manager',
          name: 'manager',
        },
        {
          description: 'Filter by agent version',
          name: 'version',
        },
        {
          description: 'Filter by agent config sum',
          name: 'configSum',
        },
        {
          description: 'Filter by agent merged sum',
          name: 'mergedSum',
        },
        {
          description: 'Filter by add date',
          name: 'dateAdd',
        },
        {
          description: 'Filter by last keep alive',
          name: 'lastKeepAlive',
        },
      ]
      // reactivity default item
      newItems.forEach((item, index) => {
        this.$set(this.items, index, item)
      })
    },
    onClickItem() {
      console.log('vao day')
    },
  },
}
</script>
<style lang="scss" scoped>
.agent-container {
  display: -webkit-flex;
  display: flex;
  background-color: #fafbfd;
}

.iconSearch {
  background-color: #f5ebf0;
  color: #865f74;
  padding: 4px;
  margin-left: -16px;

  svg {
    position: relative;
    top: 5px;
  }
}

.search-wrap {
  width: 100%;
  display: flex;
  height: 100%;
}

.search-title {
  flex: 1;
  display: flex;
  justify-content: space-between !important;
}

</style>
