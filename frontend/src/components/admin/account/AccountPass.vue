<template>
  <v-dialog v-model="modal" persistent>
    <v-card class="dialog-token">
      <v-card-title class="headline">
        <v-icon>lock</v-icon> Cambiar mi contraseña
        <v-btn icon @click.native="$store.commit('closeModal')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <form @submit.prevent="changePassword">
        <v-card-text>
          <v-alert color="info" value="true" class="mb-4">Haga click en <v-icon dark>visibility</v-icon> para poder ver/ocultar su contraseña.</v-alert>
          <v-text-field
            label="Antigua contraseña"
            append-icon="lock"
            :append-icon="getIcon"
            :append-icon-cb="changeIcon"
            :type="hidePass ? 'password' : 'text'"
            v-model="form.password"
            maxlength="100"
            :error="$v.form.password.$error"
            @input="$v.form.password.$touch()"
            :error-messages="errors.password"
          ></v-text-field>
          <v-text-field
            label="Nueva contraseña"
            append-icon="lock"
            :append-icon="getIcon"
            :append-icon-cb="changeIcon"
            :type="hidePass ? 'password' : 'text'"
            v-model="form.newPassword"
            maxlength="100"
            :error="$v.form.newPassword.$error"
            @input="$v.form.newPassword.$touch()"
            :error-messages="errors.newPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="$store.commit('closeModal')"><v-icon>cancel</v-icon> {{ $t('common.cancel') }}</v-btn>
          <v-btn color="primary" type="submit"><v-icon dark>lock</v-icon> Cambiar</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import Auth from '@/components/admin/auth/mixins/auth';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import errorsHandler from '@/common/mixins/errorsHandler';

export default {
  mixins: [ Auth, errorsHandler ],
  data () {
    return {
      hidePass: true,
      form: {
        password: '',
        newPassword: ''
      },
      errors: {
        password: [],
        newPassword: []
      }
    };
  },
  validations: {
    form: {
      password: {
        required
      },
      newPassword: {
        required
      }
    }
  },
  computed: {
    ...mapState(['user', 'modal']),
    getIcon () {
      return this.form.password.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
    }
  },
  methods: {
    changePassword () {
      this.hidePass = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let instance = axios.create();
        instance.post(this.$authUrl, {
          usuario: this.$store.state.user.usuario,
          password: this.form.password
        }).then(response => {
          if (response.data) {
            console.log(this.form.password, this.form.newPassword);
            if (this.form.password === this.form.newPassword) {
              this.$message.warning('La nueva contraseña debe ser distinta a la antigua contraseña.');
            } else {
              this.$confirm('¿Está seguro de cambiar su contraseña?.', () => {
                this.$service.patch(`usuarios/${this.$store.state.user.usuario}`, {
                  transicion: 'editar',
                  usuarioNominal: {
                    password: this.form.newPassword
                  }
                }).then(response => {
                  if (response) {
                    this.$message.success(`¡Su contraseña ha sido cambiada correctamente!.`);
                    this.$store.commit('closeModal');
                  }
                });
              });
            }
          }
        }).catch(() => {
          this.$message.error('La contraseña no es correcta.');
        });
      }
    },
    changeIcon () {
      if (this.form.password.length) {
        this.hidePass = !this.hidePass;
      }
    }
  },
  watch: {
    'form.password': function (val) {
      if (val.length === 0) {
        this.hidePass = true;
      }
    },
    'form.newPassword': function (val) {
      if (val.length === 0) {
        this.hidePass = true;
      }
    },
    '$v.form.password.$error': function (val) {
      this.errorHandler(this.$v.form.password, this.errors.password);
    },
    '$v.form.newPassword.$error': function (val) {
      this.errorHandler(this.$v.form.newPassword, this.errors.newPassword);
    },
    '$store.state.modal': function (val) {
      this.$v.form.$reset();
      this.resetForm(this.errors);
      this.form = {
        password: '',
        newPassword: ''
      };
    }
  }
};
</script>
