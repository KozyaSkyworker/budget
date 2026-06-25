<script setup lang="ts">
import { getUser } from '@/api';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();

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
        error.value = response.error;
    } else {
        userStore.setUser(response)
    }

})


</script>

<template>
    <header class="header" v-if="userStore.user?.username">
        <div class="container">
            <span>{{ loading ? 'Loading...' : userStore.user?.username }}</span>
            <nav class="header__nav">
                <RouterLink to="/">Go to Home</RouterLink>
                <RouterLink to="/logout">Logout</RouterLink>
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
</style>>