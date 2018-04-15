<template>
  <div class="select-date">
    <label>{{ label }}</label>
    <v-layout row wrap>
      <v-flex xs4>
        <div class="form-group">
          <v-text-field
            label="Día"
            v-model="form.day"
            maxlength="2"
            :error="$v.form.day.$error"
            @input="$v.form.day.$touch()"
            @keydown.native="$filter.numeric($event)"
            ></v-text-field>
          <span class="form-error" v-if="!$v.form.day.required">{{ $t('validate.required')}}</span>
        </div>
      </v-flex>
      <v-flex xs4>
        <div class="form-group">
          <v-text-field
            label="Mes"
            v-model="form.month"
            maxlength="2"
            :error="$v.form.month.$error"
            @input="$v.form.month.$touch()"
            @keydown.native="$filter.numeric($event)"
            ></v-text-field>
          <span class="form-error" v-if="!$v.form.month.required">{{ $t('validate.required')}}</span>
        </div>
      </v-flex>
      <v-flex xs4>
        <div class="form-group">
          <v-text-field
            label="Año"
            v-model="form.year"
            maxlength="4"
            :error="$v.form.year.$error"
            @input="$v.form.year.$touch()"
            @keydown.native="$filter.numeric($event)"
            ></v-text-field>
          <span class="form-error" v-if="!$v.form.year.required">{{ $t('validate.required')}}</span>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { required, numeric, maxLength } from 'vuelidate/lib/validators';
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        form: {
          day: '',
          month: '',
          year: ''
        },
        meses: this.$datetime.months,
        selectDate: ''
      };
    },
    validations () {
      let rules = {
        day: {
          numeric,
          maxLength: maxLength(2)
        },
        month: {
          numeric,
          maxLength: maxLength(2)
        },
        year: {
          numeric,
          maxLength: maxLength(4)
        }
      };

      if (this.required) {
        rules.day.required = required;
        rules.month.required = required;
        rules.year.required = required;
      }

      return {
        form: rules
      };
    },
    methods: {
      setSelectDate () {
        if (this.form.year && this.form.year.length === 4 && this.form.month && this.form.day) {
          this.$store.commit('setSelectDate', new Date(this.form.year, this.form.month - 1, this.form.day));
        } else {
          this.$store.commit('setSelectDate', null);
        }
      }
    },
    watch: {
      'form.day': function (val) {
        if (val > 31 || (val.length === 2 && val <= 0)) {
          this.form.day = '';
        }
        this.setSelectDate();
      },
      'form.month': function (val) {
        if (val > 12 || (val.length === 2 && val <= 0)) {
          this.form.month = '';
        }
        this.setSelectDate();
      },
      'form.year': function (val) {
        if (val.length === 4 && (val > this.$datetime.now('YYYY') || val < 1900)) {
          this.form.year = '';
        }
        this.setSelectDate();
      },
      '$store.state.touch': function (val) {
        if (!val) {
          this.$v.form.$touch();
        }
        this.$store.commit('setTouch', false);
      }
    }
  };
</script>

<style lang="scss">
  .select-date {
    label {
      color: rgba(0,0,0,0.54);
    }
  }
</style>
