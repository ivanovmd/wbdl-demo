import axios from "axios";

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

class ApiServce {
  getUsers() {
    const url = "/users";
    return this.request(url);
  }

  getUser(id) {
    const url = "/users/" + id;
    return this.request(url);
  }

  getPosts(userId) {
    let url = "posts";
    if (userId) url += `?userId=${userId}`;
    return this.request(url);
  }

  getPost(id) {
    const url = "/posts/" + id;
    return this.request(url);
  }

  updatePost(id, data) {
    const url = "/posts/" + id;
    return this.request(url, "PATCH", data);
  }

  deletePost(id) {
    const url = "/posts/" + id;
    return this.request(url, "delete");
  }

  getComments(postId) {
    let url = "comments";
    if (postId) url += `?postId=${postId}`;
    return this.request(url);
  }

  request(url, method = "get", data = {}) {
    return api.request({
      method,
      url,
      data
    })
      .then(response => response.data)
      .catch(e => console.log(e));
  }
}

export const apiServce = new ApiServce();
