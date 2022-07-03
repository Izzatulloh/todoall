<template>
    <div
      class="notes"
      :class="{ grid: grid, list: !grid }"
      v-if="notes.length > 0"
    >
      <div class="card" v-for="(item, index) in notes" :key="index">
        <h2 class="card__title">{{ item.title }}</h2>
        <p class="card__time">{{ item.time }}</p>
        <p class="card__text">{{ item.content }}</p>

        <div class="card__btns" v-if="!search">
          <button class="btn edit" @click="changeNote(item.id)">
            <img src="@/assets/img/change.svg" alt="" />
            <span>{{ langWord.editbtn[lang] }}</span>
          </button>
          <button class="btn delete" @click="removeNote(item.id)">
            <img src="@/assets/img/delete.svg" alt="" />
            <span>{{ langWord.deledit[lang] }}</span>
          </button>
        </div>
      </div>
    </div>
  <p class="note__off" v-else>{{ langWord.nonote[lang] }}</p>
</template>
<script>
export default {
  name: "Card",

  props: {
    langWord: Object,
    lang: String,
    search: Boolean,
    notes: Array,
    grid: Boolean,
    openModal: Boolean,
  },
  methods: {
    // removeNote(cardId) {
    //   this.$emit("removeCard", cardId);
    // },
    // changeNote(cardId) {
    //   this.$emit("changeNotes", cardId);
    // },
    removeNote(cardId) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id == cardId) {
          this.notes.splice(i, 1);
          break;
        }
      }
    },
    changeNote(cardId) {
      this.$emit("changeNote", cardId);
    },
  },
};
</script>
<style lang="scss">
.card {
  background: linear-gradient(
      0deg,
      rgba(103, 80, 164, 0.05),
      rgba(103, 80, 164, 0.05)
    ),
    #fffbfe;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 16px;

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: 0.1px;
    color: #1c1b1f;
    margin-bottom: 5px;
  }
  &__time {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #cac4d0;
  }
  &__text {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 28px;
  }
  &__btns {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    .btn {
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
      font-weight: 600;
      color: #6750a4;
      padding: 10px;
      transition: 0.5s;
      background: transparent;
      border-radius: 6px;
      &:first-of-type:hover {
        background: #e6ddff;
      }
      &:last-of-type:hover {
        background: #ffe1e1;
      }
    }
  }
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
