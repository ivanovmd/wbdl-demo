import axios from "axios";

class ApiServce {
  baseUrl = "https://jsonplaceholder.typicode.com/";

  getUsers() {
    const url = this.baseUrl + "users";
    return this.request(url);
  }

  getUser(id) {
    const url = this.baseUrl + "users/" + id;
    return this.request(url);
  }

  getPosts(userId) {
    let url = this.baseUrl + "posts";
    if (userId) url += `?userId=${userId}`;
    return this.request(url);
  }

  getPost(id) {
    const url = this.baseUrl + "posts/" + id;
    return this.request(url);
  }

  updatePost(id, data) {
    const url = this.baseUrl + "posts/" + id;
    return this.request(url, "update", data);
  }

  deletePost(id) {
    const url = this.baseUrl + "posts/" + id;
    return this.request(url, "delete");
  }

  getComments(postId) {
    let url = this.baseUrl + "comments";
    if (postId) url += `?postId=${postId}`;
    return this.request(url);
  }

  request(url, method = "get", data = {}) {
    return axios({ method, url, data })
      .then(response => response.data)
      .catch(e => console.log(e));
  }
}

export const apiServce = new ApiServce();
