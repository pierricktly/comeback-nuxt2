<template>
  <home-section title="Comeback Reported">
    <div
      class="relative grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
    >
      <NewsCard
        v-for="news in newsList"
        :key="news.id"
        :message="news.message"
        :date="news.date"
        :artist="news.artist"
      />
    </div>
  </home-section>
</template>

<script>
import HomeSection from './HomeSection.vue'
export default {
  name: 'ComebackSection',

  components: {
    HomeSection,
  },

  props: {
    newsList: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
