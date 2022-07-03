<template>
  <button class="appbar__btn" @click="modalOpen">
    <img src="@/assets/img/add.svg" alt="" />
  </button>
</template>
<script>
export default {
  methods: {
    modalOpen() {
      this.$emit("modalOpen", true);
    },
  },
};

</script>
