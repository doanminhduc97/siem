<template>
  <div class="agent-container">
    <v-container fluid ma-0 pa-0 fill-height>
      <v-row>
        <v-col cols="12">
          <div class="header-agent-wrapper">
            <span class="header-agent-title">WIN-AA5UMH67U7I</span>
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
              <span class="header-agent-report__text">{{ $t('agent.generateReport') }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-n3">
        <v-col cols="12">
          <v-alert text dense color="#006BB4" type="info" border="left" class="mb-0 mt-2 pt-6 pb-6">
            {{ $t('agent.alertMessage') }}
          </v-alert>
        </v-col>
      </v-row>
      <v-card class="mt-6 mb-6 width-100">
        <v-row class="pt-3 pb-3">
          <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
            <span class="header-configuration__title">{{ $t('agent.cores') }}:</span>
            <span class="header-configuration__value"> {{ getCores }}</span>
          </v-col>
          <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
            <span class="header-configuration__title">{{ $t('agent.memory') }}:</span>
            <span class="header-configuration__value">{{ getMemmory }}</span>
          </v-col>
          <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
            <span class="header-configuration__title">{{ $t('agent.arch') }}:</span>
            <span class="header-configuration__value">{{ getArchitecture }}</span>
          </v-col>
          <v-col lg="3" xl="3" md="12" cols="12" class="pal-6">
            <span class="header-configuration__title">{{ $t('agent.os') }}:</span>
            <span class="header-configuration__value">{{ getOsName }}</span>
          </v-col>
          <v-col lg="3" xl="3" md="12" cols="12" class="pal-6">
            <span class="header-configuration__title">{{ $t('agent.cpu') }}:</span>
            <span class="header-configuration__value">{{ getCPU }}</span>
          </v-col>
          <v-col lg="3" xl="3" md="12" cols="12" class="pr-6 pal-6">
            <span class="header-configuration__title">{{ $t('agent.lastScan') }}:</span>
            <span class="header-configuration__value">{{ getLastScan }}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col cols="12" lg="6" md="12" xl="6">
          <v-card class="height-100">
            <TableAgent :data-headers="$t('agent.headerInterfaces')" :data-items="netiface">
              <div class="d-flex align-center">
                <svg
                  class="card-title__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                  style="margin-top: 3px"
                >
                  <path
                    d="M8 8H4.915a1.5 1.5 0 110-1H8V2.5A1.5 1.5 0 019.5 1h2.585a1.5 1.5 0 110 1H9.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.585a1.5 1.5 0 110 1H9.5A1.5 1.5 0 018 12.5V8zM3.5 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  ></path>
                </svg>
                <span class="card-title__text">{{ $t('agent.networkInterfaces') }}</span>
              </div>
              <hr />
            </TableAgent>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" md="12" xl="6">
          <v-card class="height-100">
            <TableAgent :data-headers="$t('agent.headerPorts')" :data-items="ports">
              <div class="d-flex align-center">
                <svg
                  class="card-title__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                  style="margin-top: 3px"
                >
                  <path d="M10 13.999v-2.99h1V15H0V1h11v3.999h-1V2.001H1v11.998z"></path>
                  <path d="M4.5 10V9H11v1zM13 9.5l3-3-3-3z"></path>
                  <path d="M5.5 6.5v6l-3-3zM7 7V6h6.5v1z"></path>
                </svg>
                <span class="card-title__text">{{ $t('agent.networkPorts') }}</span>
              </div>
              <hr />
            </TableAgent>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="9" md="12" xl="9">
          <v-card class="height-100">
            <TableAgent :data-headers="$t('agent.headerSettings')" :data-items="netaddr">
              <div class="d-flex align-center">
                <svg
                  class="card-title__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                  style="margin-top: 3px"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.05 10a2.5 2.5 0 014.9 0h1.55a.5.5 0 110 1h-1.55a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 110-1h6.55zm-.1-4a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 010-1h1.55a2.5 2.5 0 014.9 0h6.55a.5.5 0 110 1H7.95zM4 5.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm8 5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                  ></path>
                </svg>
                <span class="card-title__text">{{ $t('agent.networkSettings') }}</span>
              </div>
              <hr />
            </TableAgent>
          </v-card>
        </v-col>
        <v-col cols="12" lg="3" md="12" xl="3">
          <v-card class="height-100">
            <TableAgent :data-headers="$t('agent.headerWindowUpdates')" :data-items="hotfixes">
              <div class="d-flex align-center">
                <svg
                  class="card-title__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                  style="margin-top: 3px"
                >
                  <path
                    fill="#00ADEF"
                    d="M0 4.51l12.977-1.768.006 12.518-12.971.074L0 4.51zm12.97 12.192l.011 12.529-12.97-1.784-.002-10.829 12.962.084zm1.574-14.19L31.751 0v15.1l-17.207.137V2.511zm17.21 14.308l-.003 15.033-17.207-2.429-.024-12.632 17.235.028z"
                  ></path>
                </svg>
                <span class="card-title__text">{{ $t('agent.windowsUpdates') }}</span>
              </div>
              <hr />
            </TableAgent>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TableAgentSearch
            data-label="Filter packages..."
            :data-headers="$t('agent.headerPackages')"
            :data-items="packages"
            :header-obj="$t('agent.headerPackagesObj')"
            name-file-c-s-v="packages.csv"
          >
            <svg
              class="card-title__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              role="img"
              aria-hidden="true"
              style="margin-top: 3px"
            >
              <path
                d="M2 4V2h2v2H2zm5 0V2h2v2H7zm5 0V2h2v2h-2zM2 9V7h2v2H2zm5 0V7h2v2H7zm5 0V7h2v2h-2zM2 14v-2h2v2H2zm5 0v-2h2v2H7zm5 0v-2h2v2h-2z"
              ></path>
            </svg>
            <span class="card-title__text">{{ $t('agent.packages') }}</span>
            <hr />
          </TableAgentSearch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TableAgentSearch
            data-label="Filter processes..."
            :data-headers="$t('agent.headerProcesses')"
            :data-items="processes"
            :header-obj="$t('agent.headerProcessesObj')"
            name-file-c-s-v="processes.csv"
          >
            <svg
              class="card-title__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              role="img"
              aria-hidden="true"
              style="margin-top: 3px"
            >
              <path
                d="M1.157 12.224L5.768 8.32a.404.404 0 000-.64l-4.61-3.904a.407.407 0 010-.643.608.608 0 01.759 0l4.61 3.904c.631.534.63 1.393 0 1.926l-4.61 3.904a.608.608 0 01-.76 0 .407.407 0 010-.643zM9 12h6v1H9v-1z"
              ></path>
            </svg>
            <span class="card-title__text">{{ $t('agent.processes') }}</span>
            <hr />
          </TableAgentSearch>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import TableAgent from '@/components/table/TableAgent'
import TableAgentSearch from '@/components/table/TableAgentSearch'
export default {
  name: 'AgentInventory',
  components: {
    TableAgent,
    TableAgentSearch,
  },
  data() {
    return {
      agents: [],
      netiface: [],
      ports: [],
      netaddr: [],
      hotfixes: [],
      packages: [],
      processes: [],
      os: {},
      hardware: [],
      //   search: ''
    }
  },
  computed: {
    getCores() {
      return this.hardware[0]?.cpu?.cores || ''
    },
    getMemmory() {
      return `${(parseInt(this.hardware[0]?.ram?.total) / 1024).toFixed(2)} MB`
    },
    getArchitecture() {
      return this.hardware[1]?.osInfo[0]?.architecture || ''
    },
    getOsName() {
      return this.hardware[1]?.osInfo[0]?.os.name || ''
    },
    getCPU() {
      return this.hardware[0]?.cpu?.name || ''
    },
    getLastScan() {
      const dataDate = new Date(this.hardware[1]?.osInfo[0]?.scan.time) || ''
      if (!dataDate) {
        return ''
      }
      const time =
        dataDate.getHours() +
        ':' +
        dataDate.getMinutes() +
        ':' +
        dataDate.getSeconds() +
        '.' +
        dataDate.getMilliseconds() +
        '00'
      const date = dataDate.toDateString().slice(4)
      return date + ' @ ' + time
    },
  },
  async created() {
    const param = {
      id: '002',
      limit: 10,
      offset: 0,
    }
    // get data netiface
    await this.$store.dispatch('agent/getListNetiface', param)
    this.netiface = this.$store.getters['agent/netiface']
    // get data ports
    await this.$store.dispatch('agent/getListPorts', param)
    this.ports = this.$store.getters['agent/ports']

    // get data settings
    await this.$store.dispatch('agent/getListNetaddr', param)
    this.netaddr = this.$store.getters['agent/netaddr']

    // get data hotfixes
    await this.$store.dispatch('agent/getListHotfixes', param)
    this.hotfixes = this.$store.getters['agent/hotfixes']

    // get data packages
    await this.$store.dispatch('agent/getListPackages', param)
    this.packages = this.$store.getters['agent/packages']

    // get data processes
    await this.$store.dispatch('agent/getListProcesses', param)
    this.processes = this.$store.getters['agent/processes']

    // // // get data hardware and os
    await this.$store.dispatch('agent/getHardware', '001')
    this.hardware = this.$store.getters['agent/hardware']
    const scan = new Date(this.hardware[1].osInfo[0]?.scan.time)
    console.log('scan', scan.getMonth())
    console.log('scan', scan.getDay())
    console.log('scan', scan.toTimeString())
    console.log(this.hardware)
  },
}
</script>
<style lang="scss" scoped>
.agent-container {
  display: -webkit-flex;
  display: flex;
  padding: 16px;
  background-color: #fafbfd;
}
.header-agent-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
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

.header-configuration__value {
  font-weight: bold;
}

.header-configuration__title,
.header-configuration__value {
  font-size: 1rem;
}

.card-title__text {
  font-size: 1rem;
  padding-left: 4px;
}

hr {
  height: 1px;
  border: none;
  background-color: #d3dae6;
  width: 100%;
  margin-top: 12px;
}

.card-title__icon {
  position: relative;
  top: -2px;
}

@media (max-width: 1263px) {
  .pal-6 {
    padding-left: 24px;
  }
}

@media (min-width: 1264px) {
  .pal-6:first-child {
    padding-left: 24px;
  }

  .pal-6:last-child {
    text-align: right;
  }
}
</style>
