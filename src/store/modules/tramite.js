export default {
  namespaced: true,
  state: {
    modal: false,
    tramite: null
  },
  mutations: {
    openModal (state) {
      state.modal = true;
    },
    closeModal (state) {
      state.modal = false;
    },
    setTramite (state, tramite) {
      state.tramite = tramite;
    }
  }
};
