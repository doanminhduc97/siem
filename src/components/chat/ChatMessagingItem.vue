<template>
  <div class="messaging_item" :class="rowReverse">
    <div class="messaging_item__avatar">
      <c-avatar :size="36" :username="username" :src="computeAvatar(username)" status="online" />
    </div>
    <div class="messaging_item__body">
      <div class="pa-2">
        {{ text }}
      </div>
      <div class="caption px-2 text--secondary">
        {{ createdAt | formateDate }}
      </div>
    </div>
  </div>
</template>

<script>
import CAvatar from '@/components/avatar/CAvatar'
import { format } from 'date-fns'
export default {
  components: {
    CAvatar,
  },
  filters: {
    formateDate(val) {
      return format(val, 'yyyy-MM-dd H:mm:s')
    },
  },
  props: {
    username: [Number, String],
    status: [Number, String],
    text: [String],
    createdAt: [String, Number],
  },
  data() {
    return {}
  },
  computed: {
    getAvatar() {
      return this.$store.getters['auth/getAvatar']
    },
    getUsername() {
      return this.$store.getters['auth/getUsername']
    },
    getClientId() {
      return this.$store.getters['chat/getClientId']
    },
    getStatusByName() {
      return this.$store.getters['chat/getStatusByName']
    },
    isMyOwn() {
      return this.username === this.getUsername
    },
    rowReverse() {
      return {
        'flex-row-reverse': !this.isMyOwn,
      }
    },
  },
  methods: {
    computeAvatar(username) {
      return this.getUsername === username ? this.getAvatar : ''
    },
  },
}
</script>

<style lang="sass" scoped>
.messaging_item
  display: flex
  margin-top: 25px
  &__avatar
    margin: 0 25px
  &__body
    // flex: 1 1 auto
    background: #eee
</style>
