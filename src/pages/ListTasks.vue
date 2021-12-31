<template>
  <div class="main-content">
    <page-title title="Kangban Board">
      <router-link to="/create" class="create-new-item"
        >Create New Item</router-link
      >
    </page-title>

    <div class="wrapper-board">
      <div class="row">
        <div class="item col-12">
          <div class="col-title">Tin nhan</div>
          <task-item :getListEmailuser="getListEmailuser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskItem from "../components/TaskItem";
import PageTitle from "../components/PageTitle";
export default {
  name: "list-tasks",
  components: {
    PageTitle,
    TaskItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getListEmailuser"]),
  },
};
</script>