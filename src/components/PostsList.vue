<template>
  <section v-if="posts.length" class="posts">
    <input
      type="text"
      class="input search"
      placeholder="Search in Post Title"
      @input="search($event)"
    />

    <div v-if="visiblePosts.length">
      <Post
        class="post"
        v-for="(post, i) in visiblePosts"
        v-bind:key="i"
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
    </div>

    <div v-else class="no-posts has-text-centered has-text-grey-light">
      <p>No Posts</p>
    </div>
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
      postsPerPage: 5,
      localPosts: []
    };
  },
  created() {
    this.localPosts = [...this.posts];
  },
  computed: {
    visiblePosts() {
      return this.localPosts.slice(
        this.postsPage * this.postsPerPage,
        this.postsPage * this.postsPerPage + this.postsPerPage
      );
    }
  },
  methods: {
    nextPage() {
      if (this.postsPage + 1 < this.localPosts.length / this.postsPerPage)
        this.postsPage++;
    },
    prevPage() {
      if (this.postsPage > 0) this.postsPage--;
    },
    search(event) {
      const value = event.target.value;
      this.localPosts = this.posts.filter(post => {
        if (post.title.toLowerCase().includes(value.toLowerCase())) return post;
      });
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

.search {
  margin-bottom: 2rem;
}

.no-posts {
  margin-bottom: 2rem;
}

.pagination {
  margin-top: 1.5rem;
}
</style>