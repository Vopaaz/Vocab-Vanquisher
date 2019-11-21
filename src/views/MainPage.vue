<template>
  <div>Text: {{ vocabulary }}</div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      vocabulary: null
    };
  },
  created() {
    setInterval(() => {
      ipcRenderer.send("get-next-batch");
    }, 2000);
    ipcRenderer.on("next-batch", (event, data) => {
      this.vocabulary = data;
    });
  }
};
</script>

<style>
</style>