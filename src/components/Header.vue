
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <router-link :to="'/'" class="navbar-item">
        <h1 class="title is-3 has-text-primary">POSTS</h1>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <label for="users" class="has-text-grey">Current User:</label>
          <div class="select is-primary">
            <select name="users" id="users" v-model="selectedUserId">
              <option v-for="(user, i) of users" v-bind:key="i" :value="user.id">{{user.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_USERS, SET_CURRENT_USER } from "../store/actions.type";
export default {
  name: "app-header",
  created() {
    store.dispatch(GET_USERS).then(() => {
      this.selectedUserId = this.users[0].id
    });
  },
  computed: {
    ...mapGetters(["users"])
  },
  data() {
    return {
      selectedUserId: ""
    };
  },
  watch: {
    selectedUserId(value) {
      store.dispatch(SET_CURRENT_USER, value);
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3rem;
  border-bottom: 1px solid hsl(0, 0%, 96%);

  .select {
    margin-left: 1rem;
  }
}
</style>