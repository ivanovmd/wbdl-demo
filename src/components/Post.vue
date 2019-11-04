<template>
  <div class="post">
    <div v-if="user" class="username">
      <span v-if="user.id">
        by:
        <router-link
          class="has-text-primary"
          :to="{name: 'user', params: {id: user.id}}"
        >@{{ user.name }}</router-link>
      </span>
    </div>

    <div>
      <h2 class="title is-5">{{ title | capitalize }}</h2>
      <p class="post-body">{{ body | capitalize }}</p>
      <router-link class="has-text-primary" :to="{name: 'post', params: { id }}">See Full</router-link>
    </div>
  </div>
</template>

<script>
import capitalize from "../filters/capitalize";

export default {
  name: "post",
  props: ["title", "body", "user", "id"],
  filters: {
    capitalize
  }
};
</script>

<style lang="scss" scoped>
.post {
  padding: 2rem;
  border: 1px solid hsl(0, 0%, 86%);
}

.post-body {
  margin-bottom: 1rem;
}

.username {
  margin-bottom: 1rem;
}
</style>
