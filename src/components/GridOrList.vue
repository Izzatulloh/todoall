<template>
  <div class="setting">
    <h3 class="setting__title">{{ langWord.infobar[lang] }}</h3>
    <button class="setting__btn" @click="changeList">
      <img v-if="gridOrList" src="@/assets/img/list.svg" alt="" />
      <img v-else src="@/assets/img/grid.svg" alt="" />
      <span v-if="gridOrList">{{ langWord.list[lang] }}</span>
      <span v-else>{{ langWord.grid[lang] }}</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    langWord: Object,
    lang: String,
    search: Boolean,
    gridOrList: {
      typeof: Boolean,
      default: true,
    },
  },
  data() {
    return {
      btn: "Setka",
    };
  },
  methods: {
    changeList() {
      this.$emit("changeList", !this.gridOrList);
    },
  },
};
</script>
<style lang="scss">
.setting {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  align-items: center;
  &__title {
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
    color: #323232;
  }
  &__btn {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 55px;
    background: linear-gradient(
        0deg,
        rgba(103, 80, 164, 0.11),
        rgba(103, 80, 164, 0.11)
      ),
      #fffbfe;
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
      0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    border: none;
    outline: none;
    cursor: pointer;
    gap: 15px;
  }
}
</style>
