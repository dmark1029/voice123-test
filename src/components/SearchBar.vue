<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="pa-5" width="700" outlined>
      <v-card-subtitle class="text-center mb-4">Search for Voice Actors</v-card-subtitle>
      
      <v-text-field
        v-model="searchQuery"
        label="Enter search term"
        outlined
        dense
        prepend-icon="mdi-magnify"
        @keyup.enter="emitSearch"
      />

      <v-btn
        color="primary"
        class="mt-3"
        block
        @click="emitSearch"
        :disabled="!searchQuery.trim()"
      >
        Search
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search'])

const emitSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
