<template>
  <div class="home">
    <PostsList :posts="posts" :users="users"></PostsList>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_POSTS } from "../store/actions.type";
import PostsList from "../components/PostsList.vue";

export default {
  name: "home",
  components: { PostsList },
  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_POSTS).then(() => next());
  },
  data() {
    return {
      postsPage: 0,
      postsPerPage: 5
    };
  },
  computed: {
    ...mapGetters(["users", "posts", "userById"])
  }
};
</script>
<style lang="scss" scoped>
.posts {
  margin: auto;
}
.post {
  margin-bottom: 1rem;
}

.current-page {
  padding: 0 1rem;
}
</style>
