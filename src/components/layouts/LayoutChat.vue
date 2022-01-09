<template>
  <div class="chat">
    <app-toolbar class="chat_toolbar" />
    <chat-drawer />
    <v-main>
      <div class="chat_wrapper"><router-view /></div>
    </v-main>
    <v-dialog v-model="showDialog" persistent width="600">
      <v-card>
        <v-tabs v-model="defaultTab" background-color="primary" dark>
          <v-tab v-for="(tab, key) in tabs" :key="key" :href="'#' + tab.value">
            {{ tab.text }}
          </v-tab>
        </v-tabs>
        <v-card-text class="pa-0">
          <v-tabs-items v-model="defaultTab">
            <v-tab-item key="register" value="register">
              <register-form @form:success="handleRegisterSucess" />
            </v-tab-item>
            <v-tab-item key="login" value="login">
              <login-form @form:success="handleLoginSucess" />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChatDrawer from '@/components/chat/ChatDrawer'
import AppToolbar from '@/components/AppToolbar'
import RegisterForm from '@/components/form/RegisterForm'
import LoginForm from '@/components/form/LoginForm'
export default {
  name: 'LayoutChat',
  components: {
    AppToolbar,
    ChatDrawer,
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      defaultTab: 'register',
      tabs: [
        {
          text: 'Register',
          value: 'register',
        },
        {
          text: 'Login',
          value: 'login',
        },
      ],
    }
  },
  computed: {
    getUsername() {
      return this.$store.getters['auth/getUsername']
    },
    getSocket() {
      return this.$store.getters['chat/getSocket']
    },
    showDialog() {
      return this.getSocket === null
    },
  },
  created() {},
  methods: {
    handleRegisterSucess() {
      this.$store.dispatch('chat/initSocket')
    },
    handleLoginSucess() {},
  },
}
</script>

<style lang="sass" scoped>
.chat_wrapper
  min-height: calc(100vh - 112px)
</style>
