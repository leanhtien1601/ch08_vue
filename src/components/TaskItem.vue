<template>
  <div class="backlogs-item">
    <div
      class="assign"
      v-for="item in listUser"
      :key="item"
      @click="clickUserSend(item)"
    >
      Gửi tới :{{ item }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "task-item",
  props: {
    getListEmailuser: { type: Array, default: null },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAdmin", "getCurrentUser"]),
    listUser() {
      return this.getListEmailuser.filter(
        (item) => item != this.getCurrentUser.email
      );
    },
  },
  methods: {
    clickUserSend(data) {
      this.$store.commit("SET_USER_CLICK", data);
      this.$router.push("/create");
    },
  },
};
</script>

<style>
.title {
  cursor: pointer;
}
.title,
.project {
  text-transform: capitalize;
}
.assign {
  position: relative;
}
.assign .delete {
  position: absolute;
  right: 2px;
  border: 1px solid #720909;
  padding: 1px 6px;
  font-size: 11px;
  top: 3px;
  background-color: red;
  color: #ffff;
  border-radius: 3px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}
.backlogs-item:hover .delete {
  opacity: 1;
  visibility: visible;
}
</style>