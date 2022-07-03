<template>
  <div class="appbar">
    <Navbar
      :lang="lang"
      :langWord="langWord"
      :search="search"
      :value="searchInput"
      @changeLang="changeLang"
      @searching="search = $event"
      @back="search = $event"
      @searchValue="searchInput = $event"
    />
    <AddCard
      :lang="lang"
      :langWord="langWord"
      v-if="modalOpen"
      @addCardProps="addCard"
      @closeModal="closeModal"
      @saveNote="saveNote"
      :saveForChange="saveForChange"
      :addOrChange="addOrChange"
    />
    <div class="container">
      <GridOrList
        :lang="lang"
        :langWord="langWord"
        :gridOrList="gridOrList"
        @changeList="gridOrList = $event"
        v-if="notes.length > 0"
      />

      <Card
        :notes="notesFilter"
        :lang="lang"
        :langWord="langWord"
        :search="search"
        :grid="gridOrList"
        @changeNote="changeNote"
      />
    </div>

    <AddBtn v-if="!search" @modalOpen="modalOpen = true" />
  </div>

  <router-view />
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Card from "./components/Card.vue";
import lang from "./lang.js";
import GridOrList from "./components/GridOrList.vue";
import AddCard from "./components/AddCard.vue";
import AddBtn from "./components/AddBtn.vue";

export default {
  components: { Navbar, Card, GridOrList, AddCard, AddBtn },
  data() {
    return {
      gridOrList: false,
      modalOpen: false,
      idCount: 1,
      notes: [],
      saveId: 0,
      lang: "uz",
      langWord: {},
      search: false,
      searchInput: "",
      saveForChange: {},
      addOrChange: true,
    };
  },

  methods: {
    changeLang(value) {
      this.lang = localStorage.lang = value;
    },
    removeNote(cardId) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id == cardId) {
          this.notes.splice(i, 1);
          break;
        }
      }
    },
    changeNote(cardId) {
      
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id == cardId) {
          this.addOrChange = false;
          this.saveForChange = {
            id: this.notes[i].id,
            title: this.notes[i].title,
            content: this.notes[i].content,
            time: this.notes[i].time,
          };
          this.modalOpen = true;
          break;
        }
      }
    },
    addCard(cardObj) {
      cardObj.id = this.idCount++;
      this.notes.push(cardObj);
      this.modalOpen = false;
      this.addOrChange = true;
    },
    closeModal() {
      this.addOrChange = true;
      this.modalOpen = false;
    },

    saveNote(CardObj) {
      console.log(CardObj);
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id == CardObj.id) {

          this.notes[i].title = CardObj.title;
          this.notes[i].content = CardObj.content;
          this.notes[i].time = CardObj.time
          this.modalOpen = false;
          this.addOrChange = true;
          break;
        }
      }
    },
  },
  created() {
    let localNotes = localStorage.getItem("notes");
    let id = localStorage.getItem("id");
    this.lang = localStorage.lang || "uz";
    this.langWord = lang;

    if (localNotes) {
      this.notes = JSON.parse(localNotes);
    }
    if (id) {
      this.idCount = JSON.parse(id);
    }
  },
  computed: {
    notesFilter() {
      let array = this.notes;
      let search = this.searchInput;
      if (!search) return array;
      // bo'sh joy o'chirish va harflarni kichiklashtrsh
      search = search.trim().toLowerCase();
      // filtrlash
      array = array.filter((item) => {
        if (item.title.toLowerCase().indexOf(search) !== -1) return item;
      });
      return array;
    },
  },
  watch: {
    idCount() {
      localStorage.setItem("id", JSON.stringify(this.idCount));
    },
    notes: {
      handler(array) {
        localStorage.setItem("notes", JSON.stringify(array));
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.appbar {
  position: relative;

  &__btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 20px;
    background: linear-gradient(
        0deg,
        rgba(103, 80, 164, 0.11),
        rgba(103, 80, 164, 0.11)
      ),
      #fffbfe;
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
      0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
  }
}

.note__off {
  text-align: center;
  margin-top: 30px;
  text-transform: uppercase;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
