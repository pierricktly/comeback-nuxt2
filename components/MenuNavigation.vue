<template>
  <div>
    <div class="relative bg-opacity-10">
      <div class="px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-tertiary hover:bg-quinary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tertiary"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-label="Open main menu"
              @click="navMenu = !navMenu"
            >
              <icons-burger-menu class="h-8 w-8" />
            </button>
          </div>
          <!-- PC Navigation -->
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <NuxtLink
              :to="`/`"
              class="relative flex flex-shrink-0 items-end lg:items-center lg:space-x-1"
            >
              <img
                class="block h-8 w-auto lg:hidden"
                src="../assets/image/mini-logo.png"
                alt="Comeback"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="../assets/image/logo.png"
                alt="Comeback"
              />
            </NuxtLink>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4" @click="userMenu = false">
                <NuxtLink
                  :to="`/`"
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-quinary"
                  :class="{ 'bg-quinary': $route.name === 'index' }"
                >
                  Home
                </NuxtLink>
                <NuxtLink
                  :to="`/calendar`"
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-quinary"
                  :class="{ 'bg-quinary': $route.name === 'calendar' }"
                >
                  Calendar
                </NuxtLink>
                <NuxtLink
                  :to="`/artist`"
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-quinary"
                  :class="{ 'bg-quinary': $route.name === 'artist' }"
                >
                  Artists
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- PC User Menu -->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div
              v-if="userLogged && artistList.length > 0"
              class="hidden lg:flex"
            >
              <button
                class="animate__animated animate__fadeIn Card flex rounded-md bg-primary px-3 py-2 focus:outline-none"
                @click="newsModal = !newsModal"
              >
                <p>New Comeback</p>
              </button>
            </div>
            <!-- Profile dropdown -->
            <div v-if="userLogged" class="relative ml-3">
              <button
                id="user-menu-button"
                type="button"
                class="flex rounded-full bg-quinary bg-opacity-10 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="Open user menu"
                @click="userMenu = !userMenu"
              >
                <img
                  class="h-8 w-8 rounded-full object-cover"
                  :src="userAvatar"
                  alt="User avatar picture"
                />
              </button>
              <div
                v-if="userMenu"
                v-click-outside="closeUserMenu"
                class="origin-top-center absolute right-0 mt-2 w-48 rounded-md bg-quinary shadow-lg focus:outline-none"
                @click="closeUserMenu"
              >
                <NuxtLink
                  v-if="userLogged && userRole !== 'NONE'"
                  :to="`/add/artist`"
                  class="block px-4 py-2 text-sm hover:bg-quaternary"
                >
                  Add New Artist
                </NuxtLink>
                <NuxtLink
                  v-if="userLogged && userRole !== 'NONE'"
                  :to="`/dashboard/newArtist`"
                  class="hidden w-full px-4 py-2 text-left text-sm hover:bg-quaternary lg:block"
                >
                  Dashboard
                </NuxtLink>
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm hover:bg-quaternary lg:hidden"
                  @click="newsModal = true"
                >
                  New Comeback
                </button>
                <!-- <NuxtLink
                  v-if="userLogged"
                  :to="`/edit/profile/userPicture`"
                  class="block w-full px-4 py-2 text-left text-sm hover:bg-red-500"
                >
                  Change Profile Picture
                </NuxtLink> -->
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-left text-sm hover:bg-quaternary"
                  @click="logout()"
                >
                  Sign out
                </button>
              </div>
            </div>
            <div v-else>
              <nuxt-link to="/authentification">Login</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        v-if="navMenu"
        id="mobile-menu"
        ref="mobileMenu"
        class="animate__animated animate__fadeInUp origin-top-center absolute inset-0 w-full min-h-screen bg-secondary sm:hidden"
      >
        <div class="space-y-3 p-5" @click="closeNavMenu()">
          <NuxtLink
            :to="`/`"
            class="block rounded-full px-3 py-2 text-base font-medium"
            :class="$route.name !== 'index' ? 'hover:bg-quinary' : 'bg-quinary'"
          >
            Home
          </NuxtLink>
          <NuxtLink
            :to="`/calendar`"
            class="block rounded-full px-3 py-2 text-base font-medium"
            :class="
              $route.name !== 'calendar' ? 'hover:bg-quinary' : 'bg-quinary'
            "
          >
            Calendar
          </NuxtLink>
          <NuxtLink
            :to="`/artist`"
            class="block rounded-full px-3 py-2 text-base font-medium"
            :class="
              $route.name !== 'artist' ? 'hover:bg-quinary' : 'bg-quinary'
            "
          >
            Artists
          </NuxtLink>
        </div>
        <button
          class="py-5 absolute bottom-0 inset-x-0"
          @click="closeNavMenu()"
        >
          <icons-arrow-down class="w-6 h-6 mx-auto" />
        </button>
      </div>
    </div>
    <Modal
      v-model="newsModal"
      title="Add a News"
      wrapper-class="animate__animated modal-wrapper"
      :modal-style="{
        background: '#1F1D1D',
        'border-radius': '0.25rem',
        color: 'white',
      }"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`"
    >
      <NewsCreation :artist-list="artistList" @close="closeNewsModal" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconsArrowDown from './Icons/IconsArrowDown.vue'

export default {
  name: 'MenuNavigation',
  components: { IconsArrowDown },

  data() {
    return {
      navMenu: false,
      userMenu: false,
      newsModal: false,

      userLogged: false,
      userRole: 'NONE',
      userAvatar: null,
      artistList: [],
    }
  },

  watch: {
    '$store.getters.isLoggedIn': function (newVal) {
      this.userLogged = newVal
    },
  },

  created() {
    this.userLogged = this.isLoggedIn()
    if (this.userLogged) {
      this.userRole = this.GET_USER_DATA().role
      this.userAvatar = this.GET_USER_DATA().picture
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    ...mapGetters(['GET_USER', 'GET_USER_DATA', 'isLoggedIn']),

    async fetchData() {
      console.log('fetching data')
      this.artistList = await this.$fire.firestore
        .collection('artists')
        .where('verified', '==', true)
        .get()
        .then((snapshot) => {
          const artists = []
          snapshot.forEach((doc) => {
            artists.push(doc.data())
          })
          return artists
        })
        .catch(() => {
          return { success: false, artists: [] }
        })
      this.artistList.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },

    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$router.push('/')
          this.userRole = 'NONE'
          this.$toasted.error('You are log out!', {
            duration: 3000,
            position: 'top-center',
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    openUserMenu() {
      this.userMenu = true
    },

    closeUserMenu() {
      this.userMenu = false
    },

    closeNewsModal() {
      this.newsModal = false
    },

    openNavMenu() {
      // remove animate__animated animate__fadeOutDown
      this.$refs.mobileMenu.classList.remove('animate__animated')
      this.$refs.mobileMenu.classList.remove('animate__fadeOutDown')
      // add animate__animated animate__fadeInUp
      this.$refs.mobileMenu.classList.add('animate__animated')
      this.$refs.mobileMenu.classList.add('animate__fadeInUp')
      setTimeout(() => {
        this.navMenu = true
      }, 1000)
    },

    closeNavMenu() {
      // remove animate__animated animate__fadeInUp
      this.$refs.mobileMenu.classList.remove('animate__animated')
      this.$refs.mobileMenu.classList.remove('animate__fadeInUp')
      // add animate__animated animate__fadeOutDown
      this.$refs.mobileMenu.classList.add('animate__animated')
      this.$refs.mobileMenu.classList.add('animate__fadeOutDown')
      setTimeout(() => {
        this.navMenu = false
      }, 1000)
    },
  },
}
</script>

<style>
.modal-custom {
  background: #1f1d1d;
  border-radius: 0.25rem;
  color: white;
}
</style>
