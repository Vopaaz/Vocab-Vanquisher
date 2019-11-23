<template>
  <div>
    <ui-toolbar :raised="false" :removeNavIcon="true" :brand="brand" :title="progress">
      <div slot="actions">
        <ui-icon-button
          color="black"
          has-dropdown
          icon="more_vert"
          ref="dropdown1"
          size="large"
          type="secondary"
        >
          <ui-menu
            contain-focus
            has-icons
            slot="dropdown"
            :options="menuOptions"
            @select="onSelect"
            @close="$refs.dropdown1.closeDropdown()"
          ></ui-menu>
        </ui-icon-button>
      </div>
    </ui-toolbar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      menuOptions: [
        {
          key: "create",
          label: "Create New Plan"
        },
        {
          key: "manage",
          label: "Manage Plan"
        }
      ]
    };
  },
  computed: {
    brand: function() {
      if (this.$store.state.activePlan === undefined) {
        return "Vocabulary Vanquisher";
      } else {
        return this.$store.state.activePlan.name;
      }
    },
    progress: function() {
      if (this.$store.state.activePlan === undefined) {
        return "";
      } else {
        let plan = this.$store.state.activePlan;
        return `Progress: ${plan.current} / ${plan.data.length}`;
      }
    }
  },
  methods: {
    onSelect: function(option) {
      this.$emit(option.key);
    }
  }
};
</script>

<style>
</style>