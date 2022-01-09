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
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Global
              <div v-if="!!startGlobal && !!endGlobal" class="grey--text ms-4">
                {{ 'Start: ' + startGlobal + '- End:' + endGlobal }}
              </div>
            </v-card-title>
            <v-data-table :headers="headerInterfaces" :items="globalItems" class="elevation-1"></v-data-table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Interval
              <div v-if="!!startInterval && !!endInterval" class="grey--text ms-4">
                Start: {{ startInterval }} - End: {{ endInterval }}
              </div>
            </v-card-title>
            <v-data-table
              :headers="headerInterfaces"
              :items="intervalItems"
              multi-sort
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'AgentInventory',
  data() {
    return {
      // define header
      headerInterfaces: [
        { text: 'Location', value: 'location' },
        { text: 'Events', value: 'events' },
        { text: 'Bytes', value: 'bytes' },
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
    }
  },
  computed: {},
  async mounted() {
    const param = {
      id: '005',
    }
    await this.$store.dispatch('agent/getListStats', param)
    this.infoStats = await this.$store.dispatch('agent/getInfoStats', param)
    this.stats = this.$store.getters['agent/stats']
    this.nameOS = await this.$store.dispatch('agent/getNameOS', param)
    console.log(this.stats)
    this.initStats(this.stats)
  },

  methods: {
    initStats: function (stats) {
      if (stats) {
        this.globalItems = stats.interval.files
        this.intervalItems = stats.global.files
        this.startGlobal = stats.global.start
        this.endGlobal = stats.global.end
        this.startInterval = stats.global.start
        this.endInterval = stats.global.end
      }
    },
  },
}
</script>
<style lang="scss" scoped>
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
</style>
