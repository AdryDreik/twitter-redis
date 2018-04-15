<template>
  <section>
    <h3 class="info--text"><v-icon color="info">business</v-icon> {{ $t('entity.title') }}</h3>
    <v-card>
      <v-card-text>
        <crud-table
          :headers="headers"
          :url="url"
          :filters="filters"
        >
          <template slot="buttons">
            <v-tooltip bottom>
             <v-btn color="primary" dark
               @click.native.stop="openModal()"
               slot="activator"
             ><v-icon dark>add</v-icon> {{$t('common.add') }}</v-btn>
             <span>{{$t('entity.add')}}</span>
           </v-tooltip>
          </template>

          <template slot="form">
            <v-card-title class="headline">
              <v-icon>business</v-icon> {{ form.id ? $t('entity.crud.editEnt') :  $t('entity.crud.addEnt') }}
              <v-btn icon @click.native="$store.commit('closeModal')">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <form @submit.prevent="save">
              <v-card-text>
                <v-text-field
                  name="codigo"
                  :label="$t('entity.crud.code')"
                  id="codigo"
                  v-model="form.codigo"
                  maxlength="20"
                  :error="$v.form.codigo.$error"
                  @input="$v.form.codigo.$touch()"
                  :error-messages="errors.codigo"
                ></v-text-field>

                <v-text-field
                  name="sigla"
                  :label="$t('entity.crud.acronym')"
                  id="sigla"
                  v-model="form.sigla"
                  maxlength="10"
                  :error="$v.form.sigla.$error"
                  @input="$v.form.sigla.$touch()"
                  :error-messages="errors.sigla"
                ></v-text-field>

                <v-text-field
                  name="descripcion"
                  :label="$t('entity.crud.description')"
                  id="descripcion"
                  v-model="form.descripcion"
                  maxlength="150"
                  :error="$v.form.descripcion.$error"
                  @input="$v.form.descripcion.$touch()"
                  :error-messages="errors.descripcion"
                ></v-text-field>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="$store.commit('closeModal');"><v-icon>cancel</v-icon> {{$t('common.cancel') }}</v-btn>
                <v-btn color="primary" type="submit"><v-icon dark>check</v-icon> {{$t('common.save') }}</v-btn>
              </v-card-actions>
            </form>
          </template>

          <template slot="items" slot-scope="items">
            <td><v-btn icon small @click.native="editItem(items.item.id)"><v-icon>edit</v-icon></v-btn></td>
            <td>
                <v-tooltip bottom>
                 <v-switch v-model="items.item.active" value="ACTIVE"
                   @change="changeActive(items.item, items.item.id)"
                   v-if="idEntidad != items.item.id"
                   slot="activator"
                   color="info"></v-switch>
                 <span>Activar/desactivar registro</span>
               </v-tooltip>
              <v-tooltip bottom>
               <v-btn icon
                 v-if="idEntidad == items.item.id"
                 slot="activator">
                 <v-icon>business</v-icon>
               </v-btn>
               <span>Esta es mi entidad.</span>
             </v-tooltip>
            </td>
            <td>{{ items.item.codigo }}</td>
            <td>{{ items.item.sigla }}</td>
            <td>{{ items.item.descripcion }}</td>
            <td>
              <v-alert success hide-icon :value="true" v-if="items.item.estado == 'VERIFICADO'">
                {{ items.item.estado }}
              </v-alert>
              <v-alert color="warning" hide-icon :value="true" v-if="items.item.estado == 'INACTIVO'">
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
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [ crud, errorsHandler ],
  created () {
    this.user = this.$storage.getUser();
    this.idEntidad = this.user.idEntidad;
  },
  data () {
    return {
      url: 'entidades',
      headers: [
        { text: this.$t('common.edit'), sortable: false },
        { text: this.$t('common.active'), sortable: false },
        { text: this.$t('entity.crud.code'), value: 'codigo' },
        { text: this.$t('entity.crud.acronym'), value: 'sigla' },
        { text: this.$t('entity.crud.description'), value: 'descripcion' },
        { text: this.$t('common.status'), value: 'estado' }
      ],
      form: {
        'codigo': '',
        'sigla': '',
        'descripcion': ''
      },
      filters: [
        {
          field: 'sigla',
          label: this.$t('entity.crud.acronym'),
          type: 'text'
        },
        {
          field: 'descripcion',
          label: this.$t('entity.crud.description'),
          type: 'text'
        },
        {
          field: 'estado',
          label: this.$t('entity.crud.status'),
          type: 'select',
          items: [
            { value: '', text: 'TODOS' },
            { value: 'VERIFICADO', text: 'VERIFICADO' },
            { value: 'INACTIVO', text: 'INACTIVO' }
          ]
        }
      ],
      errors: {
        codigo: [],
        sigla: [],
        descripcion: []
      },
      idEntidad: null
    };
  },
  validations: {
    form: {
      codigo: {
        required
      },
      sigla: {
        required
      },
      descripcion: {
        required
      }
    }
  },
  methods: {
    openModal (data = {}) {
      if (data.id) {
        this.form = data;
      } else {
        this.form = {
          'codigo': '',
          'sigla': '',
          'descripcion': ''
        };
      }
      this.$store.commit('openModal');
    },
    save () {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let data = {
          transicion: this.form.id ? 'editar' : 'crear',
          codigo: this.form.codigo,
          sigla: this.form.sigla,
          descripcion: this.form.descripcion
        };
        this.$service[this.form.id ? 'patch' : 'post'](this.url + (this.form.id ? `/${this.form.id}` : ''), data)
        .then(response => {
          if (response) {
            this.$store.commit('closeModal');
            this.updateList();
            this.$message.success();
          }
        });
      }
    }
  },
  components: {
    CrudTable
  },
  watch: {
    '$v.form.codigo.$error': function (val) {
      this.errorHandler(this.$v.form.codigo, this.errors.codigo);
    },
    '$v.form.sigla.$error': function (val) {
      this.errorHandler(this.$v.form.sigla, this.errors.sigla);
    },
    '$v.form.descripcion.$error': function (val) {
      this.errorHandler(this.$v.form.descripcion, this.errors.descripcion);
    },
    '$store.state.modal': function (val) {
      this.resetForm(this.errors);
      this.$v.form.$reset();
    }
  }
};
</script>
