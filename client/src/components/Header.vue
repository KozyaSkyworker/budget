<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router'

  import { useGetMe } from '@/entities/user/api'

  import { useUserStore } from '@/stores/userStore'

  const router = useRouter()
  const userStore = useUserStore()

  const { loading, error } = useGetMe()

  const handleLogout = () => {
    localStorage.removeItem('token')
    userStore.setUser(undefined)
    router.replace({ name: 'Login' })
  }
</script>

<template>
  <header v-if="userStore.user?.username" id="header" class="header">
    <div class="container">
      <span
        >{{ loading ? 'Loading...' : userStore.user?.username }}
        {{ error ? error : '' }}
      </span>
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
