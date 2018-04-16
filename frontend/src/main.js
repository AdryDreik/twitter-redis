import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import VueI18n from 'vue-i18n';
import VueProgressBar from 'vue-progressbar';

// LOCAL
import App from '@/App';
import router from '@/router';
import store from '@/store';

// Plugins
import EventBus from '@/common/plugins/event-bus';
import Util from '@/common/plugins/util';
import Storage from '@/common/plugins/storage';
import Message from '@/common/plugins/message/message';
import Service from '@/common/plugins/service';
import Modal from '@/common/plugins/modal/modal';
import Datetime from '@/common/plugins/datetime';
import Filter from '@/common/plugins/filter';
import messages from '@/common/lang/';

// Vendor
Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(VueProgressBar, {
  color: '#52d1e1',
  failedColor: '#fc4b6c',
  thickness: '4px'
});

// i18n config
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: process.env.LANG,
  messages
});

// Store Vuex
Vue.use(store);

// Plugins config
Vue.use(EventBus);
Vue.use(Util);
Vue.use(Storage);
Vue.use(Message, { timeout: 6000 });
Vue.use(Service, {
  apiUrl: process.env.API_URL,
  authUrl: process.env.AUTH_URL,
  authToken: process.env.AUTH_TOKEN
  /* filterResponse: (response, Message) => {
    if (response.datos) {
      response = response.datos;
    } else {
      if (!response.finalizado) {
        Message.error(response.mensaje);
        response = response.datos;
      }
    }
    return response;
  } */
});
Vue.use(Modal);
Vue.use(Datetime);
Vue.use(Filter);

Vue.config.productionTip = false;
Vue.config.debug = process.env.DEBUG_MODE;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
});
