<template>
  <div>
    Text: {{ vocabulary }}
    <plan-creator ref="planCreator" />
  </div>
</template>

<script>
import PlanCreator from "../components/PlanCreator";

export default {
  data: function() {
    return {
      vocabulary: null
    };
  },
  components: {
    PlanCreator
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.planCreator.open();
    });
  }
};
</script>

<style>
</style>