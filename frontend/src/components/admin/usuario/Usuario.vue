<template>
  <section>
    <h3 class="info--text"><v-icon info>person_outline</v-icon> {{$t('user.title') }}</h3>
    <v-card>
      <v-card-text>
        <crud-table
          :headers="headers"
          :url="url"
          :filters="filters"
        >
          <template slot="buttons">
            <v-tooltip bottom>
              <v-btn primary dark
                @click.native.stop="openModal()"
                slot="activator"
              ><v-icon dark>person_add</v-icon> {{$t('common.add') }}</v-btn>
              <span>{{$t('user.add')}}</span>
            </v-tooltip>
          </template>

          <template slot="form" slot-scope="props">
            <v-card-title class="headline">
              <v-icon>{{ form.id ? 'person' : 'person_add' }}</v-icon> {{ form.id ? $t('user.crud.editUser') : $t('user.crud.addUser') }}
              <v-btn icon @click.native="$store.commit('closeModal')">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <form @submit.prevent="save">
              <v-alert info v-if="form.nombre" hide-icon value="true" class="datos-usuario">
                {{ form.nombre }} <br>
                <small>
                  <strong>Nombre de usuario: </strong> {{ form.usuarioLogin }} <br>
                  <strong>C.I.: </strong> {{ form.ci }} {{ form.complemento }} <br>
                  <strong>Fecha de nacimiento: </strong> {{ $datetime.toString(form.fechaNacimiento) }} <br>
                  <strong>Entidad: </strong> {{ entidadUsuario }}
                </small>
              </v-alert>
              <v-card-text>
                <div v-if="!form.id">
                  <v-select
                    :items="entidades"
                    v-model="form.entidad"
                    label="Entidad"
                    item-text="descripcion"
                    item-value="id"
                    autocomplete
                    noDataText="No hay resultados"
                    :error="$v.form.entidad.$error"
                    @input="$v.form.entidad.$touch()"
                    :error-messages="errors.entidad"
                    ></v-select>
                </div>

                <v-select
                  :items="roles"
                  v-model="form.rol"
                  label="Rol"
                  item-text="text"
                  item-value="id"
                  :error="$v.form.rol.$error"
                  @input="$v.form.rol.$touch()"
                  :error-messages="errors.rol"
                  ></v-select>

                <div v-if="!form.id">
                  <v-text-field
                    label="Nombre de usuario"
                    append-icon="person"
                    v-model="form.usuarioLogin"
                    maxlength="20"
                    :error="$v.form.usuarioLogin.$error"
                    @input="$v.form.usuarioLogin.$touch()"
                    :error-messages="errors.usuarioLogin"
                    autocomplete="off"
                    ></v-text-field>
                </div>

                <v-text-field
                  v-if="form.usuarioLogin != usuario || !form.id"
                  label="Contraseña"
                  type="password"
                  v-model="form.password"
                  :append-icon="getIcon"
                  :append-icon-cb="changeIcon"
                  :type="hidePass ? 'password' : 'text'"
                  maxlength="100"
                  :error="$v.form.password.$error"
                  @input="$v.form.password.$touch()"
                  :error-messages="errors.password"
                  autocomplete="off"
                  ></v-text-field>

                <div v-if="!form.id">
                  <v-layout row wrap>
                    <v-flex xs7>
                      <v-text-field
                        label="Cédula de identidad"
                        v-model="form.ci"
                        maxlength="20"
                        :error="$v.form.ci.$error"
                        @input="$v.form.ci.$touch()"
                        :error-messages="errors.ci"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs5>
                      <v-text-field
                        label="Complemento"
                        v-model="form.complemento"
                        maxlength="2"
                        ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <select-date label="Fecha de nacimiento" :required="true" v-if="showDate"></select-date>
                </div>
              </v-card-text>
              <v-alert color="info" value="true" v-if="form.usuarioLogin == usuario && form.id">
                Puede cambiar su contraseña yendo a: <br> <router-link to="/account" class="white--text"><strong><v-icon dark class="icon-small">person</v-icon> {{ $t('app.account') }}</strong></router-link>.
              </v-alert>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="$store.commit('closeModal');"><v-icon>cancel</v-icon> {{$t('common.cancel') }}</v-btn>
                <v-btn color="primary" type="submit"><v-icon dark>check</v-icon> {{$t('common.save') }}</v-btn>
              </v-card-actions>
            </form>
          </template>

          <template slot="items" slot-scope="items">
            <td>
              <v-btn icon small v-if="items.item.rol.id != 3"
                @click.native="editItem(items.item.usuarioNominal.usuarioLogin)"><v-icon>edit</v-icon></v-btn>
            </td>
            <td :class="{ 'text-xs-center': usuario == items.item.usuarioNominal.usuarioLogin }">
                <v-tooltip right>
                  <v-switch v-model="items.item.active" value="ACTIVE"
                    @change="changeActive(items.item, items.item.usuarioNominal.usuarioLogin)"
                    v-if="usuario != items.item.usuarioNominal.usuarioLogin && items.item.rol.id != 3"
                    slot="activator"
                    color="info"></v-switch>
                  <span>Activar/desactivar registro</span>
                </v-tooltip>
              <v-tooltip right>
                <router-link
                  to="/account"
                  v-if="usuario == items.item.usuarioNominal.usuarioLogin"
                  slot="activator">
                  <v-icon>person</v-icon>
                </router-link>
                <span>Este usuario soy yo, clic aquí para ir a mi cuenta.</span>
              </v-tooltip>
            </td>
            <td>{{ items.item.usuarioNominal.usuarioLogin }}</td>
            <td>
              {{ items.item.usuarioNominal.persona.nombre }} <br>
              <small>
                <strong>{{ items.item.usuarioNominal.persona.tipoDocumento }}:</strong>
                {{ items.item.usuarioNominal.persona.numeroDocumento }} {{ items.item.usuarioNominal.persona.complemento }}
                </small>
            </td>
            <td>{{ items.item.entidad.descripcion }}</td>
            <td>{{ items.item.rol.rol }}</td>
            <td>
              <v-alert success hide-icon :value="true" v-if="items.item.estado == 'VERIFICADO'">
                {{ items.item.estado }}
              </v-alert>
              <v-alert warning hide-icon :value="true" v-if="items.item.estado == 'INACTIVO'">
                {{ items.item.estado }}
              </v-alert>
            </td>
          </template>
        </crud-table>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>

import CrudTable from '@/common/util/crud-table/CrudTable.vue';
import crud from '@/common/util/crud-table/mixins/crud-table';
import errorsHandler from '@/common/mixins/errorsHandler';
import Auth from '@/components/admin/auth/mixins/auth';
import SelectDate from '@/common/util/SelectDate.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [ crud, errorsHandler, Auth ],
  created () {
    this.user = this.$storage.getUser();
    this.usuario = this.user.usuario;
    this.entidades = [];
    this.$service.get('entidades?limite=-1')
    .then(response => {
      if (response && response.datos) {
        this.entidades = response.datos;
      }
    });
    this.roles = [
      { id: 1, text: 'ADMINISTRADOR' },
      { id: 2, text: 'ENTIDAD' }
    ];
  },
  data () {
    return {
      dateFormat: val => {
        let date = new Date(val).toISOString().substr(0, 10).split('-');
        return [date[2], date[1], date[0]].join('/');
      },
      url: 'usuarios',
      headers: [
        { text: this.$t('user.crud.edit'), sortable: false },
        { text: this.$t('common.active'), sortable: false },
        { text: this.$t('user.crud.user'), value: 'usuarioLogin' },
        { text: this.$t('user.crud.userData'), value: 'nombre' },
        { text: this.$t('user.crud.entity'), value: 'descripcionEntidad' },
        { text: this.$t('user.crud.role'), value: 'rol' },
        { text: this.$t('user.crud.status'), value: 'estado' }
      ],
      hidePass: true,
      form: {
        'entidad': '',
        'rol': '',
        'usuarioLogin': '',
        'password': '',
        'ci': '',
        'complemento': '',
        'fechaNacimiento': ''
      },
      errors: {
        entidad: [],
        rol: [],
        usuarioLogin: [],
        password: [],
        ci: [],
        complemento: [],
        fechaNacimiento: []
      },
      filters: [
        {
          field: 'usuarioLogin',
          label: this.$t('user.crud.user'),
          type: 'text'
        },
        {
          field: 'nombre',
          label: this.$t('user.crud.userData'),
          type: 'text'
        },
        {
          field: 'descripcion',
          label: this.$t('user.crud.entity'),
          type: 'text'
        },
        {
          field: 'rol',
          label: this.$t('user.crud.role'),
          type: 'select',
          items: [
            { value: '', text: 'TODOS' },
            { value: 'ADMINISTRADOR', text: 'ADMINISTRADOR' },
            { value: 'ENTIDAD', text: 'ENTIDAD' },
            { value: 'BUSA', text: 'BUSA' }
          ]
        },
        {
          field: 'estado',
          label: this.$t('user.crud.status'),
          type: 'select',
          items: [
            { value: '', text: 'TODOS' },
            { value: 'VERIFICADO', text: 'VERIFICADO' },
            { value: 'INACTIVO', text: 'INACTIVO' }
          ]
        }
      ],
      usuario: null,
      menu: false,
      modal: false,
      showDate: false
    };
  },
  validations: {
    form: {
      entidad: {
        required
      },
      rol: {
        required
      },
      usuarioLogin: {
        required
      },
      password: {
        required
      },
      ci: {
        required
      },
      fechaNacimiento: {
      }
    }
  },
  methods: {
    changeIcon () {
      if (this.form.password.length) {
        this.hidePass = !this.hidePass;
      }
    },
    openModal (data = {}) {
      this.$v.form.$reset();
      this.showDate = false;
      this.$nextTick(function () {
        this.showDate = true;
      });
      if (data.id) {
        this.form = {
          id: data.id,
          entidad: data.entidad.id,
          rol: data.rol.id,
          usuarioLogin: data.usuarioNominal.usuarioLogin,
          password: '',
          nombre: data.usuarioNominal.persona.nombre,
          ci: data.usuarioNominal.persona.numeroDocumento,
          complemento: data.usuarioNominal.persona.complemento,
          fechaNacimiento: data.usuarioNominal.persona.fechaNacimiento
        };
      } else {
        this.form = {
          'entidad': '',
          'rol': '',
          'usuarioLogin': '',
          'password': '',
          'ci': '',
          'complemento': '',
          'fechaNacimiento': ''
        };
      }
      this.$store.commit('openModal');
    },
    save () {
      this.$v.form.$touch();
      this.$store.commit('setTouch', true);

      let valid = !this.$v.form.$invalid;
      if (this.form.id && this.usuario === this.form.usuarioLogin) {
        valid = !this.$filter.empty(this.form.rol);
      }
      if (valid) {
        let data = null;
        if (this.form.id) {
          data = {
            transicion: 'editar',
            rol: {
              id: this.form.rol
            }
          };
          if (this.usuario !== this.form.usuarioLogin) {
            data.usuarioNominal = {
              password: this.form.password
            };
          }
        } else {
          if (!this.$store.state.selectDate) {
            return false;
          }
          data = {
            transicion: 'crear',
            usuarioNominal: {
              usuarioLogin: this.form.usuarioLogin,
              password: this.form.password,
              persona: {
                ci: this.form.ci,
                fechaNacimiento: this.dateFormat(this.$store.state.selectDate),
                complemento: this.form.complemento || ''
              }
            },
            entidad: {
              id: this.form.entidad
            },
            rol: {
              id: this.form.rol
            }
          };
        }
        this.$service[this.form.id ? 'patch' : 'post'](this.url + (this.form.id ? `/${this.form.usuarioLogin}` : ''), data)
        .then(response => {
          if (response) {
            if (this.usuario === this.form.usuarioLogin) {
              this.$message.warning('Debe iniciar su sesión nuevamente porque sus permisos han cambiado.');
              this.logout();
            } else {
              this.$store.commit('closeModal');
              this.updateList();
              this.$message.success();
              this.$store.commit('setSelectDate', null);
            }
          }
        });
      }
    }
  },
  components: {
    CrudTable,
    SelectDate
  },
  computed: {
    getIcon () {
      return this.form.password.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
    },

    entidadUsuario () {
      if (this.entidades) {
        for (let i in this.entidades) {
          if (this.entidades[i].id === this.form.entidad) {
            return this.entidades[i].descripcion;
          }
        }
      }
      return '';
    }
  },
  watch: {
    '$v.form.entidad.$error': function (val) {
      this.errorHandler(this.$v.form.entidad, this.errors.entidad);
    },
    '$v.form.rol.$error': function (val) {
      this.errorHandler(this.$v.form.rol, this.errors.rol);
    },
    '$v.form.usuarioLogin.$error': function (val) {
      this.errorHandler(this.$v.form.usuarioLogin, this.errors.usuarioLogin);
    },
    '$v.form.password.$error': function (val) {
      this.errorHandler(this.$v.form.password, this.errors.password);
    },
    '$v.form.ci.$error': function (val) {
      this.errorHandler(this.$v.form.ci, this.errors.ci);
    },
    '$v.form.fechaNacimiento.$error': function (val) {
      this.errorHandler(this.$v.form.fechaNacimiento, this.errors.fechaNacimiento);
    },
    '$store.state.modal': function (val) {
      this.resetForm(this.errors);
      this.$v.form.$reset();
    }
  }
};
</script>
