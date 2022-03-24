<template>
  <div>
    <nav class="blue">
      <div class="nav-wrapper">
        <a href="/" class="brand-logo center">MEVN-1</a>
      </div>
    </nav>
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey lighten-5">
          <div class="card-content black-text">
            <span class="card-title"
              >{{ edit ? "Edit" : "Create" }} a Note</span
            >
            <form @submit.prevent="sendNote">
              <label for="title">Title</label>
              <input
                type="text"
                v-model="note.title"
                class="validate"
                name="title"
                placeholder="Title"
              />
              <label for="content">Content</label>
              <input
                type="text"
                v-model="note.content"
                class="validate"
                name="content"
              />
              <button class="waves-effect waves-light btn-small green accent-4">
                {{ edit ? "Update" : "Create" }}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col s12 m6">
        <table class="striped bordered" style="margin: 0.5rem 0 1rem 0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note of notes" v-bind:key="note._id">
              <td>{{ note.title }}</td>
              <td>{{ note.content }}</td>
              <td>
                <a
                  @click="editNote(note._id)"
                  class="waves-effect waves-light btn-small light-blue accent-4"
                  >Edit</a
                >
                <a
                  @click="deleteNote(note._id)"
                  class="waves-effect waves-light btn-small red accent-4"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
class Note {
  constructor(title = "", content = "") {
    this.title = title;
    this.content = content;
  }
}

export default {
  data() {
    return {
      note: new Note(),
      notes: [],
      edit: false,
      noteToEdit: "",
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
    sendNote() {
      if (this.edit === false) {
        fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(this.note),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getNotes();
            this.note = new Note();
          });
      } else {
        fetch("/api/notes/" + this.noteToEdit, {
          method: "PUT",
          body: JSON.stringify(this.note),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getNotes();
            this.note = new Note();
            this.edit = !this.edit;
          });
      }
    },
    getNotes() {
      fetch("/api/notes")
        .then((res) => res.json())
        .then((data) => {
          this.notes = data;
        });
    },
    deleteNote(noteId) {
      fetch("/api/notes/" + noteId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getNotes();
        });
    },
    editNote(noteId) {
      fetch("/api/notes/" + noteId)
        .then((res) => res.json())
        .then((data) => {
          const { _id, title, content } = data;
          this.note = new Note(title, content);
          this.noteToEdit = _id;
          this.edit = true;
        });
    },
  },
};
</script>
