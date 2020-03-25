<template>
  <div class="header bg-blue">
    <div class="max-width-block header-inner">
      <router-link id="task-list" :to="{ name: 'product-list' }">
        <span class="top-desktop">Главная</span>
        <font-awesome-icon icon="list-ul" size="2x" class="top-icon"/>
      </router-link>
      <router-link id="task-add" :to="{ name: 'task-add' }">
        <span class="top-desktop">Создать</span>
        <font-awesome-icon icon="plus-circle" size="2x" class="top-icon"/>
      </router-link>

      <div class="spacer"/>

      <input v-if="isHome" v-model="searchText" type="search" placeholder="Искать товары...">
    </div>

    <router-link id="cart" :to="{ name: 'cart' }">
      <font-awesome-icon icon="shopping-cart" size="2x" class="cart-icon"/>
    </router-link>

  </div>
</template>

<script>
import { bus } from "../utility/bus.js";

export default {
  name: "TopNavigation",

  data() {
    return {
      searchText: "",
      tasks: ["a"],
      blackTheme: false,
    };
  },

  props: ["tasks1"],

  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  },

  methods:{
  
  },

  mounted: function() {
    bus.$on("remove", function(tasks) {
     
      var vm = this;
      vm.tasks = tasks;
    });

    this.$root.$on('changeTheme', this.changeTheme);
  },

  watch: {

    /**
     * Поиск задач по имени (name)
     */
    searchText: function() {
      var tasks = this.tasks;
      var searchedTasks = [];
      var str = new RegExp(this.searchText);
      tasks.forEach(element => {
        var found = str.test(element.name);
        if (found) {
          searchedTasks.push(element);
        }
      });

      this.$parent.$children[1].filteredTasks = searchedTasks;
    },
  }
};
</script>

<style lang="scss" scoped>

.header {
  
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 1em;

  .header-inner {
    display: flex;
    justify-content: space-between;
  }

  a {
    color: #fff;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  }

  .router-link-exact-active {
    color: #86deb7;
  }

  .spacer {
    flex: 1 0;
  }

  input {
    border: 0;
    border-radius: 3px;
    font-size: 1rem;
    outline: 0;
    padding: 7px;
    width: 209px;
    transition: width 0.6s ease-in-out;
  }

  input[type="text"]:focus {
    width: 400px;
  }

  .top-icon {
    display: none;
  }

}

@media screen and (max-width: 550px) {
  .header {
    flex-wrap: wrap;

    input {
      margin: 1rem auto 0;
      width: 100%;
    }
    .top-desktop {
      display: none;
    }
    .top-icon {
      display: block;
    }
  }
}

</style>

