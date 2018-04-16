<template>
  <div class="not-found">
    <div class="not-found__message text-xs-center">
      <h1>
        <span class="primary--text">4</span>0<span class="primary--text">4</span>
      </h1>
      <h4>PÁGINA NO ENCONTRADA</h4>
      <v-btn color="primary" round  @click="$router.go(-1)"><v-icon dark>arrow_back</v-icon> Volver atrás</v-btn>
    </div>
  </div>
</template>

<style src="./pages.scss" lang="scss"></style>
