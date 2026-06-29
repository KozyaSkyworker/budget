<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'

  import { getUser } from '@/api'
  import { useUserStore } from '@/stores/userStore'

  const router = useRouter()
  const userStore = useUserStore()

  const token = computed(() => localStorage.getItem('token'))

  const loading = ref(false)
  const error = ref('')

  onMounted(async () => {
    if (!token.value) {
      return
    }

    loading.value = true
    const response = await getUser()
    loading.value = false

    if ('error' in response) {
      error.value = response.error
    } else {
      userStore.setUser(response)
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    userStore.setUser(undefined)
    router.replace({ name: 'Login' })
  }
</script>

<template>
  <header v-if="userStore.user?.username" id="header" class="header">
    <div class="container">
      <span>{{ loading ? 'Loading...' : userStore.user?.username }}</span>
      <nav class="header__nav">
        <ol class="header__list">
          <li>
            <RouterLink to="/">Go to Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/charts">Go to Charts</RouterLink>
          </li>
          <li><button @click="handleLogout">Logout</button></li>
        </ol>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .header {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
  }

  .header__nav {
    display: flex;
    gap: 0.5rem;
  }

  .header__list {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
>
