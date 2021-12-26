<template>
  <div>
    <div class="header-agent-wrapper">
        <span class="header-agent-title">WIN-AA5UMH67U7I</span>
        <div class="header-agent-report">
            <font-awesome-icon icon="coffee" />
            <span class="header-agent-report__text"><vue-fontawesome icon="tint" size="1" color="lightgray"></vue-fontawesome>  Generate report</span>
        </div>
    </div>
    <v-container>
        <v-alert
            text
            dense
            color="#006BB4"
            type="info"
            border="left"
            >
            This agent is currently disconnected, the data may be outdated.
        </v-alert>
        <v-row>
            <v-col cols="12">
                <v-card
                    elevation="3" >
                    <div class="flex-group">
                        <div class="header-configuration-wrap">
                            <span class="header-configuration header-configuration-cores">
                                <span class="header-configuration__title">Cores:</span>
                                <span class="header-configuration__value">1</span>
                            </span>
                            <span class="header-configuration header-configuration-memmory">
                                <span class="header-configuration__title">Memory:</span>
                                <span class="header-configuration__value">2047.42 MB</span>
                            </span>
                            <span class="header-configuration header-configuration-arch">
                                <span class="header-configuration__title">Arch:</span>
                                <span class="header-configuration__value">x86_64</span>
                            </span>
                            <span class="header-configuration header-configuration-os">
                                <span class="header-configuration__title">OS:</span>
                                <span class="header-configuration__value">Microsoft Windows Server 2012 R2 Standard Evaluation 6.3.9600</span>
                            </span>
                            <span class="header-configuration header-configuration-cpu">
                                <span class="header-configuration__title">CPU:</span>
                                <span class="header-configuration__value">AMD Ryzen 7 5800H with Radeon Graphics</span>
                            </span>
                        </div>
                        <div class="header-last-scan-wrap">
                            <span class="header-configuration-last-scan">
                                <span class="header-configuration__title">Last scan:</span>
                                <span class="header-configuration__value">Dec 6, 2021 @ 22:03:37.000</span>
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
                        Network Interfaces
                    </v-card-title>
                    <v-data-table
                        :headers="headerInterfaces"
                        :items="desserts"
                        :sort-by="['calories', 'fat']"
                        :sort-desc="[false, true]"
                        multi-sort
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title>
                        Network Ports
                    </v-card-title>
                    <v-data-table
                        :headers="headerPorts"
                        :items="desserts"
                        :sort-by="['calories', 'fat']"
                        :sort-desc="[false, true]"
                        multi-sort
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
                <v-card>
                    <v-card-title>
                        Network Settings
                    </v-card-title>
                    <v-data-table
                        :headers="headerSettings"
                        :items="desserts"
                        :sort-by="['calories', 'fat']"
                        :sort-desc="[false, true]"
                        multi-sort
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card>
                    <v-card-title
                    elevation="2"
                    >
                        Windows Update
                    </v-card-title>
                    <v-data-table
                        :headers="headerWindowUpdates"
                        :items="desserts"
                        :sort-by="['calories', 'fat']"
                        :sort-desc="[false, true]"
                        multi-sort
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Packages
                      </v-card-title>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Filter packages..."
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headerPackages"
                      :items="desserts"
                      :search="search"
                    ></v-data-table>
                  </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Proccesses
                      </v-card-title>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Filter proccesses..."
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headerProccesses"
                      :items="desserts"
                      :search="search"
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
        { text: 'Name', value: 'name' },
        { text: 'MAC', value: 'mac' },
        { text: 'State', value: 'state' },
        { text: 'MTU', value: 'mtu' },
        { text: 'Type', value: 'type' }
      ],
      headerPorts: [
        { text: 'Proccess', value: 'proccess' },
        { text: 'Local IP', value: 'localIp' },
        { text: 'Local Port', value: 'localPort' },
        { text: 'State', value: 'state' },
        { text: 'Protocol', value: 'protocol' }
      ],
      headerSettings: [
        { text: 'Interface', value: 'interface' },
        { text: 'Address', value: 'address' },
        { text: 'Netmask', value: 'netmask' },
        { text: 'Protocol', value: 'protocol' },
        { text: 'Broadcast', value: 'broadcast' }
      ],
      headerWindowUpdates: [
        { text: 'Update code', value: 'updateCode' },
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
        { text: 'Parent PID', value: 'parentPID' },
        { text: 'VM size', value: 'VMsize' },
        { text: 'Priority', value: 'priority' },
        { text: 'NLWP', value: 'nlwp' },
        { text: 'Command', value: 'command' },
      ],
      agents: [],
    }
  },
  computed: {
    
  },
  async mounted() {
   
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
            color: #006BB4;
            font-size: 1rem;
            &:hover .header-agent-report__text {
                text-decoration: underline;
                cursor: pointer;
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
