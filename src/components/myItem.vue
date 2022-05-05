<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="changeTodo(todo.id)"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    todoObj: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  data() {
    return {
      todo: {}
    }
  },
  watch: {
    todoObj: {
      handler(val) {
        this.todo = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleDelete(id) {
      if (confirm('确定删除吗？')) {
        this.$bus.$emit('deleteTodo',id)
      }
    },
    changeTodo(id) {
      this.$bus.$emit('checkTodo',id)
    }
  }
}
</script>

<style scoped>

/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background: #eee;
}
li:hover button{
  display: block!important;
}
</style>