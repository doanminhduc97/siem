<template>
  <v-card :loading="loading" tile>
    <v-card-title>{{ formTitle }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col :cols="6">
            <v-text-field
              v-model="formModel.username"
              outlined
              :label="form.username.label"
              :placeholder="form.username.placeholder"
              required
              :append-icon="'mdi-account-check'"
              :rules="form.username.rules"
            />
          </v-col>
          <v-col v-if="!userId" :cols="6">
            <v-text-field
              v-model="formModel.password"
              outlined
              :label="form.password.label"
              :placeholder="form.password.placeholder"
              required
              :append-icon="'mdi-account-check'"
              :rules="form.password.rules"
            />
          </v-col>
          <v-col :cols="6">
            <v-text-field
              v-model="formModel.email"
              outlined
              :label="form.email.label"
              :placeholder="form.email.placeholder"
              required
              :append-icon="'mdi-email'"
              :rules="form.email.rules"
            />
          </v-col>
          <v-col :cols="6">
            <v-text-field
              v-model="formModel.phone"
              outlined
              :label="form.phone.label"
              :placeholder="form.phone.placeholder"
              required
              :append-icon="'mdi-phone'"
              :rules="form.phone.rules"
            />
          </v-col>
          <v-col :cols="6">
            <v-text-field
              v-model="formModel.firstname"
              outlined
              :label="form.firstname.label"
              :placeholder="form.firstname.placeholder"
              :append-icon="'mdi-location'"
              required
              :rules="form.firstname.rules"
            />
          </v-col>
          <v-col :cols="6">
            <v-text-field
              v-model="formModel.lastname"
              outlined
              :label="form.lastname.label"
              :placeholder="form.lastname.placeholder"
              required
              :rules="form.lastname.rules"
            />
          </v-col>
          <v-col :cols="6">
            <v-select
              v-model="formModel.gender"
              outlined
              :label="form.gender.label"
              :placeholder="form.gender.placeholder"
              :rules="form.gender.rules"
              :items="genders"
              required
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider class="mt-5"></v-divider>
    <v-card-actions>
      <v-btn text @click="handleCancelForm">Cancel</v-btn>
      <v-spacer />
      <v-btn :loaidng="loading" tile color="primary" @click="handleSubmitForm">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { EMAIL } from '@/util/regex'
export default {
  props: {
    userId: [Number, String],
  },
  data: () => ({
    genders: ['male', 'female', 'other'],
    valid: true,
    loading: false,
    formModel: {
      username: null,
      password: null,
      email: null,
      phone: null,
      firstname: null,
      lastname: null,
      gender: 'male',
    },

    form: {
      username: {
        label: 'Username',
        placeholder: 'Tookit',
        rules: [(v) => !!v || 'This field is required'],
      },
      password: {
        label: 'Password',
        placeholder: 'xxx',
        rules: [(v) => !!v || 'This field is required'],
      },
      email: {
        label: 'Email',
        placeholder: 'wangqiangshen@gmail.com',
        rules: [(v) => !!v || 'This field is required', (v) => EMAIL.test(v) || 'Invalid email'],
      },
      phone: {
        label: 'phone',
        placeholder: '18682157492',
        rules: [(v) => !!v || 'This field is required'],
      },
      firstname: {
        label: 'Firstname',
        placeholder: 'Firstname',
        rules: [(v) => !!v || 'This field is required'],
      },
      lastname: {
        label: 'Lastname',
        placeholder: 'Lastname',
        rules: [(v) => !!v || 'This field is required'],
      },
      gender: {
        label: 'Gender',
        placeholder: 'gender',
        rules: [(v) => !!v || 'This field is required'],
      },
    },

    formHasErrors: false,
  }),
  computed: {
    formTitle() {
      return !this.userId ? 'Create User' : 'Edit User'
    },
  },
  watch: {
    userId: {
      handler(id) {
        if (id) {
          this.getItemById(id)
        }
      },
      immediate: true,
    },
  },
  methods: {
    getItemById(id) {
      this.loading = true
      this.$store
        .dispatch('user/getUserById', id)
        .then(({ data }) => {
          this.formModel = data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCancelForm() {
      this.$refs.form.reset()
    },
    handleSubmitForm() {
      this.loading = true
      if (this.$refs.form.validate()) {
        if (this.userId) {
          this.updateUser(this.userId)
        } else {
          this.createUser()
        }
      }
    },
    updateUser() {
      this.$store
        .dispatch('user/updateUser', {
          id: this.userId,
          data: this.formModel,
        })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    createUser() {
      this.$store
        .dispatch('user/createUser', this.formModel)
        .then(({ data }) => {
          this.loading = false
          this.$router.push({
            path: `/acl/user/item/${data.id}`,
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
