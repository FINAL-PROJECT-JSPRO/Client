<template>
  <v-card>
    <v-card-title
      dark
      style="background-color: rgba(0, 0, 0, 0.7); color: white"
      primary-title
    >
      How To Run in Exam Mode
    </v-card-title>
    <div v-if="page === 1">
      <v-card-title>
        Run
      </v-card-title>
      <v-card-text>
        <p>You must invoke the function to run your function.</p>
        <p>Example:</p>
        <div class="function-example">
          <p>
            <span class="number">1</span><span class="function">function</span> helloWorld() {<br />
            <span class="number">2</span><span class="function tab">return</span> 'Hello World'<br />
            <span class="number">3</span>} <br />
            <span class="number">4</span> <br />
            <span class="number">5</span>helloWorld()
          </p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
    </div>

    <div v-if="page === 2">
      <v-card-title>
        Submit
      </v-card-title>
      <v-card-text>
        <p>You must <b>not</b> invoke the function to submit your answer</p>
        <p>Example: </p>
        <div class="function-example">
          <p>
            <span class="number">1</span><span class="function">function</span> helloWorld() {<br />
            <span class="number">2</span><span class="function tab">return</span> 'Hello World'<br />
            <span class="number">3</span>}
          </p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
    </div>

    <div v-if="page === 3">
      <v-card-title>
        Exam
      </v-card-title>
      <v-card-text>
        <p>Run will print your function result.</p>
        <p>Submit will check if your function is right with some case.</p>
        <p>If you're answer is right, the next button will become enable</p>
        <br />
        <p>Thats it.</p>
        <p>Have fun :)</p>
      </v-card-text>
      <v-divider></v-divider>
    </div>

    <div class="button-modal">
      <v-card-actions>
        <v-btn color="primary" @click="prev" :disabled="prevBtn">
          Prev
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="page !== 3">
        <v-btn color="primary" @click="next">
          Next
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="page === 3">
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="changeDialogStatus"
        >
          Okay, i understand
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Exam_Rule',
  data () {
    return {
      page: 1
    }
  },
  methods: {
    changeDialogStatus () {
      this.$emit('changeDialogStatus', false)
    },
    prev () {
      this.page -= 1
    },
    next () {
      this.page += 1
    }
  },
  computed: {
    prevBtn () {
      if (this.page === 1) {
        return true
      } else {
        return false
      }
    },
    nextBtn () {
      if (this.page === 3) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .button-modal {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }
  .function-example {
    background-color: rgb(30, 30, 30);
    color: rgb(206, 206, 206);
    font-family:'Courier New', Courier, monospace;
    padding: 15px
  }
  .function {
    color: rgb(83, 150, 205)
  }
  .tab {
    padding-left: 20px
  }
  .number {
    padding-right: 30px;
  }
</style>
