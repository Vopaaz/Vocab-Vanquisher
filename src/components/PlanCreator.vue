<template>
  <div>
    <ui-modal
      ref="createPlan"
      title="Create Plan"
      size="auto"
      dismiss-on="close-button esc"
      @open="commitOpen"
      @close="commitClose"
    >
      <ui-select label="Vocabulary Book" :options="['GRE3000']" v-model="book" @input="selectBook"></ui-select>
      <ui-textbox label="Plan Name" v-model="planName"></ui-textbox>
      <ui-textbox label="Number of words in each batch" type="number" :min="1" v-model="batch"></ui-textbox>
      <ui-textbox
        label="Number of batches for each round of review"
        type="number"
        :min="0"
        help="Set as 0 to disable review"
        v-model="reviewAfterBatch"
      ></ui-textbox>
      <ui-checkbox v-model="shuffle">Shuffle the vocabularies</ui-checkbox>
      <ui-button color="primary" @click="onCreate">Create</ui-button>&nbsp;
      <ui-button @click="onCancel">Cancel</ui-button>
      <br />
      <br />
      <ui-alert
        v-if="showAlert"
        type="error"
        :removeIcon="true"
        :dismissible="false"
      >Some fields are incomplete or has wrong value.</ui-alert>
    </ui-modal>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      book: "",
      batch: "5",
      planName: "",
      reviewAfterBatch: "0",
      shuffle: true,
      showAlert: false
    };
  },
  methods: {
    commitOpen: function() {
      this.$store.commit("openModal");
    },
    commitClose: function() {
      this.$store.commit("closeModal");
    },
    selectBook: function() {
      if (this.planName === "") {
        this.planName = this.book;
      }
    },
    open: function() {
      this.$refs.createPlan.open();
    },
    onCreate: function() {
      if (
        this.book !== "" &&
        this.planName !== "" &&
        this.batch !== "" &&
        parseInt(this.batch) > 0 &&
        this.reviewAfterBatch !== "" &&
        parseInt(this.reviewAfterBatch) >= 0
      ) {
        ipcRenderer.send("create-new-plan", {
          name: this.planName,
          book: this.book,
          batch: parseInt(this.batch),
          reviewAfterBatch: parseInt(this.reviewAfterBatch),
          shuffle: this.shuffle
        });
        this.$refs.createPlan.close();
        this.showAlert = false;
      } else {
        this.showAlert = true;
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