<template>
  <section>
    <h3 class="info--text"><v-icon color="info">person_outline</v-icon> {{$t('app.account') }}</h3>
    <v-card class="success white--text account">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs8>
            <div>
              <div class="headline">{{ user.nombre }}</div>
              <p>@{{ user.usuario }}</p>
              <div class="account-info">
                <p><strong>{{ user.tipoDocumento }}:</strong> {{ user.numeroDocumento }}</p>
                <p><strong>{{ $t('account.crud.entity') }}:</strong> {{ user.entidad }}</p>
                <p><strong>{{ $t('user.crud.role') }}:</strong> {{ user.rol }}</p>
              </div>
            </div>
          </v-flex>
          <v-flex xs4 class="center-flex">
            <div class="sidenav-user__photo">{{ inicial }}</div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions v-if="user.idRol == 1">
        <v-spacer></v-spacer>
        <v-btn @click.native="openPass()"><v-icon>lock</v-icon> Cambiar contraseña</v-btn>
        <v-btn @click.native="openDeactivate()" error><v-icon dark>cancel</v-icon> Desactivar cuenta</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Dialog para la desactivación -->
    <v-dialog v-model="modalDeactivate" persistent>
      <v-card class="dialog-token">
        <v-card-title class="headline">
          <v-icon>cancel</v-icon> Desactivar mi cuenta
          <v-btn icon @click.native="modalDeactivate = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <form @submit.prevent="deactivate">
          <v-card-text>
            <v-alert color="warning" value="true">Una vez desactivada su cuenta si desea volver a habilitarla deberá contactarse con el administrador del sistema.</v-alert>
            <v-alert color="info" value="true" class="mb-4">Ingrese su contraseña para confirmar la desactivación de su cuenta.</v-alert>
            <v-text-field
              name="password"
              :label="$t('login.password')"
              id="password"
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.native="modalDeactivate = false"><v-icon>cancel</v-icon> {{ $t('common.cancel') }}</v-btn>
            <v-btn error type="submit"><v-icon dark>vpn_key</v-icon> Desactivar</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <!-- Dialog para el cambio de contraseña -->
    <account-pass></account-pass>

  </section>
</template>

<script>
import axios from 'axios';
import Auth from '@/components/admin/auth/mixins/auth';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import errorsHandler from '@/common/mixins/errorsHandler';
import AccountPass from './AccountPass';
import Layout from '@/common/layout/mixins/layout';

export default {
  mixins: [ Auth, errorsHandler, Layout ],
  mounted () {
    this.setActive('account');
  },
  data () {
    return {
      modalDeactivate: false,
      hidePass: true,
      form: {
        password: ''
      },
      errors: {
        password: []
      }
    };
  },
  validations: {
    form: {
      password: {
        required
      }
    }
  },
  components: { AccountPass },
  computed: {
    ...mapState(['user']),
    inicial () {
      let user = this.$store.state.user;
      if (user.usuario) {
        return (user.usuario[0] || '?').toUpperCase();
      }
      return '?';
    },
    getIcon () {
      return this.form.password.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
    }
  },
  methods: {
    openPass () {
      this.$store.commit('openModal');
    },
    openDeactivate () {
      this.errors.password = [];
      this.form.password = '';
      this.hidePass = true;
      this.$v.form.$reset();
      this.modalDeactivate = true;
    },
    deactivate () {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let instance = axios.create();
        instance.post(this.$authUrl, {
          usuario: this.$store.state.user.usuario,
          password: this.form.password
        }).then(response => {
          if (response.data) {
            this.$confirm('¿Realmente quiere desactivar su cuenta?.', () => {
              this.$service.patch(`usuarios/${this.$store.state.user.usuario}`, { 'transicion': 'inactivar' })
              .then(response => {
                if (response) {
                  this.$message.success(`¡Su cuenta ha sido desactivada!`);
                  this.logout();
                }
              });
            }, () => {
              this.modalDeactivate = false;
            });
          }
        }).catch(() => {
          this.$message.error('La contraseña no es correcta');
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
    '$v.form.password.$error': function (val) {
      this.errorHandler(this.$v.form.password, this.errors.password);
    }
  }
};
</script>

<style lang="scss">
@import '../../../assets/scss/base/_variables.scss';
.account {
  background: transparent url(../../../../static/images/mountains.png) no-repeat;
  background-size: cover;

  .sidenav-user__photo {
    background-color: $info;
    height: 120px;
    width: 120px;
    font-size: 5rem;
    line-height: 112px;
    margin: 0;
  }

  .account-info {
    background-color: rgba(255, 255, 255, .8);
    color: #777;
    padding: 20px;

    p {
      margin-bottom: 5px;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  .card__actions {
    padding: 15px;
    background-color: white;
  }
}
.center-flex {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
