<template>
  <div>
    <ul class="p-0" v-if="todos.length > 0">
      <li
        class="list-none flex justify-between my-5 cursor-pointer"
        v-for="(todo, i) in todos"
        :key="i"
      >
        <nuxt-link
          :style="todo.error ? 'color: red' : ''"
          :to="'/todos/' + todo.id"
          :class="[todo.loading ? 'flex-1 no-underline text-black cursor-not-allowed opacity-50 pointer-events-none' : 'flex-1 no-underline active: text-black visited: text-black']"
          :key="i"
        >{{ todo.name }}</nuxt-link>
        <span>
          <img
            class="w-4 h-5 cursor-pointer"
            v-if="todo.error"
            :style="todo.loading ? 'pointer-events: none' : ''"
            src="../assets/retry.svg"
            @click="retry({ name: todo.name, index: i })"
          />
          <img
            class="w-4 h-5 cursor-pointer"
            :style="todo.loading || todo.error ? 'pointer-events: none' : ''"
            src="../assets/dustbin.svg"
            @click="deleteTodo({ id: todo.id, index: i })"
          />
        </span>
      </li>
    </ul>
    <div class="text-center" v-else>No Todos here yet!</div>
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

