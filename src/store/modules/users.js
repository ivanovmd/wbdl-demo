import { apiServce } from "../../services/api";
import { GET_USERS, GET_USER, SET_CURRENT_USER } from "../actions.type";

const initialState = {
  entities: {},
  ids: [],
  currentId: null
};

let state = { ...initialState };

const getters = {
  userIds(state) {
    return state.ids;
  },
  users(state) {
    return state.ids.map(id => state.entities[id]);
  },
  userById(state) {
    return id => state.entities[id];
  },
  currentUserId(state) {
    return state.currentId;
  }
};

const mutations = {
  setUser(state, { user }) {
    if (user) {
      if (!state.ids.includes(user.id)) state.ids.push(user.id);
      state.entities[user.id] = { ...user };
    }
  },
  setUsers(state, { users }) {
    if (users) {
      const ids = [];
      const userEntities = {};
      users.forEach(user => {
        ids.push(String(user.id));
        userEntities[user.id] = user;
      });
      state.entities = { ...userEntities };
      state.ids = [...ids];
    }
  },
  setCurrentId(state, { id }) {
    state.currentId = id;
  }
};

const actions = {
  async [GET_USER]({ commit }, id) {
    let user = await apiServce.getUser(id);
    commit("setUser", { user });
  },
  async [GET_USERS]({ commit }) {
    const users = await apiServce.getUsers();
    commit("setUsers", { users });
  },
  [SET_CURRENT_USER]({ commit }, id) {
    commit("setCurrentId", { id });
  }
};

export default { state, getters, mutations, actions };
