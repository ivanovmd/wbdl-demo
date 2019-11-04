<template>
  <div>
    <div v-if="user.id == currentUserId">
      <h3 class="title is-3">Edit post:</h3>

      <div class="post-edit-field">
        <h5 class="title is-5">Post title:</h5>
        <input class="input" type="text" placeholder="Post title" v-model="title" />
      </div>
      <div class="post-edit-field">
        <h5 class="title is-5">Post body:</h5>
        <textarea class="textarea" placeholder="Post body" v-model="body"></textarea>
      </div>
      <button :disabled="!title || !body" @click="updatePost" class="button is-primary">Save post</button>
    </div>

    <div v-else>
      <h1 class="title is-3">{{post.title | capitalize}}</h1>
      <router-link
        class="has-text-primary"
        :to="{name: 'user', params: {id: user.id}}"
      >@{{ user.name }}</router-link>
      <p>{{post.body}}</p>
    </div>

    <div class="comments">
      <h4 class="title is-4 has-text-dark">Comments: ({{comments.length + 1}})</h4>
      <div class="comment" v-for="(comment, i) of comments" v-bind:key="i">
        <h5 class="comment-title is-size-5">{{comment.name | capitalize}}</h5>
        <h6 class="comment-body is-size-6 has-text-grey-light">by: {{comment.email}}</h6>
        <p>{{comment.body}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import {
  GET_POST,
  GET_USERS,
  GET_COMMENTS,
  UPDATE_POST
} from "../store/actions.type";
import capitalize from "../filters/capitalize";

export default {
  name: "post",
  beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      Promise.all([
        store.dispatch(GET_USERS, to.params.id),
        store.dispatch(GET_POST, to.params.id),
        store.dispatch(GET_COMMENTS, to.params.id)
      ]).then(() => {
        next();
      });
    }
  },
  created() {
    this.title = this.post.title;
    this.body = this.post.body;
  },
  computed: {
    ...mapGetters(["userById", "postById", "commentsByPostId", 'currentUserId']),
    id() {
      return parseInt(this.$router.currentRoute.params.id);
    },
    post() {
      return this.postById(this.id);
    },
    user() {
      return this.userById(this.post.userId);
    },
    comments() {
      return this.commentsByPostId(this.id);
    }
  },
  filters: {
    capitalize
  },
  data() {
    return {
      title: "",
      body: ""
    };
  },
  methods: {
    updatePost: function() {
      store.dispatch(UPDATE_POST, {
        id: this.id,
        body: this.body,
        title: this.title
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.comments {
  margin-top: 3rem;
}

.comment {
  padding: 1.5rem;
  border-top: 1px solid hsl(0, 0%, 96%);
}

.comment-title {
  margin-bottom: 0.5rem;
}

.comment-body {
  margin-bottom: 0.5rem;
}

.post-edit-field {
  margin-bottom: 1.5rem
}
</style>