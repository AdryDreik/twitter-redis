import Vue from 'vue';
import Vuex from 'vuex';
import tramite from './modules/tramite';

import modal from '@/common/plugins/modal/mixins/modal';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    main: true,
    time: null,
    sessionInterval: null,
    toggle: true,
    auth: false,
    menu: {},
    user: {},
    rol: '',
    breadcrumbs: {},
    sidenav: false,
    alert: {
      show: false,
      text: '',
      callback: null
    },
    confirm: {
      show: false,
      text: '',
      callbackOk: null,
      callbackCancel: null,
      textOk: '',
      textCancel: ''
    },
    modal: false,
    data: {},
    state403: false,
    touch: false,
    message: null,
    selectDate: null
  },
  mutations: {
    toggleSidenav (state) {
      state.toggle = !state.toggle;
    },
    setToogle (state, value) {
      state.toggle = value;
    },
    openModal (state) {
      state.modal = true;
    },
    closeModal (state) {
      state.modal = false;
    },
    setSelectDate (state, value) {
      state.selectDate = value;
    },
    setTouch (state, value) {
      state.touch = value;
    },
    setMain (state, value) {
      state.main = value;
    },
    setDefault (state) {
      state.auth = false;
      state.menu = {};
      state.user = {};
      state.rol = '';
      state.breadcrumbs = {};
      state.modal = false;
      state.state403 = false;
      state.message = null;
      state.alert.show = false;
      state.confirm.show = false;
      state.selectDate = null;
      document.removeEventListener('keydown', modal.methods.bloquear, false);
    },
    CLOSE_ALERT (state) {
      state.alert.show = false;
      document.removeEventListener('keydown', modal.methods.bloquear, false);
    },
    CLOSE_CONFIRM (state) {
      state.confirm.show = false;
      document.removeEventListener('keydown', modal.methods.bloquear, false);
    },
    SET_TIME (state, value) {
      state.time = value;
    },
    TIME_DECREASE (state) {
      state.time--;
    }
  },
  modules: {
    tramite
  }
});

export default store;
