<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 100
  },
  containerHeight: {
    type: Number,
    default: 500
  },
  bufferSize: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['loadMore'])

// Container references
const containerRef = ref(null)
const scrollTop = ref(0)
const lastScrollTop = ref(0)
const isScrollingDown = ref(true)

// Calculate visible range
const visibleRange = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight)
  const visibleCount = Math.ceil(props.containerHeight / props.itemHeight)
  console.info('Visible Count: ', visibleCount)

  // Apply buffer and clamp to valid range
  const startIndex = Math.max(0, start - props.bufferSize)
  const endIndex = Math.min(props.items.length, start + visibleCount + props.bufferSize)

  return { startIndex, endIndex }
})

// Get only the items that should be rendered
const visibleItems = computed(() => {
  const { startIndex, endIndex } = visibleRange.value
  return props.items.slice(startIndex, endIndex).map(item => ({
    ...item,
    index: props.items.indexOf(item)
  }))
})

// Calculate total height of all items
const totalHeight = computed(() => props.items.length * props.itemHeight)

// Handle scroll events
function handleScroll() {
  if (!containerRef.value) return

  scrollTop.value = containerRef.value.scrollTop
  isScrollingDown.value = scrollTop.value > lastScrollTop.value
  lastScrollTop.value = scrollTop.value

  // Check if we need to load more data
  if (isScrollingDown.value && scrollTop.value + props.containerHeight + 200 >= totalHeight.value) {
    emit('loadMore')
  }
}

// Add scroll event listener
onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll)
  }
})

// Clean up event listener
onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="virtual-scroller-container"
    :style="{ height: `${containerHeight}px`, overflow: 'auto' }"
  >
    <div
      class="virtual-scroller-content"
      :style="{ height: `${totalHeight}px`, position: 'relative' }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-scroller-item"
        :style="{
          position: 'absolute',
          top: `${item.index * itemHeight}px`,
          width: '100%',
          height: `${itemHeight}px`
        }"
      >
        <slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-scroller-container {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
