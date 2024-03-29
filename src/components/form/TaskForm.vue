<template>
  <v-form-builder
    ref="builder"
    v-model="formModel"
    :title="formTitle"
    :items="formItems"
    :loading="loading"
    color="primary"
    show-header
    @form:submit="handleSubmit"
    @form:cancel="$emit('form:cancel')"
  />
</template>

<script>
import { VFormBuilder } from '@tookit/vma'
import { VTextField, VTextarea, VAutocomplete } from 'vuetify/lib'
import VEditor from '@/components/editor/VEditor'
export default {
  components: {
    VFormBuilder,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      loading: false,
      formModel: {},
    }
  },
  computed: {
    getProjectList() {
      return this.$store.getters['task/getProjectList']
    },
    getTaskStatus() {
      return this.$store.getters['task/getTaskStatus']
    },
    formTitle() {
      return this.item ? 'Edit Task - ' + this.item.name : 'Create Task'
    },
    formItems() {
      return [
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'name',
            required: true,
            outlined: true,
            rules: [(v) => !!v || 'Name is required'],
          },
        },
        {
          cols: 6,
          element: VTextField,
          props: {
            name: 'owner',
            required: true,
            outlined: true,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            name: 'project_id',
            label: 'Project',
            outlined: true,
            items: this.getProjectList,
          },
        },
        {
          cols: 6,
          element: VAutocomplete,
          props: {
            label: 'Status',
            name: 'status',
            outlined: true,
            items: this.getTaskStatus,
          },
        },
        {
          cols: 12,
          element: VTextarea,
          props: {
            name: 'description',
            outlined: true,
          },
        },
        {
          cols: 12,
          element: VEditor,
          default: 'type',
          props: {
            name: 'content',
            outlined: true,
          },
        },
      ]
    },
  },
  watch: {
    item: {
      handler(item) {
        this.formModel = item ? this.mergeData(this.formData(), item) : this.formData()
      },
      immediate: true,
    },
  },
  created() {
    this.$store.dispatch('task/fetchProject')
  },
  methods: {
    mergeData(source, target) {
      for (let key in source) {
        source[key] = target[key]
      }
      return source
    },
    formData() {
      const model = {}
      this.formItems.forEach((item) => {
        model[item.props.name] = item.default || null
      })
      return model
    },
    handleSubmit() {
      const form = this.$refs.builder.$refs.form
      if (form.validate()) {
        this.loading = true
        const data = this.transformData(this.formModel)
        if (this.item && this.item.id) {
          return this.$store
            .dispatch('task/updateTask', {
              id: this.item.id,
              data: data,
            })
            .then(() => {
              this.$emit('form:success')
              this.loading = false
            })
            .catch(() => {
              this.$emit('form:fail')
              this.loading = false
            })
        } else {
          return this.$store
            .dispatch('task/createTask', data)
            .then(() => {
              this.$emit('form:success')
              this.loading = false
            })
            .catch(() => {
              this.$emit('form:fail')
              this.loading = false
            })
        }
      }
    },
    transformData(data) {
      return data
    },
  },
}
</script>
