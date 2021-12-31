<template>
  <div class="main-content">
    <page-title v-bind:title="'Task #' + id" />

    <div class="create-board">
      <div class="row">
        <div class="col-xs-12 input-group">
          <label>Tiêu đề</label>
          <input type="text" class="form-control" v-model="task.title" />
        </div>
        <div class="col-xs-12 input-group">
          <label>Mô tả tác vụ</label>
          <textarea
            type="text"
            class="form-control"
            v-model="task.description"
          ></textarea>
        </div>
        <div class="col-xs-12 input-group">
          <label>Tên Project</label>
          <input type="text" class="form-control" v-model="task.name" />
        </div>
        <div class="col-xs-6 input-group">
          <label>Ngày giờ bắt đầu</label>
          <datetime type="datetime" v-model="task.start_at"></datetime>
        </div>
        <div class="col-xs-6 input-group">
          <label>Deadline</label>
          <datetime type="datetime" v-model="task.end_at"></datetime>
        </div>
        <div class="col-xs-6 input-group">
          <label>Trang thái</label>
          <select class="input-group input-select" v-model="task.status">
            <!-- <option value="0">Todo</option>
                        <option value="1">In process</option>
                        <option value="2">To verify</option>
                        <option value="3">Done</option> -->
            <option
              v-for="el in STATUS_CONFIG"
              v-bind:key="el.value + el.text"
              v-bind:value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Độ ưu tiên</label>
          <select class="input-group input-select" v-model="task.priority">
            <!-- <option value="0" >Normal</option>
                        <option value="1">Low</option>
                        <option value="2">Urgent</option>
                        <option value="3">Important</option> -->
            <option
              v-for="el in PRIORITY_CONFIG"
              v-bind:key="el.value + el.text"
              v-bind:value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Giai đoạn</label>
          <select class="input-group input-select" v-model="task.team">
            <!-- <option value="Front End" >Front End</option>
                        <option value="Backend">Back End</option>
                        <option value="Design">Design</option> -->
            <option
              v-for="el in TEAM_CONFIG"
              v-bind:key="el.value + el.text"
              v-bind:value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Thành viên đảm nhận</label>
          <select class="input-group input-select" v-model="task.email_member">
            <option value="" disabled>Thành viên</option>
            <option
              v-for="email in getListEmailuser"
              v-bind:key="email"
              v-bind:value="email"
            >
              {{ email.split("@")[0] }}
            </option>
          </select>
        </div>
        <div class="col-xs-12 btn-submit-create">
          <button
            v-on:click="handleUpdate"
            class="btn btn-success"
            type="submit"
          >
            Cap nhat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { tasksRef } from "../config/firebase";
import PageTitle from "../components/PageTitle";
import { STATUS_CONFIG, PRIORITY_CONFIG, TEAM_CONFIG } from "../config/const";

export default {
  name: "edit-task",
  components: {
    PageTitle,
  },
  data() {
    return {
      id: this.$route.params.id,
      task: {
        title: "",
        description: "",
        name: "",
        start_at: null,
        end_at: null,
        status: 1,
        priority: 1,
        team: 1,
        email_member: "",
      },

      STATUS_CONFIG,
      PRIORITY_CONFIG,
      TEAM_CONFIG,
    };
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.id = newRoute.params.id;
      this.fetchDataTask();
    },
  },
  computed: {
    ...mapGetters(["getListEmailuser"]),
  },
  created() {
    this.fetchDataTask();
  },
  methods: {
    ...mapActions(["getTaskById", "setLoading"]),
    fetchDataTask() {
      this.getTaskById(this.id).then((res) => {
        if (res.ok) {
          this.task = res.task;
        } else {
          // Day ve trang chu
          this.$router.push("/");
        }
      });
    },
    async handleUpdate() {
      this.setLoading(true);
      let result = await tasksRef.child(this.id).update(this.task);
      this.setLoading(false);
      alert("Cap nhat thanh cong");
      this.$router.push("/");
    },
  },
};
</script>


<style>
.vdatetime .vdatetime-input {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
</style>