<template>
  <v-content class="bg-light">
    <v-container class="full-height">
      <div class="profile-container">
        <v-row class="profile-wrapper">
          <v-col md="12" class="bg-grey">
            <div class="profile">
              <div class="profile-info">
                <div class="profile-img">
                  {{ profile.username[0]}}
                </div>
                <div class="profile-detail">
                  <h2>{{ profile.name ? profile.name : profile.username }}</h2>
                  <span><label>Email address: </label></span>
                  <p class="font-weight-bold">{{ profile.email }}</p>
                </div>
              </div>
              <div class="profile-things">
                <div class="tabs">
                  <div class="tab" v-for="(tab, i) in tabs" :key="i">
                    <router-link exact-active-class="active-tabs" class="tab-link" :to="`/profile/${tab.url}`">
                      {{ tab.name }}
                    </router-link>
                  </div>
                </div>
                <div style="padding: 0 1rem;">
                  <router-view/>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      tabs: [
        {
          name: 'History',
          url: 'history'
        },
        {
          name: 'Repositories',
          url: 'repositories'
        }
        // {
        //   name: 'Settings',
        //   url: 'settings'
        // }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuthenticated) {
        next()
      } else {
        next('/login')
      }
    })
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    profile () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding-top: 30px;
}
.active-tabs {
  color: #FFC107 !important;
  background-color: #212121;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #FFC107 !important;
}
.tabs {
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  padding-bottom: 0;
}
.tab-link {
  display: inline-block;
  text-decoration: none;
  width: 100%;
  padding: 1rem;
  color: #202428;
  font-weight: normal;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
}
.bg-grey {
  background-color: #e0e0e0 !important;
  border-radius: 10px;
}
.profile {
  padding: 1rem;
  &-info {
    display: flex;
    justify-content: flex-start;
  }
  &-img {
    width: 100px;
    height: 100px;
    color: #fff;
    font-size: 5rem;
    border-radius: 10px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #212121;
  }
  &-detail {
    padding: 0 1rem;
  }
}
.full-height {
  height: 100%;
}
</style>
