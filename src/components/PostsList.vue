<template>
  <section v-if="posts.length" class="posts">
    <Post
      class="post"
      v-for="post in visiblePosts"
      v-bind:key="post.id"
      v-bind="post"
      :user="users[post.userId]"
    ></Post>

    <nav class="pagination is-small is-centered" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li>
          <button @click="prevPage" class="button">Prev</button>
        </li>
        <li class="current-page">Page {{postsPage + 1}}</li>
        <li>
          <button @click="nextPage" class="button">Next</button>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "posts-list",
  props: ["posts", "users"],
  components: { Post },
  data() {
    return {
      postsPage: 0,
      postsPerPage: 5
    };
  },
  computed: {
    visiblePosts() {
      return this.posts.slice(
        this.postsPage * this.postsPerPage,
        this.postsPage * this.postsPerPage + this.postsPerPage
      );
    }
  },
  methods: {
    nextPage() {
      if (this.postsPage + 1 < this.posts.length / this.postsPerPage)
        this.postsPage++;
    },
    prevPage() {
      if (this.postsPage > 0) this.postsPage--;
    }
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