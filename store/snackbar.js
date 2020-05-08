export const state = () => ({
  snack: "",
})

export const mutations = {
  setSnack(state, snack) {
    state.snack = snack
  },
}
