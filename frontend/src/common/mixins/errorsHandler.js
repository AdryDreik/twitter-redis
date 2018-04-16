export default {
  methods: {
    errorHandler (errors, arr) {
      if (errors.required !== undefined) {
        if (!errors.required) {
          if (arr.indexOf(this.$t('validate.required')) === -1) {
            arr.push(this.$t('validate.required'));
          }
        } else {
          this.$util.removeItem(arr, this.$t('validate.required'));
        }
      }

      if (errors.url !== undefined) {
        if (!errors.url) {
          if (arr.indexOf(this.$t('validate.url')) === -1) {
            arr.push(this.$t('validate.url'));
          }
        } else {
          this.$util.removeItem(arr, this.$t('validate.url'));
        }
      }
    },

    resetForm (obj) {
      for (let key in obj) {
        obj[key] = [];
      }
    }
  }
};
