<template>
  <div>
    <div class="header-agent-wrapper">
        <span class="header-agent-title">WIN-AA5UMH67U7I</span>
        <div class="header-agent-report">
            <svg class="header-agent-report__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true">
                <path fill="#006BB4" d="M10.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V15a1 1 0 01-1 1H2a1 1 0 01-1-1V1a1 1 0 011-1h8.8zM14 5h-3.5a.5.5 0 01-.5-.5V1H2v14h12V5zm-8.5 7a.5.5 0 110-1h5a.5.5 0 110 1h-5zm0-3a.5.5 0 010-1h5a.5.5 0 110 1h-5z"></path>
            </svg>
            <span class="header-agent-report__text"> Generate report</span>
        </div>
    </div>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert
                    text
                    dense
                    color="#006BB4"
                    type="info"
                    border="left"
                    class="mb-0 mt-2"
                    >
                    This agent is currently disconnected, the data may be outdated.
                </v-alert>
            </v-col>
        </v-row>
        <v-card class="mt-6 mb-6">
            <v-row>
                <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
                    <span class="header-configuration__title">Cores:</span>
                    <span class="header-configuration__value">1</span>
                </v-col>
                <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
                    <span class="header-configuration__title">Memory:</span>
                    <span class="header-configuration__value">2047.42 MB</span>
                </v-col>
                <v-col lg="1" xl="1" md="12" cols="12" class="pal-6">
                    <span class="header-configuration__title">Arch:</span>
                    <span class="header-configuration__value">x86_64</span>
                </v-col>
                <v-col lg="3" xl="3" md="12" cols="12" class="pal-6">
                    <span class="header-configuration__title">OS:</span>
                    <span class="header-configuration__value">Microsoft Windows Server 2012 R2 Standard Evaluation 6.3.9600</span>
                </v-col>
                <v-col lg="3" xl="3" md="12" cols="12" class="pal-6">
                    <span class="header-configuration__title">CPU:</span>
                    <span class="header-configuration__value">AMD Ryzen 7 5800H with Radeon Graphics</span>
                </v-col>
                <v-col lg="3" xl="3" md="12" cols="12" class="pr-6 pal-6">
                    <span class="header-configuration__title">Last scan:</span>
                    <span class="header-configuration__value">Dec 6, 2021 @ 22:03:37.000</span>
                </v-col>
            </v-row>    
        </v-card>
        <v-row >
            <v-col cols="12" lg="6" md="12" xl="6">
                <v-card class="height-100">
                    <TableAgent 
                        :dataHeaders="headerInterfaces"
                        :dataItems="netiface"
                    >
                        <div class="d-flex align-center">
                            <svg class="card-title__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path d="M8 8H4.915a1.5 1.5 0 110-1H8V2.5A1.5 1.5 0 019.5 1h2.585a1.5 1.5 0 110 1H9.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.585a1.5 1.5 0 110 1H9.5A1.5 1.5 0 018 12.5V8zM3.5 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path></svg>
                            <span class="card-title__text">Network interfaces</span> 
                        </div>
                        <hr />
                    </TableAgent>
                </v-card>

            </v-col>
            <v-col cols="12" lg="6" md="12" xl="6">
                <v-card class="height-100">
                    <TableAgent 
                        :dataHeaders="headerPorts"
                        :dataItems="ports"
                    >
                        <div class="d-flex align-center">
                            <svg class="card-title__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path d="M10 13.999v-2.99h1V15H0V1h11v3.999h-1V2.001H1v11.998z"></path><path d="M4.5 10V9H11v1zM13 9.5l3-3-3-3z"></path><path d="M5.5 6.5v6l-3-3zM7 7V6h6.5v1z"></path></svg>
                            <span class="card-title__text">Network ports</span> 
                        </div>
                        <hr />
                    </TableAgent>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="9" md="12" xl="9">
                <v-card class="height-100">
                    <TableAgent 
                        :dataHeaders="headerSettings"
                        :dataItems="netaddr"
                    >
                        <div class="d-flex align-center">
                            <svg class="card-title__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path fill-rule="evenodd" d="M8.05 10a2.5 2.5 0 014.9 0h1.55a.5.5 0 110 1h-1.55a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 110-1h6.55zm-.1-4a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 010-1h1.55a2.5 2.5 0 014.9 0h6.55a.5.5 0 110 1H7.95zM4 5.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm8 5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path></svg>
                            <span class="card-title__text">Network Settings</span>
                        </div> 
                        <hr />
                    </TableAgent>
                </v-card>

            </v-col>
            <v-col cols="12" lg="3" md="12" xl="3">
                <v-card class="height-100">
                    <TableAgent 
                        :dataHeaders="headerWindowUpdates"
                        :dataItems="hotfixes"
                    >
                        <div class="d-flex align-center">
                            <svg class="card-title__icon" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path fill="#00ADEF" d="M0 4.51l12.977-1.768.006 12.518-12.971.074L0 4.51zm12.97 12.192l.011 12.529-12.97-1.784-.002-10.829 12.962.084zm1.574-14.19L31.751 0v15.1l-17.207.137V2.511zm17.21 14.308l-.003 15.033-17.207-2.429-.024-12.632 17.235.028z"></path></svg>
                            <span class="card-title__text">Windows updates</span> 
                        </div>
                        <hr />
                    </TableAgent>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TableAgentSearch
                dataLabel="Filter packages..."
                :dataHeaders="headerPackages"
                :dataItems="packages"
                >
                    <svg class="card-title__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path d="M2 4V2h2v2H2zm5 0V2h2v2H7zm5 0V2h2v2h-2zM2 9V7h2v2H2zm5 0V7h2v2H7zm5 0V7h2v2h-2zM2 14v-2h2v2H2zm5 0v-2h2v2H7zm5 0v-2h2v2h-2z"></path></svg>
                    <span class="card-title__text">Packages</span>
                    <hr />
                </TableAgentSearch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TableAgentSearch
                dataLabel="Filter proccesses..."
                :dataHeaders="headerProccesses"
                :dataItems="processes"
                >
                    <svg class="card-title__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true" style="margin-top: 3px;"><path d="M1.157 12.224L5.768 8.32a.404.404 0 000-.64l-4.61-3.904a.407.407 0 010-.643.608.608 0 01.759 0l4.61 3.904c.631.534.63 1.393 0 1.926l-4.61 3.904a.608.608 0 01-.76 0 .407.407 0 010-.643zM9 12h6v1H9v-1z"></path></svg>
                    <span class="card-title__text">Proccesses</span>
                    <hr/>
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
    TableAgentSearch
  },
  data() {
    return {
      // define header
      headerInterfaces: [
        { text: 'Name', value: 'name' },
        { text: 'MAC', value: 'mac' },
        { text: 'State', value: 'state' },
        { text: 'MTU', value: 'mtu' },
        { text: 'Type', value: 'type' }
      ],
      headerPorts: [
        { text: 'Proccess', value: 'process' },
        { text: 'Local IP', value: 'local.ip' },
        { text: 'Local Port', value: 'local.port' },
        { text: 'State', value: 'state' },
        { text: 'Protocol', value: 'protocol' }
      ],
      headerSettings: [
        { text: 'Interface', value: 'iface' },
        { text: 'Address', value: 'address' },
        { text: 'Netmask', value: 'netmask' },
        { text: 'Protocol', value: 'proto' },
        { text: 'Broadcast', value: 'broadcast' }
      ],
      headerWindowUpdates: [
        { text: 'Update code', value: 'hotfix' },
      ],
      headerPackages: [
        { text: 'Name', value: 'name' },
        { text: 'Architecture', value: 'architecture' },
        { text: 'Version', value: 'version' },
        { text: 'Vendor', value: 'vendor' }
      ],
      headerProccesses: [
        { text: 'Name', value: 'name' },
        { text: 'PID', value: 'pid' },
        { text: 'Parent PID', value: 'ppid' },
        { text: 'VM size', value: 'vm_size' },
        { text: 'Priority', value: 'priority' },
        { text: 'NLWP', value: 'nlwp' },
        { text: 'Command', value: 'cmd' },
      ],
      agents: [],
      netiface: [],
      ports: [],
      netaddr: [],
      hotfixes: [],
      packages: [],
      processes: [],
      os: {},
      hardware: {}
    //   search: ''
    }
  },
  computed: {
    
  },
  async created() {
      const param = {
          id: '001',
          limit: 10,
          offset: 0
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
   
   // get data os
   await this.$store.dispatch('agent/getOS', '001')
   this.os = this.$store.getters['agent/os']
   
   // get data hardware
   await this.$store.dispatch('agent/getHardware', '001')
   this.hardware = this.$store.getters['agent/hardware']
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
    .header-agent-wrapper {
        display: flex;
        justify-content: space-between;
        padding: 18px 24px;
        border-bottom: 1px solid #D3DAE6;
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
            color: #006BB4;
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
        background-color: #D3DAE6;
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
