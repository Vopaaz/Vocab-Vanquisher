<template>
  <b-container>
    <b-row v-if="show" class="container">
      <b-col offset="2" sm="8">
        <ui-alert
          @dismiss="dismiss"
        >Press 'Space' to show/hide definition. Press 'Enter' to show next batch of words.</ui-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    dismiss: function() {
      this.show = false;
    }
  },
  created: function() {
    let self = this;
    ipcRenderer.send("ask-first-time");
    ipcRenderer.on("is-first-time", () => {
      self.show = true;
    });
  }
};
</script>

<style>
</style>