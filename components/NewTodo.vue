<template>
  <div class="my-4">
    <form class="flex">
      <input
        class="flex-1 mr-4 p-1 border border-gray-400"
        type="text"
        placeholder="Type something here..."
        v-model.trim="todo"
      />
      <button
        class="p-1 bg-orange-500 text-white focus:outline-none"
        @click.prevent="createNew"
      >+ Add</button>
    </form>
    <p class="mt-4 text-red-600" v-if="showError">*Enter a todo</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
      showError: false
    };
  },
  methods: {
    createNew() {
      if (this.todo === "") {
        this.showError = true;
        return;
      }
      this.$store.dispatch("addTodo", this.todo);
      this.todo = "";
      this.showError = false;
    }
  }
};
</script>
