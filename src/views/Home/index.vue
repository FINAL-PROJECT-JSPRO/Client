<template>
  <v-app>
    <Navbar />
    <v-carousel
      dark
      interval="5000"
      cycle
      :show-arrows="false">
      <v-carousel-item
        v-for="(item,i) in items"
        eager
        :src="item.src"
        :key="i">
          <div class="carousel-item-image">
            <v-img :src="item.src" class="img-responsive img-bright" />
          </div>
          <div class="carousel-item-text">
            <div class="carousel-item-text-typing">
              {{ item.text }}
              </div>
          </div>
        </v-carousel-item>
    </v-carousel>
    <v-content class="padding-top-medium">
      <v-container>
        <h2 class="level-heading letter-spacing-heading">Our Levels</h2>
        <v-row>
          <v-col v-for="level in levels" :key="level.id" sm="12" md="4">
            <Level :level="level" />
          </v-col>
        </v-row>
        <div class="about-course">
          <h2 class="about-course-heading letter-spacing-heading">About the course</h2>
          <div class="width-3rem height-4 rounded bg-primary mx-auto mb-4"></div>
          <v-row class="about-course-content">
            <v-col sm="12" md="6">
              <p>Technologists need the latest skills to do their jobs effectively.
                And technology leaders need visibility into how their teams work to put the right people on the right projects.
                JSPro gives you both—the skills and data you need to succeed.</p>
              <p>Our commitment to drive significant, lasting social impact by improving equal access to technology skills and investing in catalytic solutions.</p>
              <p>Growth your career with complete courses</p>
              <ul class="list-unstyled list-style-icon list-icon-check my-4">
                <li>
                  <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Focused subject concentrations
                </li>
                <li>
                  <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Usually 3 or more coordinated courses
                </li>
                <li>
                  <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Develop a skill set within a specific area
                </li>
              </ul>
              <div class="btn-link-wrapper">
                <router-link class="btn-link" to="/courses">
                  Start Learning Now
                </router-link>
              </div>
            </v-col>
            <v-col sm="12" md="6">
              <v-img src="../../assets/images/working.jpg" class="img-responsive" />
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-spacer></v-spacer>
      <v-parallax
      dark
      src="../../assets/images/woman.jpg"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <div class="parallax-wrapper">
              <h1 class="display-1 font-weight-bold mb-4">Learn From Best Online Training Course</h1>
              <h4 class="subheading">Build your application today!</h4>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    <v-container>
      <h3 class="text-center example-coding-heading">Try your skill</h3>
      <div class="width-3rem height-4 rounded bg-primary mx-auto mb-4"></div>
      <v-row>
        <v-col sm="12" md="6">
          <div class="coding-wrapper">
            <div class="padding-coding" id="coding-example" style="width:100%;min-height:300px"></div>
            <div style="padding-left: 2rem;" class="text-left">
              <v-btn @click="runningCode" rounded color="indigo" dark>Run</v-btn>
            </div>
          </div>
        </v-col>
        <v-col sm="12" md="6">
          <v-textarea
            outlined
            class="padding-coding"
            name="input-7-4"
            label="Result"
            :value="result"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-content class="our-team">
      <h2 class="text-center color-white heading-our-team">Meet Our Team</h2>
      <v-row>
        <v-col v-for="(member) in members.slice(0,3)" :key="member.id" sm="6" xs="12" md="4">
          <Member :member="member" />
        </v-col>
        <v-col v-for="(member) in members.slice(3)" :key="member.id" sm="6" xs="12" md="6">
          <Member :member="member" />
        </v-col>
      </v-row>
    </v-content>
    <Footer />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Level from './components/Level'
import Member from './components/Member'
// import * as monaco from 'monaco-editor'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as acorn from 'acorn'
import * as astring from 'astring'
export default {
  name: 'Home',
  components: {
    Navbar,
    Level,
    Member,
    Footer
  },
  data () {
    return {
      items: [
        {
          src: require('../../assets/carousel/slide-1.jpg'),
          text: 'function start () { }'
        },
        {
          src: require('../../assets/carousel/slide-2.jpg'),
          text: 'function learn () { }'
        },
        {
          src: require('../../assets/carousel/slide-3.jpg'),
          text: 'function coding () { }'
        },
        {
          src: require('../../assets/carousel/slide-4.jpg'),
          text: 'function master () { }'
        }
      ],
      members: [
        {
          id: 1,
          name: 'Diaz Kautsar',
          role: 'Backend Developer',
          image: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light'
        },
        {
          id: 2,
          name: 'Ahmad',
          role: 'Backend Developer',
          image: 'https://avataaars.io/?avatarStyle=Transparent&clotheColor=Heather&clotheType=ShirtCrewNeck&eyeType=Default&eyebrowType=Default&facialHairColor=Black&facialHairType=Blank&hairColor=Blonde&mouthType=Default&skinColor=Pale&topType=ShortHairShortRound'
        },
        {
          id: 3,
          name: 'Muhammad Fikri',
          role: 'Frontend Developer',
          image: 'https://avataaars.io/?avatarStyle=Transparent&clotheColor=Heather&clotheType=ShirtVNeck&eyeType=Happy&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=BeardLight&hairColor=Black&mouthType=Smile&skinColor=Pale&topType=ShortHairShortFlat'
        },
        {
          id: 4,
          name: 'Andara Sophan',
          role: 'Frontend Developer',
          image: 'https://avataaars.io/?accessoriesType=Blank&avatarStyle=Transparent&clotheColor=Heather&clotheType=Hoodie&eyeType=Default&eyebrowType=Default&facialHairType=Blank&graphicType=Bear&hairColor=BrownDark&mouthType=Smile&skinColor=Pale&topType=ShortHairShortFlat'
        },
        {
          id: 5,
          name: 'Hansin Susatya',
          role: 'Frontend Developer',
          image: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Dizzy&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
        }
      ],
      editor: '',
      result: ''
    }
  },
  methods: {
    runningCode () {
      const customGenerator = Object.assign({}, astring.baseGenerator, {
        AwaitExpression: function (node, state) {
          state.write('await ')
          var argument = node.argument
          if (argument != null) {
            this[argument.type](argument, state)
          }
        }
      })
      const ast = acorn.parse(this.editor.getValue(), { ecmaVersion: 8 })
      const formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      // eslint-disable-next-line no-new-func
      const func = new Function(formattedCode)
      this.result = func()
      console.log(this.result)
      // const display = () => {
      //   // eslint-disable-next-line no-new-func
      //   return new Function(formattedCode)
      // }
      // const result = display()
      // console.log(result())
      // // const result = func()
      // // console.log(result)
    }
  },
  created () {
    this.$store.dispatch('getAllLevel')
  },
  mounted () {
    this.editor = monaco.editor.create(document.getElementById('coding-example'), {
      value: [
        '\nfunction hello() {',
        '\treturn "I Love Javascript";',
        '}'
      ].join('\n'),
      language: 'javascript',
      theme: 'vs-dark',
      scrollbar: {
        useShadows: false,
        verticalHasArrows: true,
        horizontalHasArrows: true,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 17,
        horizontalScrollbarSize: 17,
        arrowSize: 30
      }
    })
  },
  computed: {
    levels () {
      return this.$store.state.level.levels
    }
  }
}
</script>
<style lang="scss" scoped>
.img-bright {
  filter: brightness(0.5);
}
.padding-top-medium {
  padding-top: 1rem !important;
}
.carousel-item {
  &-image {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
  }
  &-text {
    color: #fff;
    font-size: 3rem;
    font-weight: bolder;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-typing {
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        border-right: .15em solid orange; /* The typwriter cursor */
        white-space: nowrap; /* Keeps the content on a single line */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        letter-spacing: .15em; /* Adjust as needed */
        animation:
        typing 3.5s steps(40, end),
        blink-caret .75s step-end infinite;
      }
    }
  }

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

.level-heading {
  font-size: 2rem;
  color: #202428;
  text-align: center;
  padding-bottom: 1rem;
}

.about-course {
  padding-top: 2rem;
  padding-bottom: 5rem;
  &-heading {
    font-size: 1.8rem;
    text-align: center;
  }

  &-content {
    padding-top: 1.5rem;
    p {
      text-align: justify;
    }
  }
}
.width-3rem {
  width: 3rem!important;
}
.height-4 {
  height: 0.25rem;
}
.bg-primary {
  background-color: #00CB54!important;
  color: #fff;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.icon-medium {
  font-size: 1rem;
}

.icon-check {
  color: rgb(255, 193, 7);
}

.list-style-icon {
  > li {
    position: relative;
    margin-bottom: 0.3125rem;
   }
}

.btn-link-wrapper {
  margin-top: 1rem;
  display: inline-block;
}

.btn-link {
  padding: 1rem 2rem;
  text-decoration: none;
  color: #fff;
  background-color: #FFC107;
  border-color: #FFC107;
  border-radius: 20px;
}

.parallax-wrapper {
  background-color: rgba(54, 155, 253, 0.7)!important;
  display: inline-block;
  padding: 1.5rem 3rem;
  border-radius: 20px;
}

.padding-coding {
  margin: 0 !important;
  padding: 1rem 2rem !important;
}

.coding-wrapper {
  width: 100%;
}

.example-coding-heading {
  font-size: 2rem;
  letter-spacing: 2px;
  padding-top: 1rem;
}

.heading-our-team {
  padding: 1rem;
  font-size: 2.5rem;
  letter-spacing: 2px;
}

.our-team {
  background-color: #3b3e79;
}

</style>
