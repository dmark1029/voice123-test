import { mount, VueWrapper } from '@vue/test-utils';
import SearchBar from '../src/components/SearchBar.vue';
import { createVuetify } from 'vuetify';
import { createStore } from 'vuex';
import '@testing-library/jest-dom';
import 'vuetify/styles';

describe('SearchBar.vue', () => {
  let store;
  let vuetify;
  let wrapper: VueWrapper<any, any>;
  beforeEach(() => {
    vuetify = createVuetify();
    store = createStore({
      state: {
        searchQuery: '',
      },
      mutations: {
        setSearchQuery(state, query) {
          state.searchQuery = query;
        },
      },
    });

    wrapper = mount(SearchBar, {
      global: {
        plugins: [store, vuetify],
      },
    });
  });

  it('emits search event with query on button click', async () => {
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    if (!button.exists()) {
      throw new Error('Button not found');
    }
    await input.setValue('voice actor');
    await button.trigger('click');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')![0]).toEqual(['voice actor']);
  });

  it('does not emit search event when query is empty', async () => {
    const button = wrapper.find('button');
    if (!button.exists()) {
      throw new Error('Button not found');
    }
    await button.trigger('click');
    expect(wrapper.emitted('search')).toBeFalsy();
  });
});
