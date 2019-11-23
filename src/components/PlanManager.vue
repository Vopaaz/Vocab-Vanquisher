<template>
  <div>
    <ui-modal
      ref="managePlan"
      title="Choose a Plan"
      size="auto"
      dismiss-on="backdrop close-button esc"
    >
      <ui-select label="Choose a plan" :options="allPlans" v-model="planName"></ui-select>
      <ui-button color="primary" @click="onSwitch">Switch</ui-button>&nbsp;
      <ui-button @click="onDelete" color="red">Delete</ui-button>
    </ui-modal>
  </div>
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
    },
    planNameOK: function() {
      return this.planName !== "";
    }
  },
  methods: {
    open: function() {
      this.$refs.managePlan.open();
    },
    onSwitch: function() {
      if (this.planNameOK) {
        ipcRenderer.send("switch-plan", this.planName);
        this.$refs.managePlan.close();
        this.planName = "";
      }
    },
    onDelete: function() {
      if (this.planNameOK) {
        ipcRenderer.send("delete-plan", this.planName);
        this.$refs.managePlan.close();
        this.planName = "";
      }
    }
  }
};
</script>

<style>
</style>