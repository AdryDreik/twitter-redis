<template>
  <section>
    <v-layout wrap row>
      <v-flex sm12 xs12 md12 lg12>
        <v-card class="px-3 pt-3 pb-3">
          <v-text-field
            label="Escribir un comentario"
            v-model="comment"
            :rules="nameRules"
            multi-line
            required
          ></v-text-field>
          <v-btn
            @click="enviarComentario"
            color="primary"
            :disabled="(comment) ? false : true"
          >
            ENVIAR COMENTARIO
          </v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <label class="tituloComentarios">Comentarios generales</label>
        <v-card class="mt-2" v-for="(comment, idx) in comments" :key="idx">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0"><strong>{{(comment && comment.username) ? comment.username.toUpperCase() : ''}}</strong></h3>
              <div>{{comment.comments}}</div>
              <small><i><strong>Publicado en </strong>{{comment.createAt || new Date()}}</i></small>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="dialog=true">Responder comentario</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <label class="tituloComentarios">Ultimo comentario de {{(user) ? user : ''}}</label>
        <v-layout wrap row>
          <v-flex xs12 sm12 md12 lg12>
            <v-card class="ml-2 mt-2">
              <v-card-media src="../../../static/images/Infinity-War-Movie-New-Presales-Record.jpg" height="400px"></v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0"><strong>{{(user && user.username) ? user.username.toUpperCase() : ''}}</strong></h3>
                  <div>{{(comments[0]) ? comments[0].comments : ''}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="primary" @click="dialog=true">Responder comentario</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
     <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            Responder comentario
          </v-card-title>
          <v-card-text>
            Comentario en desarrollo ...
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click.stop="dialog=false">Enviar</v-btn>
            <v-btn flat @click.stop="dialog=false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </section>
</template>
<script>
export default {
  created () {
    this.user = this.$storage.get('usuario');
    this.$service.get('user')
      .then((res) => {
        const comments = new Set();
        res.data.forEach(element => comments.add(element));
        for (let i of comments) {
          const tmp = i.split(':');
          this.comments.push({
            username: tmp[0],
            comments: tmp[1].toString().trim().replace(/'/ig, '')
          });
        }
        this.comments = this.comments.reverse();
      })
      .catch(err => this.$message.error(err.message));
  },
  data () {
    return {
      dialog: null,
      user: null,
      comments: [],
      comment: null,
      nameRules: [
        v => !!v || 'Tiene que añadir un comentario para enviar'
      ]
    };
  },
  methods: {
    enviarComentario () {
      this.$service.post('user', { user: this.user, comments: this.comment })
        .then((res) => {
          if (res) {
            this.$router.push('comments');
            this.$message.success(`${this.user}, tu comentario ha sido exitosamente publicado.`);
          }
          this.$store.commit('setMain', false);
          this.$nextTick(function () {
            this.$store.commit('setMain', true);
          });
        })
        .catch(err => this.$message.error(err));
    }
  }
};
</script>
<style lang="scss" scope>
.addComment {
  margin-top: -255px;
}
.tituloComentarios {
  color: #FFF;
  font-weight: 700;
}
.application--wrap {
  overflow: hidden !important;
  background: #606c88;
  background: -moz-linear-gradient(top, #606c88 0%, #3f4c6b 100%);
  background: -webkit-linear-gradient(top, #606c88 0%,#3f4c6b 100%);
  background: linear-gradient(to bottom, #606c88 0%,#3f4c6b 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#606c88', endColorstr='#3f4c6b',GradientType=0 );
}
</style>

