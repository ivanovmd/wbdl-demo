import { apiServce } from "../../services/api";
import { GET_POSTS, GET_POST, UPDATE_POST, DELETE_POST } from "../actions.type";

const initialState = {
  entities: {},
  ids: []
};

let state = { ...initialState };

const getters = {
  posts(state) {
    return state.ids.map(id => state.entities[id]);
  },
  postIds(state) {
    return state.ids;
  },
  postById(state) {
    return id => state.entities[id];
  },
  postsByUserId(state) {
    return userId =>
      getters.posts(state).filter(post => post.userId === userId);
  }
};

const mutations = {
  deletePost(state, id) {
    state.entities.delete(id);
  },
  setPost(state, { post }) {
    if (post) {
      if (!state.ids.includes(post.id)) state.ids.push(post.id);
      state.entities[post.id] = { ...post };
      state.selectedId = post.id;
    }
  },
  setPosts(state, { posts }) {
    if (posts) {
      const ids = [];
      const postEntities = {};
      posts.forEach(post => {
        ids.push(String(post.id));
        postEntities[post.id] = post;
      });
      state.entities = { ...state.entities, ...postEntities };
      state.ids = [...state.ids, ...ids];
    }
  }
};

const actions = {
  async [GET_POST]({ commit }, id) {
    const post = await apiServce.getPost(id);
    commit("setPost", { post });
  },
  async [GET_POSTS]({ commit }, userId) {
    const posts = await apiServce.getPosts(userId);
    commit("setPosts", { posts });
  },
  async [UPDATE_POST]({ commit }, data) {
    console.log(data);
    
    const post = await apiServce.updatePost(data.id, data);
    commit("setPost", post);
  },
  async [DELETE_POST]({ commit }, id) {
    await apiServce.updatePost(id);
    commit("deletePost", id);
  }
};

export default { state, getters, mutations, actions };
