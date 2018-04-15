import error from './errors';
import validate from './validates';
import menu from './menu';

export default {
  error,
  validate,
  menu,
  app: {
    title: 'App',
    account: `Atamiri sart'awixa`,
    settings: 'Wakichawinaka',
    logOut: `Sart'awi tukuyaña`
  },
  login: {
    title: `Sart'awima qalltama`,
    user: 'Atamiri jaqi suti',
    password: `Aru imt'ata`,
    rememberMe: 'Amtasita',
    forgotPass: `¿Armastati aru imt'añama?`,
    login: 'Mantaña',
    noAccount: '¿Janit atamirina qillqataqta?',
    signUp: 'Akxaru qillqantasima'
  },
  common: {
    add: `Yapt'aña`,
    required: `Qillqañatakipuni`,
    cancel: 'Chhaqtayaña',
    save: 'Imaña',
    rowsPage: 'siqinaka, laphi layku',
    updateList: `Wasitata waruchaña `,
    filters: `Ch'umaña/Thaqhaña`,
    of: 'de',
    active: `Q'apha`,
    edit: 'Qillqsuña',
    status: 'Estado',
    actions: `Lurañanaka`
  },
  entity: {
    title: `Jach'a utanaka`,
    add: `Machaqa jach'a uta yapt'aña`,
    crud: {
      edit: 'Qillqsuyaña',
      code: 'Código',
      acronym: `Jisk'a suti`,
      description: 'Amuykipawinaka',
      status: 'Estado',
      addEnt: `jach'a uta yapt'aña`,
      editEnt: `jach'a uta qillqsuña`
    }
  },
  account: {
    title: `Atamiri sart'awinaka`,
    add: `Machaqa atamiri sart'awi`,
    select: `Jach'a uta ajllima, atamiri sart'awinaka uñjañataki`,
    crud: {
      edit: 'Qillqsuña',
      accountNumber: `Atamiri sart'awi jakhupa`,
      status: 'Estado',
      entity: `Jach'a uta`,
      addAc: `Atamiri sart'awi yapt'aña`,
      editAc: `Atamiri sart'awi qillqsuña`
    }
  },
  user: {
    title: 'Usuarios',
    add: 'Agregar nuevo usuario',
    crud: {
      edit: 'Editar',
      user: 'Usuario',
      userData: 'Datos del usuario',
      entity: 'Entidad',
      role: 'Rol',
      status: 'Estado',
      addUser: 'Agregar usuario',
      editUser: 'Editar usuario'
    }
  }
};
