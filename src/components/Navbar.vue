<template>
  <v-app-bar
    class="navbar"
    app
    color="rgba(0,0,0,.7)"
    dark
  >
    <div class="navbar-header">
      <div class="d-flex align-center">
        <router-link exact class="home-link" to="/">
          <v-img
            alt="JS Pro"
            class="shrink mr-2 brand-image"
            contain
            src="../assets/images/logo.svg"
            transition="scale-transition"
            width="40"
          />
          <h2 class="bold cursor-pointer brand">JS Pro</h2>
        </router-link>
      </div>
      <v-list-item>
        <v-list-item-content>
          <router-link v-if="!isAuthenticated" exact-active-class="active" class="btn-link" to="/login">
            <v-list-item-title
            class="bold font-size-medium navbar-link">Login</v-list-item-title>
          </router-link>
          <router-link v-if="!isAuthenticated" exact-active-class="active" class="btn-link" to="/register">
            <v-list-item-title
            class="bold font-size-medium navbar-link">Register</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: none;
}
.brand {
  color: #fff !important;
}

.navbar-link {
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
.home-link {
  display: inline-flex;
  text-decoration: none;
}
.router-link-active {
  color: #e6721f !important;
}
.v-list-item__title {
  color: inherit;
}
.v-application {
  a {
    color: #fff;
  }
}
</style>
