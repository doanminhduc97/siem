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
                    <a class="title-small link-direction">{{ agentStatus.active }}</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Disconnected</div>
                    <a class="title-small link-direction">{{ agentStatus.disconnected }}</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Never connected</div>
                    <a class="title-small link-direction">{{ agentStatus.never_connected }}</a>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="detail-text-small">Agents coverage</div>
                    <div class="title-small">{{ getAgentCoverage }}%</div>
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
              <apexchart type="line" height="124" :options="evolutionOption" :series="EvolutionSeries"></apexchart>
            </template>
          </field-set-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <agent-search-filter />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="height-100">
            <div class="d-flex justify-space-between pb-5 pt-5">
              <span class="title-name pl-2">Agent(9)</span>
              <div class="d-flex">
                <div class="pr-5">
                  <button class="d-flex align-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false"
                      role="img" aria-hidden="true">
                      <path fill="#006BB4" fill-rule="evenodd"
                        d="M8 7h3.5a.5.5 0 110 1H8v3.5a.5.5 0 11-1 0V8H3.5a.5.5 0 010-1H7V3.5a.5.5 0 011 0V7zm-.5-7C11.636 0 15 3.364 15 7.5S11.636 15 7.5 15 0 11.636 0 7.5 3.364 0 7.5 0zm0 .882a6.618 6.618 0 100 13.236A6.618 6.618 0 007.5.882z">
                      </path>
                    </svg>
                    <span class="deploy-agent-title ml-2">Deploy new agent</span>
                  </button>
                </div>
                <div class="pr-9 pl-5">
                  <button class="d-flex align-center">
                    <export-excel :data="getListAgents" :fields="headerAgentsObj" worksheet="My Worksheet"
                      name="agents.csv" type="csv">
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                        focusable="false" role="img" aria-hidden="true">
                        <path fill="#006BB4"
                          d="M9 10.114l1.85-1.943a.52.52 0 01.77 0c.214.228.214.6 0 .829l-1.95 2.05a1.552 1.552 0 01-2.31 0L5.41 9a.617.617 0 010-.829.52.52 0 01.77 0L8 10.082V1.556C8 1.249 8.224 1 8.5 1s.5.249.5.556v8.558zM4.18 6a.993.993 0 00-.972.804l-1.189 6A.995.995 0 002.991 14h11.018a1 1 0 00.972-1.196l-1.19-6a.993.993 0 00-.97-.804H4.18zM6 5v1h5V5h1.825c.946 0 1.76.673 1.946 1.608l1.19 6A2 2 0 0114.016 15H2.984a1.992 1.992 0 01-1.945-2.392l1.19-6C2.414 5.673 3.229 5 4.174 5H6z">
                        </path>
                      </svg>
                      <span class="export-agent-title ml-2">Export formatted</span>
                    </export-excel>
                  </button>
                </div>
              </div>
            </div>
            <v-data-table :headers="headers" :items="getDataTable" :sort-by="['id']" :sort-desc="[true]"
              class="elevation-1" :loading="isLoading">
              <template #body="props">
                <tbody>
                  <tr v-for="(item, index) in props.items" :key="index">
                    <td v-for="(field, index) in Object.keys(item)" :key="index" class="d-flex d-sm-table-cell">
                      <template v-if="field === 'status'">
                        <span :class="getIconStatus(item[field])"></span>{{ item[field] }}
                      </template>
                      <template v-else-if="field === 'action'">
                        <span class="icon-wrap">
                          <button class="btn-icon" type="button" aria-label="Open summary panel for this agent">
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                              focusable="false" role="img" aria-hidden="true">
                              <path fill="#006BB4"
                                d="M15.98 7.873c.013.03.02.064.02.098v.06a.24.24 0 01-.02.097C15.952 8.188 13.291 14 8 14S.047 8.188.02 8.128A.24.24 0 010 8.03v-.059c0-.034.007-.068.02-.098C.048 7.813 2.709 2 8 2s7.953 5.813 7.98 5.873zm-1.37-.424a12.097 12.097 0 00-1.385-1.862C11.739 3.956 9.999 3 8 3c-2 0-3.74.956-5.225 2.587a12.098 12.098 0 00-1.701 2.414 12.095 12.095 0 001.7 2.413C4.26 12.043 6.002 13 8 13s3.74-.956 5.225-2.587A12.097 12.097 0 0014.926 8c-.08-.15-.189-.343-.315-.551zM8 4.75A3.253 3.253 0 0111.25 8 3.254 3.254 0 018 11.25 3.253 3.253 0 014.75 8 3.252 3.252 0 018 4.75zm0 1C6.76 5.75 5.75 6.76 5.75 8S6.76 10.25 8 10.25 10.25 9.24 10.25 8 9.24 5.75 8 5.75zm0 1.5a.75.75 0 100 1.5.75.75 0 000-1.5z">
                              </path>
                            </svg>
                          </button>
                          <button class="btn-icon" type="button" aria-label="Open configuration for this agent">
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                              focusable="false" role="img" aria-hidden="true">
                              <path fill="#006BB4"
                                d="M6.918 9.746l4.537 4.537a2 2 0 102.828-2.829l-3.157-3.156a.5.5 0 01.708-.708l3.156 3.157a3 3 0 11-4.243 4.243l-4.949-4.95a5.001 5.001 0 01-5.22-7.106.5.5 0 01.805-.138L3.676 5.09a1 1 0 101.415-1.414L2.797 1.382a.5.5 0 01.138-.805 5.001 5.001 0 113.983 9.169zM1.226 4.054a4.002 4.002 0 006.693 3.865 4 4 0 00-3.865-6.693l1.744 1.743a2 2 0 11-2.829 2.828L1.226 4.054zm10.229 8.814a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z">
                              </path>
                            </svg>
                          </button>
                        </span>
                      </template>
                      <template v-else-if="field === 'os'">
                        <template v-if="item[field].includes('Linux')">
                          <linux-icon />
                        </template>
                        <template v-else>
                          <window-icon />
                        </template>
                        {{ item[field] }}
                      </template>
                      <template v-else-if="field === 'group'">
                        <span class="border-item">
                          {{ item[field] }}
                        </span>
                      </template>
                      <template v-else>
                        {{ item[field] }}
                      </template>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import FieldSetCard from '@/components/card/FieldSetCard'
  import WindowIcon from '@/components/icon/WindowIcon'
  import LinuxIcon from '@/components/icon/LinuxIcon'
  import AgentSearchFilter from '@/components/searchFilter/AgentSearchFilter'
  export default {
    name: 'AgentPreview',
    components: {
      FieldSetCard,
      WindowIcon,
      LinuxIcon,
      AgentSearchFilter,
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
        series: [],
        agentStatus: {},
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
        EvolutionSeries: [
          {
            name: 'Connected',
            data: [0, 2, 4, 6,7,8,7,8],
          },
          {
            name: 'Disconnected',
            data: [0,5,6],
          },
        ],
        evolutionOption: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          markers: {
            size: [4, 7],
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
        },
        headerAgentsObj: {
          Id: 'id',
          Status: 'status',
          Name: 'name',
          IP: 'ip',
          'Group(s)': 'group',
          Manager: 'manager',
          Node: 'node_name',
          OS: 'os.name',
          'Registration date': 'dateAdd',
          Version: 'version',
          'OS Version build': 'os.build',
          'Last keep alive': 'lastKeepAlive',
          'OS version architecture': 'os.arch',
          'OS code name': 'osCode',
          'OS version major': 'os.major',
          'OS version minor': 'os.minor',
          'OS name': 'os.name',
          'OS platform': 'os.platform',
          'OS uname': 'os.uname',
          'OS version': 'os.version',
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
            os: agent.os?.name.length < 28 ? agent.os?.name : agent.os?.name.slice(0, 27) + '...',
            cluster: agent.node_name,
            verison: agent.version,
            regDate: agent.dateAdd,
            keepAlive: agent.lastKeepAlive,
            status: agent.status,
            action: '',
            // platform: agent.os?.platform,
          }
        })
      },
      getListAgents() {
        if (!this.$store.getters['agent/agents']) {
          this.$store.dispatch('agent/getListAgents')
        }
        return this.$store.getters['agent/agents'].map((agent) => {
          if (!agent.hasOwnProperty('group')) {
            return { ...agent, group: ['-'], osCode: '-' }
          }
          return { ...agent, osCode: '-' }
        })
      },
      isLoading() {
        return this.$store.getters['agent/loading']
      },
      getAgentCoverage() {
        if (!this.agentStatus) {
          return '0'
        }
        const k = Math.pow(10, 2)
        return Math.round((this.agentStatus.active / this.agentStatus.total) * k * 100) / k
      },
    },
    async created() {
      this.agentStatus = await this.$store.dispatch('agent/getAgentStatus')
      this.series = [this.agentStatus.active, this.agentStatus.disconnected, this.agentStatus.never_connected]
    },
    async mounted() {
      await this.$store.dispatch('agent/getListAgents')
      this.agents = this.$store.getters['agent/agents']
      // console.log('this.agents', this.getListAgents)
      const paramsChartEvolution =
      {
        params: {
          index: "wazuh-monitoring-*",
          body: {
            aggs: {
              2: {
                date_histogram: {
                  field: "timestamp",
                  fixed_interval: "5s",
                  time_zone: "Asia/Bangkok",
                  min_doc_count: 1
                },
                aggs: {
                  3: {
                    terms: {
                      field: "status",
                      order: {
                        _key: "desc"
                      },
                      size: 5
                    },
                    aggs: {
                      4: {
                        cardinality: {
                          field: "id"
                        }
                      }
                    }
                  }
                }
              }
            },
            size: 0,
            stored_fields: [
              "*"
            ],
            script_fields: {},
            docvalue_fields: [
              {
                field: "timestamp",
                format: "date_time"
              }
            ],
            _source: {
              "excludes": []
            },
            query: {
              bool: {
                must: [
                  {
                    match_all: {}
                  }
                ],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            "manager.keyword": "localhost.localdomain"
                          }
                        }
                      ]
                    }
                  },
                  {
                    range: {
                      timestamp: {
                        gte: "2022-01-09T13:27:31.887Z",
                        lte: "2022-01-09T13:42:31.887Z",
                        format: "strict_date_optional_time"
                      }
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            }
          },
          preference: 1641735364897
        }
      }
      const res = await this.$store.dispatch('agent/searchChart', paramsChartEvolution)
      console.log('charparamsChartEvolution', res)
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

  .icon-wrap {
    display: flex;

    .btn-icon {
      position: relative;
      padding: 4px;
      transition: top ease 0.111111s;
      top: 0;

      &:hover {
        top: -2px;
      }
    }
  }

  .title-name {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .deploy-agent-title,
  .export-agent-title {
    font-size: 1rem;
    color: #006bb4;

    &:hover {
      text-decoration: underline;
    }
  }

  .border-item {
    border: 1px solid #d3dae6;
    padding: 4px 8px;
    border-radius: 2px;
  }
</style>