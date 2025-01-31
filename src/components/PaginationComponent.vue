<template>
  <div class="pagination">
    <v-btn :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
      Previous
    </v-btn>

    <v-btn v-for="page in visiblePageNumbers" :key="page"
      :class="{ 'active-page': page === currentPage, 'inactive-page': page !== currentPage }" @click="changePage(page)">
      {{ page }}
    </v-btn>

    <v-btn :disabled="!isResponse" @click="changePage(currentPage + 1)">
      Next
    </v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const isResponse = ref(true);

const store = useStore();
const currentPage = computed(() => store.state.currentPage);
const fetchResult = async (page) => {
  const query = store.state.searchQuery;
  store.dispatch('fetchResults', { query, page: page });
  const results = store.state.results;
  if (!results || results?.length === 0) {
    isResponse.value = false;
  }
};

const visiblePageNumbers = computed(() => {
  const startPage = Math.floor((currentPage.value - 1) / 9) * 9 + 1;
  const endPage = (startPage / 10 + 1) * 10 - 1;
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});
const changePage = (page) => {
  currentPage.value = page;
  fetchResult(page);
};

</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.v-btn.active-page {
  background-color: black;
  color: white;
}

.v-btn.inactive-page {
  background-color: #42b983;
  color: white;
}

.v-btn[disabled] {
  background-color: #e0e0e0;
}
</style>
