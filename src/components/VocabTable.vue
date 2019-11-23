<template>
  <b-container class="table-container">
    <b-row>
      <b-col offset="1" sm="10" md="10" lg="10" xl="10">
        <b-table striped hover :items=" hasDef ? rows : noDefRows" :fixed="true">
          <template v-slot:cell(definition)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: function() {
    return {
      hasDef: true
    };
  },
  computed: {
    plan: function() {
      return this.$store.state.activePlan;
    },
    rows: function() {
      let plan = this.plan;
      if (plan === undefined) {
        return [];
      }
      let res = [];
      if (plan.on === "current") {
        for (
          let i = 0;
          i < plan.batch && plan.current + i < plan.order.length;
          i++
        ) {
          res.push(plan.data[plan.order[plan.current + i]]);
        }
      } else {
        for (
          let i = 0;
          i < plan.batch && plan.reviewCurrent + i < plan.order.length;
          i++
        ) {
          res.push(plan.data[plan.order[plan.reviewCurrent + i]]);
        }
      }
      res = res.map(rawRow => {
        return {
          vocabulary: rawRow[0],
          definition: rawRow[1].replace(";", "<br />")
        };
      });
      return res;
    },
    noDefRows: function() {
      return this.rows.map(rawRow => {
        return {
          vocabulary: rawRow.vocabulary,
          definition:
            "" + "<br />".repeat(rawRow.definition.split("<br />").length)
        };
      });
    }
  },
  mounted() {
    /* eslint-disable */
    let self = this;
    window.addEventListener("keypress", e => {
      if (!self.$store.state.hasModal) {
        if (e.keyCode === 32) {
          self.hasDef = !self.hasDef;
        }
      }
    });
  }
};
</script>

<style>
.table-container {
  margin-top: 50px;
  font-size: 14pt;
}
</style>