<template>
  <b-container class="table-container">
    <b-row>
      <b-col offset="2" sm="8" md="8" lg="8" xl="8">
        <b-table striped hover :items=" hasDef ? rows : noDefRows">
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
      hasDef: false
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
          definition: "" + "<br />".repeat(rawRow.definition.split("<br />").length - 1)
        };
      });
    }
  }
};
</script>

<style>
.table-container {
  margin-top: 50px;
  font-size: 14pt;
}
</style>