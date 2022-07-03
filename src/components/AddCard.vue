<template>
  <div class="add">
    <div class="add__note">
      <h3 class="add__title" v-if="addOrChange">
        {{ langWord.titlewindow[lang] }}
      </h3>
      <h3 class="add__title" v-else>{{ langWord.titlewindowedit[lang] }}</h3>
      <label class="add__label">
        Title
        <input type="text" placeholder="Title" v-model="title" />
      </label>
      <label class="add__label">
        Content
        <input type="text" placeholder="Content" v-model="content" />
      </label>
      <div class="add__btns">
        <button @click="remove">{{ langWord.closebtn[lang] }}</button>
        <button @click="addNote" v-if="addOrChange">
          {{ langWord.addbtn[lang] }}
        </button>
        <button @click="saveNote(saveId)" v-else>
          {{ langWord.editwindowbtn[lang] }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    langWord: Object,
    lang: String,
    search: Boolean,
    notes: Array,
    saveForChange: Object,
    addOrChange: Boolean,
  },
  data() {
    return {
      title: "",
      content: "",
      time: "",
    };
  },
  methods: {
    remove() {
      this.$emit("closeModal");
    },

    addNote() {
      if (this.title != "" || this.content != "") {
        this.$emit("addCardProps", {
          title: this.title,
          content: this.content,
          time: new Date().toLocaleDateString(),
        });
      }
    },
    saveNote() {
      if (this.title != "" || this.content != "") {
        this.$emit("saveNote", {
          id: this.saveForChange.id,
          title: this.title,
          content: this.content,
          time: new Date().toLocaleDateString(),
        });
      }
    },
  },
  mounted() {
    if (!this.addOrChange) {
      this.title = this.saveForChange.title;
      this.content = this.saveForChange.content;
    }
  },
};
</script>
