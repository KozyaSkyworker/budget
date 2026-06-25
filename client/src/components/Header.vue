<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>

<template>
    <header class="header" v-if="userStore.user">
        <div class="container">
            <span>{{ userStore.user.username }}</span>
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