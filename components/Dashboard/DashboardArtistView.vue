<template>
  <div class="relative space-y-2 rounded bg-quaternary p-3 pt-1 drop-shadow-xl">
    <p
      class="absolute bottom-0 right-0 z-50 rounded-tl bg-secondary py-0.5 px-2"
    >
      {{ index }}
    </p>
    <div class="flex space-x-3">
      <div>
        <div
          :ref="'hide_' + name"
          class="absolute z-10 max-h-[6rem] min-h-[6rem] min-w-[6rem] max-w-[6rem] rounded object-cover transition-all duration-1000 ease-in-out"
        ></div>
        <img
          :src="image"
          :alt="name"
          loading="lazy"
          class="max-h-[6rem] min-h-[6rem] min-w-[6rem] max-w-[6rem] rounded object-cover shadow shadow-quinary"
          @load="imageLoaded"
        />
      </div>
      <div class="w-full space-y-2.5">
        <div>
          <div class="flex items-start justify-between space-x-2">
            <p class="font-semibold">{{ name }}</p>
            <div class="flex space-x-1.5">
              <NuxtLink
                :to="`/edit/artist/${id}`"
                target="_blank"
                class="rounded bg-quinary px-2 hover:bg-tertiary/30"
              >
                Edit
              </NuxtLink>
              <button
                class="rounded bg-quinary px-2 hover:bg-tertiary/30"
                @click="removeArtist"
              >
                Delete
              </button>
            </div>
          </div>
          <p class="text-sm">{{ type }}</p>
        </div>
        <div class="flex items-center space-x-1.5">
          <a
            v-for="(social, indexSocial) in socials"
            :key="indexSocial"
            :href="social"
            target="_blank"
          >
            <img
              class="h-4 w-4"
              :src="`https://www.google.com/s2/favicons?domain=${social}`"
            />
          </a>
          <p v-if="socials.length < 1" class="text-primary">No Social Media</p>
        </div>
        <div class="flex items-center space-x-2">
          <a
            v-for="(platform, indexPlatform) in platforms"
            :key="indexPlatform"
            :href="platform"
            target="_blank"
          >
            <img
              class="h-4 w-4"
              :src="`https://www.google.com/s2/favicons?domain=${platform}`"
            />
          </a>
          <p v-if="platforms.length < 1" class="text-primary">
            No Streaming Platforms
          </p>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <div v-if="styles.length > 0" class="space-x-1">
        <span
          v-for="(style, indexStyle) in styles"
          :key="indexStyle"
          class="rounded bg-tertiary/50 px-2 py-0.5 text-xs"
        >
          {{ style.name }}
        </span>
      </div>
      <p v-else class="font-medium text-primary">No Styles</p>
      <p v-if="description" class="overflow-wrap block truncate break-words">
        {{ description }}
      </p>
      <p v-else class="font-medium text-primary">No Description</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardArtistView',

  props: {
    index: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    description: {
      type: String,
      required: false,
    },
    styles: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
    platforms: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    removeArtist() {
      this.$emit('removeArtist')
    },
    imageLoaded() {
      const hide = this.$refs['hide_' + this.name]
      hide?.classList.add('opacity-0')
    },
  },
}
</script>
