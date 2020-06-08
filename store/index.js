import Vue from "vue";
import Vuex from "vuex";
import {
  v4 as uuidv4
} from "uuid";

function compare(a, b) {
  return b.id - a.id;
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    getters: {
      todos: state => state.todos,
      getTodo: state => id =>
        Array.from(state.todos).find(todo => todo.id == id)
    },
    mutations: {
      addTodo: (state, payload) => {
        const newTodo = {
          id: uuidv4(),
          name: payload,
          completed: false,
          loading: true,
          error: false
        };
        state.todos.unshift(newTodo);
      },
      deleteTodo: (state, index) => {
        state.todos.splice(index, 1);
      },
      fetchTodos: (state, payload) => {
        payload.sort(compare);
        state.todos = [...payload];
        //console.log(state.todos);
      },
      updateTodo: (state, payload) => {
        Vue.set(state.todos, 0, {
          ...payload,
          loading: false
        });
      },
      setError: state => {
        console.log(state.todos);
        Vue.set(state.todos, 0, {
          ...state.todos[0],
          loading: false,
          error: true
        });
      },
      retry: (state, obj) => {
        state.todos.splice(obj.index, 1);
        const newTodo = {
          id: uuidv4(),
          name: obj.name,
          completed: false,
          loading: true,
          error: false
        };
        state.todos.unshift(newTodo);
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const data = await this.$axios.$get("https://rocky-anchorage-71862.herokuapp.com/todos")
        vuexContext.commit("fetchTodos", data);
      },
      async addTodo({
        commit
      }, payload) {
        commit("addTodo", payload);
        this.$axios.setHeader("Content-Type", "application/json", ["post"]);
        const response = await this.$axios.post("https://rocky-anchorage-71862.herokuapp.com/todos", {
          name: payload,
          completed: false
        })

        if (response.status !== 201) {
          commit("setError");
        } else {
          commit("updateTodo", response.data);
        }
      },
      async deleteTodo({
        commit
      }, obj) {
        console.log(obj);
        commit("deleteTodo", obj.index);
        const response = await this.$axios.delete("https://rocky-anchorage-71862.herokuapp.com/todos/" + obj.id)
      },
      async retry({
        commit
      }, obj) {
        commit("retry", obj);
        this.$axios.setHeader("Content-Type", "application/json", ["post"]);
        const response = await this.$axios.post("https://rocky-anchorage-71862.herokuapp.com/todos", {
          name: obj.name,
          completed: false
        })

        if (response.status !== 201) {
          commit("setError");
        } else {
          commit("updateTodo", response.data);
        }
      }
    }
  });
};

export default createStore;
