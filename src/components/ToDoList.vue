<template>
  <div class="todo-list">
    <h4>{{ title }}</h4>
    <hr />
    <form @submit.prevent="addNewTodo">
      <input
        v-model="newToDo"
        type="text"
        id="newToDo"
        name="newToDo"
        placeholder="Add New ToDo"
      />
      <button type="submit">Add</button>
    </form>
    <ul v-if="!loading && data && data.length">
      <li v-for="todo of data" v-bind:key="todo.id">
        <div @click.prevent="markAsDone">{{ todo.title }}</div>
      </li>
    </ul>
    <p v-if="loading">yükleniyor..</p>
  </div>
</template>

<script>
import { ref } from "vue";
import fetch from "node-fetch";

export default {
  name: "ToDoList",
  props: {
    title: String,
  },
  data() {
    return {
      newToDo: "",
      data: ref(null),
      loading: ref(true),
      errot: ref(null),
    };
  },
  methods: {
    addNewTodo: function () {
      fetch("http://localhost:3000/todos", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: this.newToDo }),
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }

          return res.json();
        })
        .then((json) => {
          console.log(json);
          this.newToDo = "";
          this.fetchData();
        })
        .catch((err) => {
          this.error = err;
          if (err.json) {
            return err.json.then((json) => {
              this.error.message = json.message;
            });
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    fetchData: function () {
      this.loading = true;
      return fetch("http://localhost:3000/todos", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }

          return res.json();
        })
        .then((json) => {
          this.data = json;
        })
        .catch((err) => {
          this.error = err;
          if (err.json) {
            return err.json.then((json) => {
              this.error.message = json.message;
            });
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    markAsDone: function () {
      console.log("Done");
    },
  },
  mounted: function () {
    this.fetchData();
  },
};
</script>


<style>
.todo-list {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
.todo-list h4 {
  text-align: center;
}
.todo-list form input {
  width: 90%;
  padding: 10px;
}
.todo-list form button {
  padding: 10px;
}
.todo-list ul,
.todo-list ul li {
  list-style: none;
  padding-left: 0;
}
.todo-list ul li {
  line-height: 30px;
  background-color: #f9f9f9;
  margin-top: 3px;
  padding: 5px;
  cursor: pointer;
}
</style>