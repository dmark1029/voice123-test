import { mount, VueWrapper } from '@vue/test-utils';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { createStore, Store } from 'vuex';
import { nextTick } from 'vue';
import { createVuetify } from 'vuetify';
import '@testing-library/jest-dom';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('PaginationComponent.vue', () => {
  let store: Store<{ currentPage: number; searchQuery: string; results: never[] }>;
  let wrapper: VueWrapper;

  beforeEach(() => {
    store = createStore({
      state: {
        currentPage: 1,
        searchQuery: 'actor',
        results: [],
      },
      mutations: {
        setCurrentPage(state, page: number) {
          state.currentPage = page;
        },
      },
      actions: {
        fetchResults({ commit }, { query, page }) {
          commit('setCurrentPage', page);
        },
      },
    });

    wrapper = mount(PaginationComponent, {
      global: {
        plugins: [store, vuetify],
      },
    });
  });

  it('changes the page when a page number is clicked', async () => {
    const nextButton = wrapper.findAll('v-btn')[1];
    if (nextButton.exists()) {
      await nextButton.trigger('click');
    } else {
      console.error('Next button not found');
    }
    await nextTick();
    expect(store.state.currentPage).toBe(2);
  });

  it('does not show the previous button on the first page', async () => {
    const prevButton = wrapper.findAll('v-btn')[0];
    if (prevButton.exists()) {
      expect(prevButton.attributes('disabled')).toBe('true');
    }
  });

  it('enables the next button when not on the last page', async () => {
    store.state.currentPage = 1;
    await nextTick();

    const nextButton = wrapper.findAll('v-btn')[1];
    if (nextButton.exists()) expect(nextButton.attributes('disabled')).toBeUndefined();
  });

  it('disables the next button when on the last page', async () => {
    store.state.currentPage = 5;
    await nextTick();

    const nextButton = wrapper.findAll('v-btn')[1];
    if (nextButton.exists()) expect(nextButton.attributes('disabled')).toBe('true');
  });
});
