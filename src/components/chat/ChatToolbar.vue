<template>
  <v-app-bar color="primary" dark app clipped-right>
    <v-app-bar-nav-icon @click="handleDrawerToggle" />
    <v-spacer />
    <v-toolbar-items>
      <v-btn text to="/dashboard">Dashboard</v-btn>
      <v-btn text href="mailto:wangqiangshen@gmail.com">Hire Me</v-btn>
      <v-btn text href="https://www.isocked.com" target="_blank">Blog</v-btn>
      <v-btn text href="http://doc.isocked.com/">Doc</v-btn>
      <v-btn icon href="https://github.com/tookit/vue-material-admin">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" transition="scale-transition">
        <template #activator="{ on }">
          <v-btn slot="activator" icon text v-on="on">
            <v-badge color="red" overlap>
              <span slot="badge">{{ getNotification.length }}</span>
              <v-icon medium>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <notification-list v-show="getNotification.length > 0" :items="getNotification" />
      </v-menu>
      <v-menu offset-y origin="center center" class="elelvation-1" transition="scale-transition">
        <template #activator="{ on }">
          <v-btn slot="activator" text v-on="on">
            <v-icon medium>mdi-translate</v-icon>
            <span class="ml-2"> {{ localeText }} </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="$vuetify.lang.current">
            <v-list-item
              v-for="item in availableLanguages"
              :key="item.value"
              :value="item.value"
              @click="handleChangeLocale(item)"
            >
              <v-list-item-title v-text="item.text" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu offset-y origin="center center" transition="scale-transition">
        <template #activator="{ on }">
          <v-btn slot="activator" icon large text v-on="on">
            <c-avatar :size="36" :username="getUsername" :src="getAvatar" :status="getUserStatus" />
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :key="index"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            @click="item.click"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import NotificationList from '@/components/list/NotificationList'
import CAvatar from '@/components/avatar/CAvatar'
import Util from '@/util'
export default {
  name: 'ChatToolbar',
  components: {
    NotificationList,
    CAvatar,
  },
  data() {
    return {
      profileMenus: [
        {
          icon: 'mdi-account',
          href: '#',
          title: 'Profile',
          click: this.handleProfile,
        },
        {
          icon: 'mdi-cog',
          href: '#',
          title: 'Settings',
          click: this.handleSetting,
        },
        {
          icon: 'mdi-power',
          href: '#',
          title: 'Logout',
          click: this.handleLogut,
        },
      ],
    }
  },
  computed: {
    getAvatar() {
      return this.$store.getters['auth/getAvatar']
    },
    getUsername() {
      return this.$store.getters['auth/getUsername']
    },
    getUserStatus() {
      return this.$store.getters['auth/getUserStatus']
    },
    getNotification() {
      return this.$store.getters['app/getNotification']
    },
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    availableLanguages() {
      const { locales } = this.$vuetify.lang
      return Object.keys(locales).map((lang) => {
        return {
          text: locales[lang].label,
          value: lang,
        }
      })
    },
    localeText() {
      const find = this.availableLanguages.find((item) => item.value === this.$vuetify.lang.current)
      return find.text
    },
  },
  created() {},
  methods: {
    handleDrawerToggle() {
      this.$emit('side-icon-click')
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
    handleLogut() {
      if (window.confirm('Are you sure to logout?')) {
        this.$store.dispatch('auth/logout')
        window._VMA.$emit('SHOW_SNACKBAR', {
          text: 'Logout successfull',
          color: 'success',
        })
        this.$router.push('/auth/login')
      }
    },
    handleChangeLocale({ value }) {
      this.$vuetify.lang.current = value
    },
    handleSetting() {},
    handleProfile() {},
    handleGoBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="sass" scoped></style>
