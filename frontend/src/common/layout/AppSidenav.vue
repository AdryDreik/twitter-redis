<template>
  <v-navigation-drawer
    v-model="$store.state.toggle"
    clipped
    fixed
    dark>
    <div class="sidenav-user">
      <v-layout row wrap>
        <v-flex xs4>
          <div class="sidenav-user__photo">{{ inicial }}</div>
        </v-flex>
        <v-flex xs8>
          <div class="sidenav-user__name">
            <v-icon dark>person_pin</v-icon>
            {{ nombreCompleto }}
          </div>
          <div class="sidenav-user__entidad">
            <v-icon dark>location_city</v-icon>
            {{ user.entidad }}
          </div>
        </v-flex>
      </v-layout>
      <div class="sidenav-user__email">
        <!-- <v-icon dark>mail_outline</v-icon>  -->
        @{{ user.usuario }}
      </div>
    </div>
    <v-list dense id="sidenav-menu">
      <template v-for="(item, i) in menu">
        <v-list-group v-if="item.submenu" v-model="item.model" no-action>
          <v-list-tile slot="item" @click="send(item.url, item.submenu)" :data-url="item.url">
            <v-list-tile-action>
              <v-icon color="warning">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ getLabel(item) }}
              </v-list-tile-title>
              <v-icon>{{ item.model ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }}</v-icon>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.submenu" :key="i" @click="send(child.url)" :data-url="child.url">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ getLabel(child) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="send(item.url, item.submenu)" :data-url="item.url">
          <v-list-tile-action>
            <v-icon color="warning">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ getLabel(item) }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import { mapState } from 'vuex';
import Layout from './mixins/layout';

export default {
  mixins: [ Layout ],
  mounted () {
    if (this.$storage.exist('menu')) {
      this.$store.state.menu = this.$storage.get('menu');
    }

    if (this.$storage.existUser()) {
      this.$store.state.user = this.$storage.getUser();
    }

    this.setActive(this.$route.path);
  },
  computed: {
    ...mapState(['menu', 'user']),
    nombreCompleto () {
      let user = this.$store.state.user;

      return user.nombres;
    },
    inicial () {
      let user = this.$store.state.user;
      if (user.usuario) {
        return (user.usuario[0] || '?').toUpperCase();
      }
      return '?';
    }
  },
  methods: {
    send (url, submenu) {
      console.log('url', url, url.length);
      if (submenu === undefined) {
        if (this.$storage.exist('menu')) {
          let page = this.$util.getMenuOption(this.$storage.get('menu'), url);
          this.$store.state.breadcrumbs = page;
        }

        this.setActive(url);

        this.$router.push(url || '/');
      }
    },
    getLabel (item) {
      if (item.url) {
        let label = this.$t(`menu.${item.url.replace('/', '')}`);
        if (label.indexOf('.') === -1) {
          return label;
        }
      }

      return item.label;
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/base/_variables.scss';

// $sidenavWidth: 250px;
$colorLink: lighten($success, 40%);
$bgSidenav: darken($info, 42%);
$bgLinkHover: lighten($bgSidenav, 10%);
$bgSubMenu: darken($bgSidenav, 6%);
$colorLinkHover: #ffffff;

.application .theme--dark.navigation-drawer {
  background-color: $bgSidenav;

  .list, .list__tile {
    background-color: $bgSidenav;
  }

  .list__tile__content {
    position: relative;

    .icon {
      position: absolute;
      right: 0;
      top: 3px;
    }
  }

  .list__tile__title {
    white-space: normal;
  }

  .list--dense .list__tile:not(.list__tile--avatar) {
    height: auto;
    min-height: 48px;
  }

  .list--group .list__tile {
    background-color: $bgSubMenu;
  }

  .list__tile {
    color: $colorLink;
    outline: none;

    .icon {
      color: $colorLink;
    }

    &:hover, &.active {
      background-color: $bgLinkHover;
      color: $colorLinkHover;
      outline: none;

      &::before {
        background-color: $bgLinkHover;
      }

      .icon {
        color: $colorLinkHover;
      }
    }
  }
  .list--group__header.list--group__header--active.list--group__header--no-action .list__tile {
    color: #ffffff;
    background-color: $bgSubMenu;

    .icon {
      color: $warning;
    }
  }
}

aside.navigation-drawer--open + nav + .content--wrap > .content {
  padding-left: 300px !important;
}

.navigation-drawer {
  margin-top: 64px!important;
  // width: $sidenavWidth;

  .list__tile__action {
    min-width: 38px;

    .icon {
      color: $warning;
    }
  }

  .list.list--group {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      left: 27px;
      top: 0;
      bottom: 0;
      border-left: 1px dotted $colorLink;
      z-index: 1;
    }
  }

  & > .list .list--group .list__tile {
    position: relative;
    padding-left: 54px;
    font-size: 0.85rem;

    &::before {
      content: '';
      position: absolute;
      left: 23px;
      top: 20px;
      width: 9px;
      height: 9px;
      border: 1px dotted $colorLink;
      background: $bgSubMenu;
      z-index: 2;
    }
  }
}

// .navigation-drawer--close.navigation-drawer:not(.navigation--permanent):not(.navigation-drawer--right) {
//   -webkit-transform: translate3d(-$sidenavWidth,0,0);
//   transform: translate3d(-$sidenavWidth,0,0);
// }

// User
.sidenav-user {
  background: transparent url(../../../static/images/mountains.png) no-repeat;
  min-height: 105px;
  background-size: 100% auto;
  border-bottom: 1px solid lighten($bgSidenav, 8%);
}

.sidenav-user__photo {
  background-color: $success;
  border-radius: 50%;
  border: 2px solid white;
  color: white;
  display: inline-block;
  font-size: 2.6rem;
  height: 52px;
  line-height: 44px;
  margin: 15px 0 0 10px;
  text-align: center;
  width: 52px;
}

.sidenav-user__name {
  color: white;
  font-size: 0.9rem;
  line-height: 1.3rem;
  margin: 15px 0 0 -10px;
  min-height: 30px;
  padding-left: 20px;
  position: relative;

  .icon {
    position: absolute;
    top: 2px;
    left: -5px;
  }
}

.sidenav-user__email {
  color: $colorLink;
  font-size: .85rem;
  padding: 3px 12px;
  text-align: right;

  .icon {
    color: $colorLink;
    font-size: .85rem;
  }
}

.sidenav-user__entidad {
  margin-top: 3px;
  color: lighten($success, 10%);
  font-size: 0.8rem;
  line-height: .9rem;
  font-weight: 600;
  position: relative;
  padding-left: 20px;
  margin-left: -10px;

  .icon {
    color: lighten($success, 10%);
    position: absolute;
    top: 1px;
    left: -3px;
    font-size: 1.3rem;
  }
}

</style>
