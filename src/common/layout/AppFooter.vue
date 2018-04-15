<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>© {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<style lang="scss">
aside + nav + main + footer {
  left: 250px !important;
}

.navigation-drawer--close.navigation-drawer:not(.navigation--permanent):not(.navigation-drawer--right) + nav + main + footer {
  left: 0 !important;
}

.navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right)~main {
  padding-left: 250px !important;
}

.footer {
  height: 28px;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

</style>
