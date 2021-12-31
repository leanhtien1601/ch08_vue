<template>
  <div class="main-content">
    <div class="view chat">
      <header>
        <h1>Welcome, {{ getCurrentUser.email.split("@")[0] }}</h1>
      </header>

      <section class="chat-box">
        <div>
          <!--  -->
          <div
            class="message-inner"
            v-for="(message, index) in listMessage"
            :key="index"
          >
            <div
              class="username"
              :class="{ text_right: message.auth != sendUser }"
            >
              {{ message.auth.split("@")[0] }}
            </div>
            <div
              class="content"
              :class="{ userYouContent: message.auth != sendUser }"
            >
              {{ message.description }}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <form @submit.prevent="SendMessage">
          <input
            type="text"
            v-model="description"
            placeholder="Write a message..."
          />
          <input type="submit" value="Send" />
        </form>
      </footer>
      <notifications group="foo" position="top right" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PageTitle from "../components/PageTitle";
export default {
  name: "create-task",
  components: {
    PageTitle,
  },
  data() {
    return {
      description: "",
      status: 1,
      team: 1,
      emailSend: "",
      messListSend: [],
    };
  },
  computed: {
    ...mapGetters([
      "getListEmailuser",
      "getCurrentUser",
      "getListTaskFilter",
      "sendUser",
    ]),
    listMessage() {
      return this.getListTaskFilter.todo.filter(
        (item) =>
          (item.auth == this.sendUser &&
            item.email_member == this.getCurrentUser.email) ||
          (item.auth == this.getCurrentUser.email &&
            item.email_member == this.sendUser)
      );
    },
  },
  created() {
    const getListMess = this.getListTaskFilter.todo;
    var arr = [];
    for (var x = 0; x < getListMess.length; x++) {
      if (this.sendUser == getListMess[x].auth) {
        arr.push(getListMess[x].description);
      }
    }
    this.messListSend = arr;
  },
  methods: {
    ...mapActions(["createTask"]),
    SendMessage() {
      const dateTime = new Date().toLocaleString();
      let objData = {
        auth: this.getCurrentUser.email,
        description: this.description,
        status: this.status,
        date: dateTime,
        email_member: this.sendUser,
      };
      this.createTask(objData).then((res) => {
        if (res.ok) {
          this.resetData();
        }
      });
    },
    resetData() {
      this.description = "";
      this.status = 1;
      this.email_member = "";
    },
    notify() {
      this.$notify({
        group: "foo",
        title: "Bạn có tin nhắn mới",
        text: "text-warning",
        type: "error",
        speed: 2000,
      });
    },
    checkArrMess() {
      return this.getListTaskFilter.todo.filter(
        (item) => item.email_member == this.getCurrentUser
      );
    },
  },
  watch: {
    getListTaskFilter: {
      handler() {
        let arrCheck = [];
        arrCheck = this.getListTaskFilter.todo.filter(
          (item) => item.email_member == this.getCurrentUser
        );
        if (this.checkArrMess().length != arrCheck.length) {
          this.notify();
        }
      },
      deep: true,
    },
  },
};
</script>


<style lang="scss">
.text_right {
  text-align: right;
}
.userYouContent {
  background-color: #ea526f !important;
  color: #fff !important;
  text-align: right !important;
  position: absolute;
  right: 0;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }
        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: #ea526f;
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        &:focus-within {
          label {
            color: #ea526f;
          }
          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      background: unset;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ea526f;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
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
}
.message-inner .username {
  color: #888;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.message-inner .content {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f3f3f3;
  border-radius: 999px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  text-align: left;
}
.message-inner {
  margin-bottom: 15px;
  height: 70px;
  position: relative;
}
</style>