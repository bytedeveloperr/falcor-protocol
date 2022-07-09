<template>
  <v-app-bar app dense flat outlined class="white">
    <v-container class="pa-0 fill-height">
      <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>

      <v-toolbar-title>Trow</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-md-block">
        <v-btn text link small class="px-2 font-weight-medium" to="/" active-class="primary--text"> Overview </v-btn>
        <v-btn text link small class="px-2 font-weight-medium" to="/explore" active-class="primary--text">Pools</v-btn>
        <v-btn text link small class="px-2 font-weight-medium" to="/deposits">My Deposits</v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="">
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>
