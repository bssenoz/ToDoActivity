import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    accessToken: '',
    user: {
      name: '',
      surname: '',
      email: '',
      birthDate: '',
    },
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    clearAccessToken(state) {
      state.accessToken = '';
      state.user = {
        name: '',
        surname: '',
        email: '',
        birthDate: '',
      };
    },
    setUser(state, userData) {
      state.user = userData;
    },
  },
  actions: {
    async getUser({ commit }) {
      if (process.env.NODE_ENV === 'development') {
        console.log("getUser");
      }
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('/api/Users/GetUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const birthDate = new Date(response.data.birthDate);
          const formattedBirthDate = birthDate.toLocaleDateString();

          const userData = {
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            birthDate: formattedBirthDate,
          };

          commit('setUser', userData);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== '';
    },
    user: (state) => state.user,
  },
});
