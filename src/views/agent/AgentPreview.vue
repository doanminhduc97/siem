<template>
  <div class="agent-container">
    <v-container>
      <v-row>
        <v-col xl="4" lg="6" sm="12" class="d-flex overflow-scroll">
          <field-set-card card-label="STATUS">
            <template #card-content>
              <v-g2-donut :data="donut.data" />
            </template>
          </field-set-card>
        </v-col>
        <v-col xl="4" lg="6" sm="12" class="d-flex overflow-scroll">
          <field-set-card card-label="DETAIL">
            <template #card-content>
              <v-g2-donut :data="donut.data" />
            </template>
          </field-set-card>
        </v-col>
        <v-col xl="4" lg="6" sm="12" class="d-flex overflow-scroll">
          <field-set-card card-label="EVOLUTION">
            <template #card-content>
              <v-g2-donut :data="donut.data" />
            </template>
          </field-set-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="getDataTable"
            :sort-by="['id']"
            :sort-desc="[true]"
            class="elevation-1"
            :loading="isLoading"
          >
            <template #body="props">
              <tbody>
                <tr v-for="(item, index) in props.items" :key="index">
                  <td v-for="(field, index) in Object.keys(item)" :key="index" class="d-flex d-sm-table-cell">
                    <template v-if="field === 'status'">
                      <span :class="getIconStatus(item[field])"></span>{{ item[field] }}
                    </template>
                    <template v-else>
                      {{ item[field] }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import FieldSetCard from '@/components/card/FieldSetCard'
import VG2Donut from '@/components/chart/g2plot/donut'
export default {
  name: 'AgentPreview',
  components: {
    FieldSetCard,
    VG2Donut,
  },
  data() {
    return {
      // define header
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id',
          width: '80px',
        },
        { text: 'Name', value: 'name' },
        { text: 'IP', value: 'ip' },
        { text: 'Group(s)', value: 'group' },
        { text: 'OS', value: 'os', width: '300px' },
        { text: 'Clustter node', value: 'cluster' },
        { text: 'Version', value: 'version' },
        { text: 'Registration date', value: 'regDate' },
        { text: 'Last keep alive', value: 'keepAlive' },
        { text: 'Status', value: 'status', width: '140px' },
        { text: 'Action', value: 'action' },
      ],
      agents: [],
      donut: {
        data: [
          {
            type: 'Disconnected',
            value: 4,
          },
          {
            type: 'Active',
            value: 5,
          },
        ],
        title: {
          visible: true,
          text: 'Donut chart',
        },
      },
    }
  },
  computed: {
    getDataTable() {
      return this.agents.map((agent) => {
        return {
          id: agent.id,
          name: agent.name,
          ip: agent.ip,
          group: 'default',
          os: agent.os?.name,
          cluster: agent.node_name,
          verison: agent.version,
          regDate: agent.dateAdd,
          keepAlive: agent.lastKeepAlive,
          status: agent.status,
          action: '',
        }
      })
    },
    isLoading() {
      return this.$store.getters['agent/loading']
    },
  },
  async mounted() {
    await this.$store.dispatch('agent/getListAgents')
    this.agents = this.$store.getters['agent/agents']
  },
  methods: {
    getIconStatus(status) {
      switch (status) {
        case 'active':
          return 'circle-status--success'
        case 'disconnected':
          return 'circle-status--disconnected'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .v-data-table {
  font-size: 0.875rem;
  line-height: 1.5;
  width: 100%;
}
.agent-container {
  display: -webkit-flex;
  display: flex;
  padding: 16px;
  background-color: #fafbfd;
}
.circle-status {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  &--success {
    @extend .circle-status;
    background-color: #017d73;
  }
  &--disconnected {
    @extend .circle-status;
    background-color: #bd271e;
  }
}
</style>
