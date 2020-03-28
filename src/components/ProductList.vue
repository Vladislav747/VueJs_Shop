<template>
  <div class="productList max-width-block">
    <div v-if="!isLoading && !noTasks" class="filterWrapper">
      <div class="filterIcon bg-light-green" v-on:click="showFilter()">
        <font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
      </div>
      
      <div v-if="!isLoading && !noTasks" id="filter">
        <p class="filterWrapper-text">Фильтр</p>

        <div class="filter-inner">

          <!-- Фильтр по категориям  -->
          <div class="filter-property">
            <span class="filter-property--title">Категория:</span>
            <select class="filter-property--body" v-model="filterCategory">
              <option></option>
              <option v-for="type in taskTypes" :key="type">{{ type }}</option>
            </select>
          </div>

          <!-- Фильтр по Дедлайну  -->
          <div class="filter-property">
            <span class="filter-property--title">Срочность:</span>
            <select class="filter-property--body" v-model="filterDateDeadline">
              <option></option>
              <option v-for="type in deadlineTypes" :key="type">{{ type }}</option>
            </select>
          </div>

        </div>
      </div>
    </div>

    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="loading">Загружаю товары</div>
    <div v-if="noTasks" class="no-tasks">
      <h3>Товары не найдены</h3>Нажмите вверху на панели Добавить Новый Товар
    </div>

    <div id="tasks">
      <product-card v-for="task in filteredTasks" :key="task._id" :task="task"/>
    </div>
  </div>  
</template>

<script>
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../utility";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",

  components: {
    ProductCard
  },

  data() {
    return {
      isLoading: true,
      tasks: [],
      filteredTasks: [],
      filterCategory: "",
      filterDateDeadline: "",
      taskTypes: TASK_TYPES,
      deadlineTypes: DEADLINE_TYPES,
      filteredTasksTime: [],
      filteredTasksDeadline: []
    };
  },

  computed: {
    noTasks() {
      return (
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    }
  },

  watch: {
    filterCategory: function() {
      if (this.filteredTasksDeadline.length === 0) {
        this.filteredTasksTime = this.tasks.filter(this.filterTask);
      } else {
        this.filteredTasksTime = this.filteredTasksDeadline.filter(
          this.filterTask
        );
      }
      this.filteredTasks = this.filteredTasksTime;
    },

    filterDateDeadline: function() {
      if (this.filteredTasksTime.length === 0) {
        this.filteredTasksDeadline = this.tasks.filter(this.filterTaskDeadline);
      } else {
        this.filteredTasksDeadline = this.filteredTasksTime.filter(
          this.filterTaskDeadline
        );
      }
      this.filteredTasks = this.filteredTasksDeadline;
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    /**
     * Получить задачи
     */
    async getTasks() {
      try {
        const response = await this.$http.get("tasks");
        this.tasks = response.data;
        this.$emit("remove", this.tasks);
        this.$emit("get-tasks", this.tasks);
        //Создается копия массива
        this.filteredTasks = this.tasks.slice();
      } catch (error) {
        showNoty("Ошибка вывода списка задач  " + error);
      }

      this.$parent.$children[0].tasks = this.filteredTasks;
      this.isLoading = false;
    },

    /**
     * Фильтровать задачу по категории
     * @param {object} task - объект текущей задачи
     *
     */
    filterTask(task) {
      if (this.filterCategory !== "") {
        return task.category.toString() === this.filterCategory.toString();
      } else {
        return true;
      }
    },

    /**
     * Фильтровать задачу по деадлайну
     * @param {object} task - объект текущей задачи
     *
     */
    filterTaskDeadline(task) {
      var dateDeadline = new Date(task.dateOfTask).getTime();
      var nowDate = new Date().getTime();

      switch (this.filterDateDeadline) {
        case "Непросроченные Задачи":
          return dateDeadline >= nowDate;

        case "Просроченные Задачи":
          return dateDeadline < nowDate;

        default:
          return true;
      }
    },

    /**
     * Показывать/Скрывать блок фильтра
     */
    showFilter() {
      var divFilter = document.getElementsByClassName("filterWrapper")[0];
      var overlay = this.$root.$data.showOverlay();
      divFilter.style['z-index'] = overlay.index;
      overlay.div.onclick = function(e){
        if(typeof(e.target.remove) == 'function') {
          e.target.remove();
          divFilter.classList.toggle("show");
        }
      }
      divFilter.classList.toggle("show");
    }
  },

  /**
   * Переход на добавление задачи
   * @param {object} task - объект текущей задачи
   *
   */
  addTask() {
    this.$router.push("task-add");
  }
};
</script>

<style lang="scss" scoped>

#filter {
  margin-bottom: 1em;
  text-align: center;
}



.filterWrapper-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.filterWrapper {
  right: -100%;
  top: 0;
  height: 100%;
  position: fixed;
  width: 300px;
  background-color: #f9f9f9;
  box-shadow: none;
  z-index: 2;
  transition: right 0.2s linear;
  padding: 20px;
  &.show {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.19);
    visibility: visible;
    transition-delay: 0s;
    right: 0px;
  }
  &.show .filterIcon {
    display: none;
  }

    .filter-inner {
      .filter-property {
        margin: 10px 0;
        text-align: left;

        .filter-property--title {
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
          display: block;
        }

        select {
          &.filter-property--body {
            border-radius: 3px;
            outline: 0;
            padding: 5px;
            width: 100%;
          }
        }
      }
    }
}

.productList {
  z-index: 1;
}

#tasks {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
  padding: 16px 0;
}

.filterIcon {
  transition: 0.5s linear;
  right: 2px;
  position: fixed;
  top: 15%;
  padding: 10px 14px;
  border-radius: 25%;
  cursor: pointer;
  box-shadow: 0px 0px 5px 1px #c5c5c5;
  svg {
    color: white;
  }
}

@media screen and (max-width: 800px) {
  #filter {
    select {
      width: 40%;
    }
  }

  .card:nth-child(3n) {
    margin-right: 1em;
  }

  .card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 550px) {
  #filter {
    select {
      width: 60%;
    }
  }
}


@media screen and (max-width: 800px){
   #tasks{
        justify-content: center;

  }
}

.no-tasks {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
}

.loading {
  text-align: center;
}


</style>
