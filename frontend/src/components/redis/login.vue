<template>
  <section>
      <div class="loginTwitter">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
          <v-btn
            @click.prevent="enviar"
            color="primary"
          >
          INGRESAR  
          </v-btn>
      </v-form>
      </div>
  </section>
</template>
<script>
export default {
  methods: {
    ingresar () {
      if (this.$refs.form.validate()) {
        this.$service.post('/api/submit', {
          name: this.name
        })
          .then((res) => {
          });
      }
    }
  },
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'El nombre es requerido para el ingreso al sistema',
        v => v.length <= 10 || 'El nombre que elija tiene que ser menor a 10 caracteres'
      ]
    };
  }
};
</script>
<style scope lang="scss">
@import '../../assets/scss/base/_variables.scss';
.loginTwitter {
  border: 1px solid #000;
  background: rgba($color: #FFF, $alpha: 1);
  width: 40%;
  margin: auto;
  padding: 20px;
}
.application--wrap {
  overflow: hidden !important;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#606c88+0,3f4c6b+100;Grey+3D+%232 */
background: #606c88; /* Old browsers */
background: -moz-linear-gradient(top, #606c88 0%, #3f4c6b 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #606c88 0%,#3f4c6b 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #606c88 0%,#3f4c6b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#606c88', endColorstr='#3f4c6b',GradientType=0 ); /* IE6-9 */
}
</style>
