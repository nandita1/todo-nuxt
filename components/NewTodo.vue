<template>
  <div class="form">
    <form>
      <input type="text" placeholder="Type something here..." v-model.trim="todo" />
      <button class="btn btn-primary" @click.prevent="createNew">+ Add</button>
    </form>
    <p v-if="showError">*Enter a todo</p>
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

<style scoped>
.form {
  margin: 20px 0;
}
form {
  display: flex;
}
p {
  margin-top: 10px;
  color: red;
}
input {
  flex: 1;
  margin-right: 10px;
}
input,
button {
  padding: 5px;
  border: 1px solid #ccc;
}
button {
  background-color: #fa8c16;
  color: white;
  border: none;
  outline: none;
}
</style>