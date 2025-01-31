import { createStore } from 'vuex';
import axios from 'axios';

interface State {
  results: any[];
  users: string[];
  sample_urls: any[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}

export default createStore({
  state: {
    results: [],
    users: [],
    sample_urls: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
  },
  getters: {
    results: (state) => state.results,
    searchQuery: (state) => state.searchQuery,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
    sampleUrls: (state) => state.sample_urls,
    displayUsers: (state) => state.users,
  },
  mutations: {
    setResults(state, results) {
      state.results = results;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSampleUrls(state: State, urls: any) {
      state.sample_urls.push(urls);
    },
    setUsers(state: State, user: string) {
      state.users.push(user);
    }
  },
  actions: {
    async fetchResults({ commit, state }, { query, page }) {
      state.users = [];
      commit('setSearchQuery', query);
      commit('setCurrentPage', page);
      const url = `https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${query}&page=${page}`;
      try {
        const response = await axios.get(url);
        const results = await Promise.all(
          response.data.providers.map(async (provider: any) => {
            commit('setUsers', provider.user.username);
            return {
              ...provider,
            };
          })
        );
        commit('setResults', results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      state.sample_urls = [];
      try {
        state.users.map(async (user: string) => {
          const gettingSampleUrls = `https://voice123.com/api/providers/search/${user}?service=voice_over`;
          const response = await axios.get(gettingSampleUrls);
          const temp = response.data[0];
          const temp1 = temp?.samples || {};
          commit('setSampleUrls', temp1[0]?.file || '');
        });
      } catch (error) {
        console.error('Error fetching sample URLs:', error);
      }
    }
  },
  modules: {},
});
