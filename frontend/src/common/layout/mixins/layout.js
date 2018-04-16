export default {
  methods: {
    setActive (url) {
      let el = document.querySelector('#sidenav-menu .list__tile.active');
      if (el) {
        el.classList.remove('active');
      }
      if (url.length) {
        el = document.querySelector(`#sidenav-menu .list__tile[data-url='${url}']`);
        if (el) {
          el.classList.add('active');
        }
      }
    }
  }
};
