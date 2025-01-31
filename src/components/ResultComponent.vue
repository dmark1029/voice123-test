<template>
  <v-container >
    <template v-if="results.length">
      <v-row v-for="(actor, index) in results" :key="index" class="mb-4 pa-4 actor-card">
        <v-col class="d-flex justify-center align-center" cols="12" md="3">
          <v-img :src="actor.user.picture_medium || '/assets/no_picture.png'" height="100" contain
            class="rounded"></v-img>
        </v-col>

        <v-col cols="12" md="9">
          <div class="d-flex w-full align-center justify-between">
            <div class="d-flex align-center mb-2 w-50">
              <span class="font-weight-bold mr-2">Name:</span>
              <a :href="`https://voice123.com/${actor.user.username}`" target="_blank" class="name-link">
                {{ actor.user.name }}
              </a>
            </div>

            <div class="d-flex align-center mb-2">
              <span class="font-weight-bold">Sample Voice:</span>
              <p v-if="!sampleUrls || sampleUrls.length === 0">Loading audio samples...</p>
              <div v-else class="d-flex align-center justify-between">
                <audio controls class="audio-player">
                  <source :src="sampleUrls[index]" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>

          <div class="d-flex mb-2">
            <span class="font-weight-bold mr-2">Title:</span>
            <p class="text-left">{{ sampleUrls[index] }}</p>
          </div>
          <div class="d-flex justify-between mb-2">
            <span class="font-weight-bold mr-2">keywords:</span>
            <p class="highlight-text overflow-auto text-left" v-html="findMatchingParagraphs(actor, searchQuery)">
            </p>
          </div>
        </v-col>
      </v-row>


    </template>

    <template v-else>
      <v-alert type="warning" variant="outlined" class="text-center">
        No results found. Try a different search term.
      </v-alert>
    </template>
  </v-container>
  <PaginationComponent />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import PaginationComponent from '@/components/PaginationComponent.vue';

defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

const store = useStore();
const results = computed(() => store.state.results);
const sampleUrls = computed(() => store.state.sample_urls || []);

const searchQuery = computed(() => store.state.searchQuery);
const highlightText = (text, search) => {
  if (!text || !search) return text || '';

  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, `<span style="background: yellow;">$1</span>`);
};
const findMatchingParagraphs = (obj, searchQuery) => {
  if (!obj || !searchQuery) return ["No search query provided."];

  const searchLower = searchQuery.toLowerCase().trim();
  let matches = new Set();

  const findMatchesRecursive = (obj) => {
    if (!obj || typeof obj !== 'object') return;

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        findMatchesRecursive(obj[key]);
      }
      if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(searchLower)) {
        matches.add(highlightText(obj[key].trim(), searchQuery));
      }
      if (Array.isArray(obj[key])) {
        obj[key].forEach(item => findMatchesRecursive(item));
      }
    }
  };

  findMatchesRecursive(obj);
  return matches.size ? [...matches] : ["No matching text found."];
};

</script>
<style>
.audio-player {
  max-width: 100%;
}

@media (max-width: 768px) {
  .d-flex.w-full {
    flex-direction: column;
    align-items: flex-start;
  }

  .d-flex.w-50 {
    width: 100%;
  }
}

.highlight-text {
  max-height: 100px;
}

.actor-card {
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.actor-card:hover {
  transform: scale(1.02);
  cursor: pointer;
}

.name-link {
  color: #1976d2;
  font-weight: bold;
  text-decoration: none;
}

.name-link:hover {
  text-decoration: underline;
}

.audio-player {
  outline: none;
  height: 30px;
}

.highlight-text {
  color: #444;
  font-size: 14px;
}
</style>