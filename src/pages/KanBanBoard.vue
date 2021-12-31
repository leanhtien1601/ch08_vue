<template>
  <div>
    <!-- Header -->
    <home-header />

    <!-- Main Header -->
    <main-header />

    <!-- Content -->
    <main class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import MainHeader from "../components/MainHeader";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "kan-ban-board",
  components: {
    HomeHeader,
    MainHeader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
  },
  methods: {
    ...mapActions(["getUserCustomField"]),
  },
  mounted() {
    this.getUserCustomField();
  },
};
</script>

