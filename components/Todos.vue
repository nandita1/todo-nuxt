<template>
  <div>
    <ul v-if="todos.length > 0">
      <li v-for="(todo, i) in todos" :key="i">
        <nuxt-link
          :style="todo.error ? 'color: red' : ''"
          :to="'/todos/' + todo.id"
          :class="[todo.loading ? 'disabled' : 'link']"
          :key="i"
        >
          {{ todo.name }}
        </nuxt-link>
        <span>
          <img
            v-if="todo.error"
            :style="todo.loading ? 'pointer-events: none' : ''"
            src="../assets/retry.svg"
            @click="retry({ name: todo.name, index: i })"
          />
          <img
            :style="todo.loading || todo.error ? 'pointer-events: none' : ''"
            src="../assets/dustbin.svg"
            @click="deleteTodo({ id: todo.id, index: i })"
          />
        </span>
      </li>
    </ul>
    <div class="noTodos" v-else>No Todos here yet!</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["todos"])
  },
  methods: {
    deleteTodo(obj) {
      console.log(obj);
      this.$store.dispatch("deleteTodo", obj);
    },
    retry(obj) {
      console.log(obj);
      this.$store.dispatch("retry", obj);
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  cursor: pointer;
}
.noTodos {
  text-align: center;
}
img {
  width: 15px;
  height: 20px;
  cursor: pointer;
}
.link,
.disabled {
  flex: 1;
  text-decoration: none;
}
.link:visited,
.link:active,
.link:link {
  color: black;
}
.disabled {
  color: black;
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
</style>
