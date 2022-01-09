<template>
  <div>
    <div class="header-agent-wrapper">
      <span class="header-agent-title">{{ nameOS }}</span>
      <div class="header-agent-report">
        <svg
          class="header-agent-report__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          role="img"
          aria-hidden="true"
        >
          <path
            fill="#006BB4"
            d="M10.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V15a1 1 0 01-1 1H2a1 1 0 01-1-1V1a1 1 0 011-1h8.8zM14 5h-3.5a.5.5 0 01-.5-.5V1H2v14h12V5zm-8.5 7a.5.5 0 110-1h5a.5.5 0 110 1h-5zm0-3a.5.5 0 010-1h5a.5.5 0 110 1h-5z"
          ></path>
        </svg>
        <span class="header-agent-report__text"> Generate report</span>
      </div>
    </div>
    <v-container>
      <v-alert text dense color="#006BB4" type="info" border="left">
        This agent is currently disconnected, the data may be outdated.
      </v-alert>
      <v-row>
        <v-col cols="12">
          <v-card elevation="3">
            <div class="flex-group">
              <div class="header-configuration-wrap">
                <span class="header-configuration header-configuration-cores">
                  <span class="header-configuration__title">Status:</span>
                  <span class="header-configuration__value">{{ infoStats.status }}</span>
                </span>
                <span class="header-configuration header-configuration-memmory">
                  <span class="header-configuration__title">Buffer:</span>
                  <span class="header-configuration__value">{{
                    infoStats.buffer_enabled ? 'enabled' : 'disable'
                  }}</span>
                </span>
                <span class="header-configuration header-configuration-arch">
                  <span class="header-configuration__title">Message buffer:</span>
                  <span class="header-configuration__value">{{ infoStats.msg_buffer }}</span>
                </span>
                <span class="header-configuration header-configuration-os">
                  <span class="header-configuration__title">Messages count:</span>
                  <span class="header-configuration__value">{{ infoStats.msg_count }}</span>
                </span>
                <span class="header-configuration header-configuration-cpu">
                  <span class="header-configuration__title">Messages sent:</span>
                  <span class="header-configuration__value">{{ infoStats.msg_sent }}</span>
                </span>
              </div>
              <div class="header-last-scan-wrap">
                <span class="header-configuration-last-scan">
                  <span class="header-configuration__title">Last ack:</span>
                  <span class="header-configuration__value">{{ infoStats.last_ack }}</span>
                </span>
              </div>
              <div class="header-last-scan-wrap">
                <span class="header-configuration-last-scan">
                  <span class="header-configuration__title">Last keep alive:</span>
                  <span class="header-configuration__value">{{ infoStats.last_keepalive }}</span>
                </span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-title> METRI </v-card-title>
            <v-card-text>
              <v-row>
                <div class="my-5">
                  <h3><strong>Top Tactics</strong></h3>
                </div>
              </v-row>
              <button v-show="!pageFirst" @click="refreshTactics()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  class="euiIcon euiIcon--medium euiIcon-isLoaded euiButtonIcon__icon"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    d="M4.308 7h8.136c.307 0 .556.224.556.5s-.249.5-.556.5H4.308l4.096 4.096a.5.5 0 01-.707.707L3.454 8.561a1.494 1.494 0 01-.433-.925.454.454 0 010-.272c.03-.338.175-.666.433-.925l4.243-4.242a.5.5 0 11.707.707L4.308 7z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </v-card-text>
            <v-data-table
              v-model="tactics"
              hide-default-header
              hide-default-footer
              :items="initTactics"
              :headers="headerInterfaces"
              :loading="isLoading"
            >
              <template #body="props">
                <tbody>
                  <tr v-for="(item, index) in props.items" :key="index" @click="handleClickTactics(item)">
                    <td class="text-xs-right">{{ item.key }}</td>
                    <td class="text-xs-right">{{ item.doc_count }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title> Compliance </v-card-title>
            <v-data-table :items="intervalItems" class="elevation-1"></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'AgentDetail',
  data() {
    return {
      // define header
      headerInterfaces: [
        { text: ' ', value: 'key' },
        { text: ' ', value: 'doc_count' },
      ],
      infoStats: [],
      intervalItems: [],
      globalItems: [],
      startGlobal: '',
      endGlobal: '',
      startInterval: '',
      endInterval: '',
      stats: [],
      nameOS: [],
      tactics: [
        {
          key: '',
          doc_count: '',
        },
      ],
      pageFirst: true,
      res: this.$store.getters['agent/rawElastic'],
    }
  },
  computed: {},
  computed: {
    initTactics() {
      return this.tactics?.map((item) => {
        return {
          key: item.key,
          doc_count: item.doc_count,
        }
      })
    },
    isLoading() {
      return this.$store.getters['agent/loading']
    },
  },
  async mounted() {
    const param = {
      id: '005',
    }
    // this.res.body.query.bool.filter = []
    const raw = JSON.parse(JSON.stringify(this.res))
    raw.body.query.bool.filter.push({ match_all: {} })
    raw.body.query.bool.filter.push({ match_phrase: { 'manager.name': 'localhost.localdomain' } })
    raw.body.query.bool.filter.push({ match_phrase: { 'agent.id': param.id } })
    raw.body.query.bool.filter.push({ exists: { field: 'rule.mitre.id' } })
    raw.body.query.bool.filter.push({ range: { timestamp: { from: 'now-90d', to: 'now' } } })

    raw.body.aggs = { tactics: { terms: { field: 'rule.mitre.tactic', size: 5 } } }

    this.tactics = await this.$store.dispatch('agent/getElastic', raw)
    console.log(this.tactics)
    // this.infoStats = await this.$store.dispatch('agent/getInfoStats', param)
    // this.nameOS = await this.$store.dispatch('agent/getNameOS', param)

    // this.initStats(this.stats)
  },

  methods: {
    async refreshTactics() {
      const raw = JSON.parse(JSON.stringify(this.res))
      raw.body.query.bool.filter.push({ match_all: {} })
      raw.body.query.bool.filter.push({ match_phrase: { 'manager.name': 'localhost.localdomain' } })
      raw.body.query.bool.filter.push({ match_phrase: { 'agent.id': '005' } })
      raw.body.query.bool.filter.push({ exists: { field: 'rule.mitre.id' } })
      raw.body.query.bool.filter.push({ range: { timestamp: { from: 'now-90d', to: 'now' } } })

      raw.body.aggs = { tactics: { terms: { field: 'rule.mitre.tactic', size: 5 } } }
      this.pageFirst = true

      this.tactics = await this.$store.dispatch('agent/getElastic', raw)
    },
    async handleClickTactics(item) {
      if (!this.pageFirst) {
        console.log('popup!!')

        return
      }
      const raw = JSON.parse(JSON.stringify(this.res))
      raw.body.query.bool.filter.push({ match_all: {} })
      raw.body.query.bool.filter.push({ match_phrase: { 'manager.name': 'localhost.localdomain' } })
      raw.body.query.bool.filter.push({ match_phrase: { 'agent.id': '005' } })
      raw.body.query.bool.filter.push({ match_phrase: { 'rule.mitre.tactic': item.key } })
      raw.body.query.bool.filter.push({ exists: { field: 'rule.mitre.id' } })
      raw.body.query.bool.filter.push({ range: { timestamp: { from: 'now-90d', to: 'now' } } })
      raw.body.aggs = { tactics: { terms: { field: 'rule.mitre.id', size: 5 } } }
      this.tactics = await this.$store.dispatch('agent/getElastic', raw)
      this.pageFirst = false
    },
  },
}
</script>
<style lang="scss" scoped>
@media (min-width: 2000px) {
  .container {
    width: 100% !important;
  }
}
.header-agent-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #d3dae6;
  background-color: white;
  align-items: center;

  .header-agent-title {
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: #1a1c21;
  }

  .header-agent-report {
    display: flex;
    align-items: center;
    padding: 10px 6px;
    color: #006bb4;
    font-size: 1rem;
    .header-agent-report__icon {
      margin-right: 6px;
    }

    &:hover {
      cursor: pointer;
    }

    &:hover .header-agent-report__text {
      text-decoration: underline;
    }
  }
}
.flex-group {
  display: flex;
  justify-content: space-between;
  padding: 16px 10px;
  line-height: 1.8rem;

  .header-configuration {
    font-size: 1rem;
    padding-right: 24px;
  }
  .header-configuration__value {
    font-weight: bold;
  }
}
.selected {
  background-color: red;
}
</style>
