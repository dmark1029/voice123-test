import { mount } from '@vue/test-utils';
import ResultComponent from '@/components/ResultComponent.vue';
import { createStore } from 'vuex';
import '@testing-library/jest-dom';

describe('ResultComponent.vue', () => {
  let store: any;
  beforeEach(() => {
    store = createStore({
      state: {
        results: [],
        searchQuery: '',
        sample_urls: [],
      },
      mutations: {
        setResults(state, results) {
          state.results = results;
        },
        setSearchQuery(state, query) {
          state.searchQuery = query;
        },
        setSampleUrls(state, urls) {
          state.sample_urls = urls;
        },
      },
    });
  });

  it('displays results when provided', async () => {
    const results = [
      { user: { name: 'Actor 1', picture_medium: 'actor1.jpg' } },
      { user: { name: 'Actor 2', picture_medium: 'actor2.jpg' } },
    ];
    store.commit('setResults', results);
    const wrapper = mount(ResultComponent, {
      global: {
        plugins: [store],
      },
    });

    const actorCards = wrapper.findAll('.actor-card');
    expect(actorCards).toHaveLength(2);
  });

  it('shows "No results found" when no results are provided', async () => {
    const wrapper = mount(ResultComponent, {
      global: {
        plugins: [store],
      },
    });

    const alert = wrapper.find('v-alert');
    expect(alert.text()).toContain('No results found');
  });
});
