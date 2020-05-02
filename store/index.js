export const state = () => ({
  email: null,
})

export const mutations = {
  setEmail (state, email) {
    state.email = email;
  }
}
