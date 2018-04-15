<template>
  <v-app id="app" :class="{ 'app-login': !auth }">
    <app-sidenav v-if="auth && sidenav"></app-sidenav>
    <app-navbar v-if="auth"></app-navbar>
    <v-content v-if="main">
      <app-breadcrumbs v-if="auth"></app-breadcrumbs>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
    <app-footer></app-footer>
    <app-messages></app-messages>
    <app-alert></app-alert>
    <app-confirm></app-confirm>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
  import AppNavbar from '@/common/layout/AppNavbar';
  import AppSidenav from '@/common/layout/AppSidenav';
  import AppFooter from '@/common/layout/AppFooter';
  import AppBreadcrumbs from '@/common/layout/AppBreadcrumbs';
  import AppMessages from '@/common/plugins/message/AppMessages';

  import AppAlert from '@/common/plugins/modal/AppAlert';
  import AppConfirm from '@/common/plugins/modal/AppConfirm';

  import Auth from '@/components/admin/auth/mixins/auth';

  import { mapState } from 'vuex';

  export default {
    name: 'app',
    mixins: [ Auth ],
    mounted () {
      this.$Progress.finish();
    },
    created () {
      if (this.$storage.existUser()) {
        this.$store.state.auth = true;

        if (this.$storage.exist('sidenav')) {
          this.$store.state.sidenav = this.$storage.get('sidenav');
        }

        this.timerSession();

        this.$router.push('/');
      } else {
        this.logout();
      }

      // Fullscreen event and hack mozilla
      document.addEventListener('onkeyup', function (e) {
        if (e.keyCode === 27) {
          document.querySelector('body').classList.remove('fullscreen');
        }
      });

      document.addEventListener('mozfullscreenchange', function () {
        if (!document.mozFullScreen) {
          document.querySelector('body').classList.remove('fullscreen');
        }
      }, false);

      if (process.env.ONBEFOREUNLOAD) {
        window.onbeforeunload = function () {
          return '¿Está seguro de abandonar la página?.';
        };
      }

      // loading bar config
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          this.$Progress.parseMeta(meta);
        }
        this.$Progress.start();
        next();
      });
      this.$router.afterEach((to, from) => {
        this.$Progress.finish();
      });
    },
    components: {
      AppNavbar,
      AppSidenav,
      AppFooter,
      AppBreadcrumbs,
      AppMessages,
      AppAlert,
      AppConfirm
    },
    computed: {
      ...mapState(['auth', 'sidenav', 'main'])
    },
    watch: {
      '$route' (to, from) {
        if (!this.$storage.existUser()) {
          this.logout();
        }
        if (to.path !== '/login' && from.path !== '/login') {
          this.transitionName = 'fade';
        } else {
          this.transitionName = '';
        }
        this.$store.commit('closeModal');
        this.$store.commit('tramite/closeModal');
      }
    },
    data () {
      return {
        transitionName: ''
      };
    }
  };
</script>

<style lang="stylus">
@import './assets/stylus/vuetify.styl';
</style>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
