<template>
  <div class="todo-footer" v-if="todos.length">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  props: ['todos'],
  computed: {
    doneTotal() {
      return this.todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
    },
    total() {
      return this.todos.length
    },
    isAll: {
      get() {
        return this.todos.length ? this.doneTotal === this.todos.length : false
      },
      set(value) {
        this.$emit('handleCheck',value)
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    clearAll() {
      this.$emit('clearAllTodo')
    }
  }
}
</script>

<style scoped>

/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>