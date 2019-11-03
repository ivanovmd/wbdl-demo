<template>
  <div class="columns">
    <div class="column is-one-third">
      <h3 class="title is-3">{{ user.name }} <span class="has-text-primary" v-if="user.id == currentUserId">(You)</span></h3>
      <p class="subtitle has-text-grey">aka: {{user.username}}</p>

      <p>{{ user.email }}</p>
      <p>
        <a class="has-text-primary" :href="'http://' + user.website" target="_blank">{{ user.website }}</a>
      </p>

      <GmapMap
        class="user-location"
        :center="{lat:Number(user.address.geo.lat), lng:Number(user.address.geo.lng)}"
        :zoom="3"
        map-type-id="terrain"
      ></GmapMap>
      <p class="is-size-7 has-text-danger">(The map will show error message decause Billing is not enabled for this Goolge Maps Api Key)</p>
    </div>

    <div class="column">
      <h5 class="title is-5 has-text-grey">Posts by {{user.name}}</h5>

      <PostsList :posts="posts" :users="{}"></PostsList>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_POSTS, GET_USER } from "../store/actions.type";
import PostsList from "../components/PostsList.vue";

export default {
  name: "user",
  components: { PostsList },
  beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      Promise.all([
        store.dispatch(GET_USER, to.params.id),
        store.dispatch(GET_POSTS, to.params.id)
      ]).then(() => next());
    }
  },
  computed: {
    ...mapGetters(["userById", "postsByUserId", "currentUserId"]),
    id() {
      return parseInt(this.$router.currentRoute.params.id);
    },
    user() {
      return this.userById(this.id);
    },
    posts() {
      return this.postsByUserId(this.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.user-location {
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  margin-bottom: 1rem
}
</style>