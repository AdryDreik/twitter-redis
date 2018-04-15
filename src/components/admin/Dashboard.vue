<template>
  <section>
    <h3>Ejemplos</h3>
    <v-card>
      <v-card-text>
        <h4>Buttons</h4>
        <v-btn color="primary"><v-icon>check</v-icon> Button primary</v-btn>
        <v-btn color="success"><v-icon>add</v-icon> Button success</v-btn>
        <v-btn color="warning"><v-icon>warning</v-icon> Button warning</v-btn>
        <v-btn color="error"><v-icon>cancel</v-icon> Button error</v-btn>
        <v-btn color="info"><v-icon>info</v-icon> Button info</v-btn>
        <v-btn><v-icon>add_circle</v-icon> Button secondary</v-btn>
        <hr>

        <h4>FileUploader</h4>
        <file-upload></file-upload>
        <hr>

        <h4>Notificaciones</h4>
        <v-btn @click.native="showMessage('success')" color="success"><v-icon>check</v-icon> Message success</v-btn>
        <v-btn @click.native="showMessage('warning')" color="warning"><v-icon>warning</v-icon> Message warning</v-btn>
        <v-btn @click.native="showMessage('error')" color="error"><v-icon>error</v-icon> Message error</v-btn>
        <v-btn @click.native="showMessage('info')" color="info"><v-icon>info</v-icon> Message info</v-btn>
        <hr>

        <h4>Modal</h4>
        <v-btn @click.native="showAlert()">Alert</v-btn>
        <v-btn @click.native="showConfirm()">Confirm</v-btn>

        <h4>i18n</h4>
        <p>
          {{ $t('common.save') }} | {{ $t('common.required') }}
        </p>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
  import FileUpload from '@/common/util/FileUpload.vue';

  export default {
    components: {
      FileUpload
    },
    methods: {
      showMessage (type) {
        console.log(type, this.$message);
        this.$message[type](`Mensaje tipo ${type}`);
      },
      showAlert () {
        this.$alert('Mensaje de alerta', function () {
          console.log('callback!!');
        });
      },
      showConfirm () {
        this.$confirm('Mensaje de confirmación', function () {
          console.log('ok!!');
        }, function () {
          console.log('cancel!!');
        });
      }
    }
  };
</script>

