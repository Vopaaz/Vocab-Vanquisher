<template>
  <b-container class="table-container">
    <b-row>
      <b-col offset="1" sm="10" md="10" lg="10" xl="10">
        <div v-if="$store.state.activePlan === undefined">Create a plan to get started.</div>
        <b-table
          striped
          hover
          :items=" hasDef ? rows : noDefRows"
          :fixed="true"
          @row-contextmenu="onContextMenu"
        >
          <template v-slot:cell(definition)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

const { remote } = require("electron");
const { Menu, MenuItem } = remote;

export default {
  data: function() {
    return {
      hasDef: true,
      menu: null,
      selecting: "",
      firstLookup: true
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
          i < plan.batch && plan.current + i < plan.data.length;
          i++
        ) {
          res.push(plan.data[plan.current + i]);
        }
      } else {
        for (
          let i = 0;
          i < plan.batch && plan.reviewCurrent + i < plan.data.length;
          i++
        ) {
          res.push(plan.data[plan.reviewCurrent + i]);
        }
      }
      res = res.map(rawRow => {
        return {
          vocabulary: rawRow[0],
          definition: rawRow[1].replaceAll(";", "<br />")
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
  methods: {
    onContextMenu: function(item, index, event) {
      event.preventDefault();
      let selecting = item.vocabulary;
      window.open(
        "https://cn.bing.com/dict/search?q=" +
          selecting +
          "&qs=n&form=Z9LH5&sp=-1&pq=" +
          selecting,
        "_blank",
        "nodeIntegration=no"
      );
    }
  },
  created() {
    let self = this;
    window.addEventListener("keypress", e => {
      if (!self.$store.state.hasModal) {
        if (e.keyCode === 32) {
          e.preventDefault();
          self.hasDef = !self.hasDef;
        } else if (e.keyCode === 13) {
          e.preventDefault();
          self.$store.commit("nextBatch");
        }
      }
    });

    this.menu = new Menu();
    this.menu.append(
      new MenuItem({
        label: "Look up in the dictionary",
        click() {
          if (self.firstLookup) {
            self.firstLookup = false;
            window.open(
              "https://cn.bing.com/dict/?mkt=zh-cn",
              "_blank",
              "nodeIntegration=no"
            );
            setTimeout(() => {
              self.openLookupWindow();
            }, 1000);
          } else {
            self.openLookupWindow();
          }
        }
      })
    );
  }
};
</script>

<style>
.table-container {
  margin-top: 50px;
  font-size: 14pt;
}
</style>