<template>
  <v-content class="notFound">
    <v-container>
      <v-row>
        <v-col class="container" sm="12" md="10">
          <h1>404</h1>
          <h1>PAGE NOT FOUND</h1>
          <v-btn dark icon color="red" x-large @click="changeIcon">
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-btn>
          <v-switch
            v-model="$vuetify.theme.dark"
            primary
            label="Dark"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        'mdi-emoticon-dead',
        'mdi-face',
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue'
      ],
      iconIndex: 0
    }
  },
  methods: {
    changeIcon () {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    }
  },
  computed: {
    icon () {
      return this.icons[this.iconIndex]
    }
  }
}
</script>

<style scoped>
  .notFound {
    background-color: rgba(0,0,0,0.7)
  }
  .container {
    padding: 10px;
    margin-top: 50px;
    background-color: white;
    color: black;
    min-height: 80%;
    text-align: center;
  }
</style>
