<template>
  <div class="media_drawer">
    <v-navigation-drawer app>
      <v-btn dark height="64" block color="primary" tile>{{ $t('media') }}</v-btn>
      <v-list class="media-list pa-0">
        <template v-for="item in items">
          <template v-if="item.heading">
            <v-subheader :key="item.heading">
              {{ item.heading }}
            </v-subheader>
            <v-divider :key="'d' + item.heading" />
          </template>
          <template v-else>
            <v-list-item :key="item.text" link exact :to="item.to">
              <v-list-item-icon v-if="item.icon">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="getIconByExt(item.icon)"></use>
                </svg>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          heading: this.$t('file_type'),
        },
        {
          title: this.$t('video'),
          icon: 'video',
          to: { path: '/media/video' },
        },

        {
          title: this.$t('image'),
          icon: 'jpg',
          to: { path: '/media/image' },
        },
        {
          title: this.$t('document'),
          icon: 'doc',
          to: { path: '/media/doc' },
        },
      ],
    }
  },
  computed: {
    getIconByExt() {
      return this.$store.getters['file/getIconByExt']
    },
  },
}
</script>

<style lang="sass" scoped>
.center-align
    position: absolute
    left: 50%
    top: 50%
    transform: translateY(-50%) translateX(-50%)
.icon
  width: 42px
  height: 42px
  vertical-align: -0.15em
  fill: currentColor
  overflow: hidden
</style>
