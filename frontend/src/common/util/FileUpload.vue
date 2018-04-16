<template>
  <div>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>
<script>
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.css';

  export default {
    data () {
      return {
        maxNumberOfFiles: 2,
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { 'My-Awesome-Header': 'header value' },
          dictDefaultMessage: 'Sube tus archivos aqui',
          dictFallbackMessage: 'Tu navegador no soporta drag and drop.',
          dictFallbackText: 'Usa el formulario de abajo para subir tus archivos como en los viejos tiempos.',
          dictFileTooBig: 'Archivo muy grande ({{filesize}}MiB). Máximo permitido: {{maxFilesize}}MiB.',
          dictInvalidFileType: 'No puede subir este tipo de archivo',
          dictResponseError: 'El servidor respondió con código {{statusCode}}.',
          dictCancelUpload: 'Cancelar subida.',
          dictCancelUploadConfirmation: 'Esta seguro que quiere cancelar?',
          dictRemoveFile: 'Eliminar archivo',
          dictMaxFilesExceeded: 'No puede subir mas archivos.'
        }
      };
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  };
</script>
