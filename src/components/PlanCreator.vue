<template>
  <div>
    <ui-modal ref="createPlan" title="Create Plan" size="auto" dismiss-on="close-button esc">
      <ui-select label="Vocabulary Book" :options="['GRE3000']" v-model="book" @input="selectBook"></ui-select>
      <ui-textbox label="Plan Name" v-model="planName"></ui-textbox>
      <ui-textbox label="Number of words in each batch" type="number" :min="1" v-model="batch"></ui-textbox>
      <ui-textbox
        label="Number of batches for each round of review"
        type="number"
        :min="0"
        placeholder="Set as 0 to disable review"
        v-model="reviewAfterBatch"
      ></ui-textbox>
      <ui-checkbox v-model="shuffle">Shuffle the vocabularies</ui-checkbox>
      <ui-button color="primary" @click="onCreate">Create</ui-button>&nbsp;
      <ui-button @click="onCancel">Cancel</ui-button>
    </ui-modal>
    <ui-snackbar-container ref="snackbarContainer" position="center"></ui-snackbar-container>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      book: "",
      batch: 5,
      planName: "",
      reviewAfterBatch: 0,
      shuffle: true
    };
  },
  methods: {
    selectBook: function() {
      if (this.planName === "") {
        this.planName = this.book;
      }
    },
    open: function() {
      this.$refs.createPlan.open();
    },
    onCreate: function() {
      if (this.book === "" || this.planName === "") {
        this.$refs.snackbarContainer.createSnackbar({
          duration: 3000,
          message: "Some fields are incomplete."
        });
      } else {
        ipcRenderer.send("create-new-plan", {
          name: this.planName,
          book: this.book,
          batch: this.batch,
          reviewAfterBatch: this.reviewAfterBatch,
          shuffle: this.shuffle
        });
        this.$refs.createPlan.close();
      }
    },
    onCancel: function() {
      this.$refs.createPlan.close();
    }
  }
};
</script>

<style>
</style>