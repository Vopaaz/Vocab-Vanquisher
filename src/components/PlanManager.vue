<template>
  <ui-modal ref="managePlan" title="Choose a Plan" size="auto" dismiss-on="backdrop close-button esc">
    <ui-select label="Choose a plan" :options="allPlans" v-model="planName"></ui-select>
    <ui-button color="primary" @click="onSwitch">Switch</ui-button>&nbsp;
    <ui-button @click="onDelete" color="red">Delete</ui-button>
  </ui-modal>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      planName: ""
    };
  },
  computed: {
    allPlans: function() {
      if (this.$store.state.allPlans === undefined) {
        return [];
      } else {
        return this.$store.state.allPlans.map(x => x.name);
      }
    }
  },
  methods: {
    open: function() {
      this.$refs.managePlan.open();
    },
    onSwitch: function() {
      ipcRenderer.send("switch-plan", this.planName);
      this.$refs.managePlan.close();
    },
    onDelete: function() {
      this.$refs.managePlan.close();
    }
  }
};
</script>

<style>
</style>