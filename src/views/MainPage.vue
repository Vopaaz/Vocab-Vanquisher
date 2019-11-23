<template>
  <div>
    <tool-bar @create="$refs.planCreator.open()" @manage="$refs.planManager.open()" />
    Text: {{ vocabulary }}
    <plan-creator ref="planCreator" />
    <plan-manager ref="planManager" />
  </div>
</template>

<script>
import PlanCreator from "../components/PlanCreator";
import PlanManager from "../components/PlanManager";
import ToolBar from "../components/ToolBar";
import { ipcRenderer } from "electron";

export default {
  data: function() {
    return {
      vocabulary: null
    };
  },
  components: {
    PlanCreator,
    PlanManager,
    ToolBar
  },
  mounted() {
    ipcRenderer.send("get-plan-info");
    ipcRenderer.on("plan-info", (event, info) => {
      this.$store.commit("setActivePlan", info.activePlan);
      this.$store.commit("setAllPlans", info.allPlans);
      if (info.activePlan === undefined) {
        this.$nextTick(() => {
          this.$refs.planCreator.open();
        });
      }
    });
  }
};
</script>

<style>
</style>