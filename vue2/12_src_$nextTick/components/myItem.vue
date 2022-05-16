<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="changeTodo(todo.id)"/>
      <span v-show="!todo.isEdit" >{{todo.title}}</span>
      <input ref="editTitle" v-show="todo.isEdit" type="text" v-model="todo.title" @blur="handleblur(todo,$event)">
    </label>
    <button class="btn btn-danger" style="display:none" @click="handleDelete(todo.id)">删除</button>
    <button v-show="!todo.isEdit" class="btn btn-danger btn-edit" style="display:none" @click="handleEdit(todo)">编辑</button>
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
    handleEdit(todo) {
      // eslint-disable-next-line no-prototype-builtins
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(() => {
        this.$refs.editTitle.focus()
      })
    },
    handleblur(todo, e) {
      todo.isEdit = false
      if(!e.target.value.trim()) return alert('不能输入为空！')
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
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
.btn-edit {
  margin-right: 12px;
}
</style>