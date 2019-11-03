import { apiServce } from "../../services/api";
import { GET_COMMENTS, CREATE_COMMENT } from "../actions.type";

const initialState = {
  entities: {},
  ids: []
};

let state = { ...initialState };

const getters = {
  comments(state) {
    return state.ids.map(id => state.entities[id]);
  },
  commentsByPostId(state) {
    return postId =>
      getters.comments(state).filter(comment => comment.postId === postId);
  }
};

const mutations = {
  setComment(state, { comment }) {
    if (comment) {
      if (!state.ids.includes(comment.id)) state.ids.push(comment.id);
      state.entities[comment.id] = { ...comment };
    }
  },
  setComments(state, { comments }) {
    if (comments) {
      const ids = [];
      const commentEntities = {};
      comments.forEach(comment => {
        ids.push(String(comment.id));
        commentEntities[comment.id] = comment;
      });
      state.entities = { ...state.entities, ...commentEntities };
      state.ids = [...state.ids, ...ids];
    }
  }
};

const actions = {
  async [GET_COMMENTS]({ commit }, postId) {
    const comments = await apiServce.getComments(postId);
    commit("setComments", { comments });
  },
  async [CREATE_COMMENT]({ commit }, comment) {
    await apiServce.updatePost(comment);
    commit("setComment", comment);
  }
};

export default { state, getters, mutations, actions };
