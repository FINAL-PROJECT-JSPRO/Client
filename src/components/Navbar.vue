<template>
  <v-app-bar
    class="navbar"
    app
    color="rgba(0,0,0,.7)"
    dark
  >
    <div class="navbar-header">
      <div class="d-flex align-center">
        <v-list-item>
          <v-list-item-content>
            <router-link class="flex text-decoration-none" to="/">
              <v-img
                alt="JS Pro"
                class="shrink mr-2 brand-image"
                contain
                src="../assets/images/logo-white.svg"
                transition="scale-transition"
                width="80"
              />
            </router-link>
            <router-link exact-active-class="active" class="btn-link" to="/subjects">
              <v-list-item-title class="bold font-size-medium navbar-link">Subjects</v-list-item-title>
            </router-link>
            <router-link exact v-if="isAuthenticated" exact-active-class="active" class="btn-link" to="/playground">
              <v-list-item-title class="bold font-size-medium navbar-link">Playground</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
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
          <v-list-item-title v-if="isAuthenticated" class="bold cursor-pointer font-size-medium">
            <v-menu
              attach
              :open-on-click="true"
              :close-on-content-click="true"
              :nudge-width="200"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="#FFC107"
                  class="btn-profile"
                  dark
                  v-on="on"
                >
                  <span class="btn-profile-content">Profile</span>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <div class="image-profile">{{ user.username[0] }}</div>
                    </v-list-item-avatar>
                    <v-list-item-content>
                       <v-list-item class="username-profile">{{ user.username }}</v-list-item>
                    </v-list-item-content>
                   </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <router-link to="/profile" class="text-decoration-none">
                        <v-list-item-title class="navbar-dropdown-link">View profile</v-list-item-title>
                      </router-link>
                      <v-list-item-title @click="logout" class="navbar-dropdown-link">Logout</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('gToken')
      // eslint-disable-next-line no-undef
      var auth2 = gapi.auth2.getAuthInstance()
      if (auth2) {
        auth2.signOut().then(function () {
          console.log('User signed out.')
        })
      }
      this.$router.push('/')
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    user () {
      return this.$store.state.auth.user
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

.btn-profile-content {
  color: #202428;
  font-weight: bolder;
}

.brand-link {
  padding-left: 0.5rem !important;
}

.navbar-link {
  &:hover {
    color: #FFC107 !important;
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
  color: #FFC107 !important;
}
.v-list-item__title {
  color: inherit;
}
.v-application {
  a {
    color: #fff;
  }
}
.v-menu__content {
  min-width: 250px !important;
  max-width: 250px !important;
  top: 75px !important;
  left: -112px !important;
}

.navbar-dropdown-link {
  color: #202428;
  padding: 0;
  padding-bottom: 1rem;
  text-decoration: none;
  &:hover {
    color: #FFC107 !important;
  }
}
.image-profile {
  width: 40px;
  height: 40px;
  background-color: #202428;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
.flex {
  display: flex;
}

.username-profile {
  padding: 0;
  width: 100%;
  line-height: 1.4;
  display: inline-block;
}

.v-list-item__avatar {
  margin-top: 0px;
}

</style>
