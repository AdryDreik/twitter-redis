export default {
  methods: {
    editItem (id, url) {
      this.$service.get(`${url || this.url}/${id}`)
      .then(response => {
        if (response) {
          this.openModal(response);
        }
      });
    },

    deleteItem (id, url) {
      this.$confirm('¿Quiere eliminar el registro?', () => {
        this.$service.delete(url || this.url, id)
        .then(response => {
          this.$message.success('¡Registro eliminado correctamente!');
          this.$bus.$emit('updateList');
        });
      });
    },

    changeActive (obj, id) {
      let active = obj.active === 'ACTIVE';
      this.$confirm(`Está seguro de ${active ? 'activar' : 'desactivar'} el registro.`, () => {
        this.$service.patch(`${this.url}/${id}`, { 'transicion': active ? 'activar' : 'inactivar' })
        .then(response => {
          if (response) {
            this.updateList();
            if (active) {
              this.$message.success(`¡Registro activado!`, null, { timeout: 2000 });
            } else {
              this.$message.warning(`¡Registro desactivado!`, null, { timeout: 2000 });
            }
          }
        });
      }, () => (obj.active = active ? 'INACTIVE' : 'ACTIVE'));
    },

    updateList (id = '#btn-refresh-list') {
      console.log('Update list', document.querySelector(id));
      if (document.querySelector(id)) {
        document.querySelector(id).dispatchEvent(new window.Event('click'));
      }
    }
  }
};
