<template>
  <div>
    <h1>{{ getTodo(this.$route.params.id).name }}</h1>
    <p>
      Status:
      {{getTodo(this.$route.params.id).completed ? "Completed" : "Not Completed"}}
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTodo"])
  }
};
</script>