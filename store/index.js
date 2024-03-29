export const state = () => ({
  user: null,
  userData: null,
})

export const getters = {
  GET_USER: (state) => {
    return state.user
  },

  GET_USER_DATA: (state) => {
    return state.userData
  },

  isLoggedIn(state) {
    let userLoggedIn = false
    if (state.user) {
      userLoggedIn = true
    }
    return userLoggedIn
  },

  isAdmin(state) {
    let isAdmin = false
    if (state.user) {
      if (state.userData.role === 'ADMIN') {
        isAdmin = true
      }
    }
    return isAdmin
  },
}

export const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      state.commit('SET_USER', authUser)
    } else {
      const { uid, email, refreshToken, displayName, photoURL } = authUser
      state.commit('SET_USER', {
        uid,
        email,
        refreshToken,
        displayName,
        photoURL,
      })
      const stepOne = this.$fire.functions.httpsCallable('readUser')
      const stepTwo = await stepOne({ id: authUser.uid })
      const stepThree = stepTwo.data

      state.commit('SET_USER_DATA', stepThree.data)
    }
  },

  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      })
    }
  },
}

export const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload
  },

  SET_USER_DATA: (state, payload) => {
    state.userData = payload
  },
}
