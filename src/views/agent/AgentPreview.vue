<template>
  <div class="agent-container">
    <v-container fluid ma-0 pa-0 fill-height>
      <v-row class="d-flex">
        <v-col xl="3" lg="5" md="5" sm="12" class="width-100">
          <field-set-card card-label="STATUS">
            <template #card-content>
              <apexchart type="donut" width="318" :options="chartOptions" :series="series"></apexchart>
            </template>
          </field-set-card>
        </v-col>
        <v-col xl="5" lg="7" md="7" sm="12" class="width-100">
          <field-set-card card-label="DETAIL">
            <template #card-content>
              <div class="d-flex flex-column">
                <div class="d-flex flex-row justify-space-between mb-7">
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Active</div>
                    <a class="title-small link-direction">5</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Disconnected</div>
                    <a class="title-small link-direction">4</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Never connected</div>
                    <a class="title-small link-direction">0</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Agents coverage</div>
                    <div class="title-small">55.56%</div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-space-between">
                  <div class="d-flex flex-column">
                    <div class="detail-text-small pb-1">Last registered agent</div>
                    <a class="title-small link-direction">DarkLord-ROG</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small pb-1">DarkLord-ROG</div>
                    <a class="title-small link-direction">SRV-Acunetix</a>
                  </div>
                </div>
              </div>
            </template>
          </field-set-card>
        </v-col>
        <v-col xl="4" lg="12" md="12" sm="12" class="width-100">
          <field-set-card card-label="EVOLUTION">
            <template #card-content>
              <apexchart type="donut" width="318" :options="chartOptions" :series="series"></apexchart>
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
export default {
  name: 'AgentPreview',
  components: {
    FieldSetCard,
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
      series: [5, 4, 0],
      chartOptions: {
        chart: {
          width: 200,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        labels: ['Active', 'Disconnected', 'Never connected'],
        colors: ['#017d73', '#bd271e', '#69707D'],
        responsive: [
          {
            options: {
              chart: {
                width: 150,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
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
.detail-text-small {
  line-height: 1.3125rem;
}
.title-small {
  color: #1a1c21;
  font-size: 20px;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.link-direction {
  text-decoration: none;
  color: #006bb4;
}
</style>
