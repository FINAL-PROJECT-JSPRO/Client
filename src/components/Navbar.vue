<template>
  <v-app-bar
    class="navbar"
    app
    :color="scrolled ?  '#fff' : 'transparent' "
    dark
  >
    <div class="navbar-header">
      <div class="d-flex align-center">
        <v-img v-if="!scrolled"
          alt="JS Pro"
          class="shrink mr-2 brand-image"
          contain
          src="../assets/images/logo.svg"
          transition="scale-transition"
          width="40"
        />
         <v-img v-if="scrolled"
          alt="JS Pro"
          class="shrink mr-2 brand-image"
          contain
          src="../assets/images/light-logo.svg"
          transition="scale-transition"
          width="40"
        />
        <h2 class="bold cursor-pointer" :class="scrolled ? 'brand' : ''">JS Pro</h2>
      </div>
      <v-list-item>
        <v-list-item-content>
          <router-link class="btn-link" to="/login">
            <v-list-item-title
            class="color-white bold font-size-medium"
            :class="scrolled ? 'brand-link' : '' "
            >Login</v-list-item-title>
          </router-link>
          <router-link class="btn-link" to="/register">
            <v-list-item-title
            class="color-white bold font-size-medium"
            :class="scrolled ? 'brand-link' : '' ">Register</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      scrolled: false
    }
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: none;
}
.brand {
  color: #1e2022 !important;
}

.brand-link {
  color: #1e2022 !important;
  &:hover {
    background-color: #FFC107 !important;
  }
}

.navbar-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.v-list-item {
  flex: none;
  &__title {
    color: #202428;
    flex: none;
    padding: 1rem 1.5rem;
    &:hover {
      cursor: pointer;
      background-color: #FFC107;
      border-radius: 1rem;
    }
  }
}
.font-size-medium {
  font-size: 1.2rem;
}
.brand-image {
  &:hover {
    cursor: pointer;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.btn-link {
  flex: none;
  text-decoration: none;
}
</style>
