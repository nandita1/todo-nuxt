<template>
  <div class="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
    <div class="w-auto bg-white p-4 shadow-md">
      <h3 class="text-center my-2">Yet Another Todo</h3>
      <app-new-todo></app-new-todo>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      <app-todos></app-todos>
    </div>
  </div>
</template>

<script>
import NewTodo from "~/components/NewTodo";
import Todos from "~/components/Todos";
export default {
  name: "home",
  components: {
    appNewTodo: NewTodo,
    appTodos: Todos
  }
};
</script>
