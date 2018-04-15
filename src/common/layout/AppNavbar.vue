<template>
  <v-toolbar
    dark
    fixed
    clipped-left
    class="primary">
    <v-toolbar-side-icon @click.stop="$store.commit('toggleSidenav')" v-if="$store.state.sidenav"></v-toolbar-side-icon>
    <v-toolbar-title class="text--white"><router-link :to="'/'" class="white--text">{{$t('app.title') }}</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn> -->

    <app-lang></app-lang>
    <v-tooltip bottom>
      <v-btn icon @click="reload()" slot="activator">
        <v-icon>refresh</v-icon>
      </v-btn>
      <span>Actualizar la página completa</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn icon @click="fullscreen()" class="btn-fullscreen" slot="activator">
        <v-icon>fullscreen</v-icon>
        <v-icon>fullscreen_exit</v-icon>
      </v-btn>
      <span>Pantalla completa</span>
    </v-tooltip>
    <v-menu
      origin="center center"
      transition="scale-transition"
      bottom
      content-class="app-notifications"
    >
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-list>
          <iframe src="http://localhost:8888" frameborder="0"></iframe>
        </v-list>
        <span>Notificaciones</span>
      </v-tooltip>
    </v-menu>
    <v-menu bottom left>
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title @click="$router.push('account')"><v-icon>account_circle</v-icon> {{$t('app.account') }}</v-list-tile-title>
        </v-list-tile>
        <!-- <v-list-tile>
          <v-list-tile-title @click="$router.push('settings')"><v-icon>settings</v-icon> {{$t('app.settings') }}</v-list-tile-title>
        </v-list-tile> -->
        <v-list-tile>
          <v-list-tile-title @click="logout()"><v-icon>&#xE8AC;</v-icon> {{$t('app.logOut') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import Auth from '@/components/admin/auth/mixins/auth';
import AppLang from './AppLang';

export default {
  mixins: [ Auth ],
  methods: {
    reload () {
      this.$store.commit('setMain', false);
      this.$nextTick(function () {
        this.$store.commit('setMain', true);
      });
    },

    fullscreen () {
      document.querySelector('body').classList.toggle('fullscreen');
      this.$util.fullscreen();
    }
  },
  components: { AppLang }
};
</script>


<style lang="scss">
  .btn-fullscreen {
    .icon:last-child {
      display: none;
    }
  }

  body.fullscreen {
    .btn-fullscreen {
      .icon:first-child {
        display: none;
      }
      .icon:last-child {
        display: inline-block;
      }
    }
  }
  .toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  a {
    text-decoration: none;
  }

  $heightToolbar: 56px;

  .toolbar__content, .toolbar__extension {
    height: $heightToolbar;
  }
  .navigation-drawer--permanent.navigation-drawer--clipped,
  .navigation-drawer--persistent.navigation-drawer--clipped,
  .navigation-drawer--permanent.navigation-drawer--floating,
  .navigation-drawer--persistent.navigation-drawer--floating {
    margin-top: $heightToolbar;
    max-height: calc(100vh - 56px);
  }

  // Notifications
  .app-notifications {
    top: 55px !important;
    overflow: inherit;

    &::before {
      position: absolute;
      content: '';
      top: -10px;
      border-bottom: 10px solid #eee;
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      width: 0;
      height: 0;
      left: 50%;
      margin: 0 0 0 5px;
    }

    .list {
      padding: 0;

      iframe {
        border: none;
        margin: 0 0 -5px;
        padding: 0;
        height: 380px;
        width: 350px;
      }
    }
  }
</style>
