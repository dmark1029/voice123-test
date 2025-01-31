<template>
  <v-row class="header-row" align="center">
    <v-col cols="auto" class="w-25">
      <v-img src="/assets/voice_logo.png" height="50" contain class="rounded"></v-img>
    </v-col>
  </v-row>

  <v-container>
    <SearchBar @search="handleSearch" />
    <Results :results="results" :searchQuery="searchQuery" />
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import Results from '@/components/ResultComponent.vue';

const store = useStore();

const results = computed(() => store.state.results);
const searchQuery = computed(() => store.state.searchQuery);

const handleSearch = (query) => {
  store.dispatch('fetchResults', { query, page: 1 });
};

</script>
<style scoped>
.header-row {
  background-color: #eeeeee;
  padding: 10px 20px 0px;
}

.header-image {
  max-height: 40px;
  margin-right: 10px;
}

.header-title {
  display: inline-block;
}
</style>