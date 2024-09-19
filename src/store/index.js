import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        id: 0,
        title: 'Sample Task',
        description: 'This is a sample task description.',
        assignee: 'John Doe',
        performers: ['John Doe', 'Jane Smith'],
        statusId: 0,
        priority: 'High',
        deadline: '2024-09-20'
      },
      {
        id: 1,
        title: 'Sample Task',
        description: 'This is a sample task description.',
        assignee: 'John Doe',
        performers: ['John Doe', 'Jane Smith'],
        statusId: 0,
        priority: 'High',
        deadline: '2024-09-20'
      }
    ],
    lastTaskId: 1,
    statuses: [
      {
        id: 0,
        title: 'TODO'
      },
      {
        id: 1,
        title: 'In progress'
      },
      {
        id: 2,
        title: 'Done'
      }
    ]
  },
  mutations: {
    ADD_TASK (state, task) {
      state.lastTaskId++
      state.tasks.push({
        ...task,
        id: state.lastTaskId
      })
    },
    UPDATE_TASK (state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
      }
    },
    DELETE_TASK (state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    },
    CHANGE_TASK_STATUS(state, { taskId, newStatusId }) {
      const taskIndex = state.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], statusId: newStatusId }
      }
    }
  },
  actions: {
    addTask ({ commit }, task) {
      commit('ADD_TASK', task)
    },
    updateTask ({ commit }, updatedTask) {
      commit('UPDATE_TASK', updatedTask)
    },
    deleteTask ({ commit }, taskId) {
      commit('DELETE_TASK', taskId)
    },
    changeTaskStatus({ commit }, payload) {
      commit('CHANGE_TASK_STATUS', payload)
    }
  },
  getters: {
    getTasksByStatus: state => statusId => {
      return state.tasks.filter(task => task.statusId === statusId)
    }
  }
})
