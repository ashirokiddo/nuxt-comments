export const state = () => ({
  comments: []
})

export const mutations = {
  setComments (state, comments) {
    state.comments = comments
  }
}

export const actions = {
  async fetchComments ({ commit, state }) {
    if (state.comments.length) {
      return
    }

    const data = await this.$api.getComments()
    commit('setComments', data.data)
  }
}
