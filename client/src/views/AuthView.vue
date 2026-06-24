<script setup lang="ts">
import { login, registration } from '@/api';
import { computed, ref, watch } from 'vue';

const { action } = defineProps<{
    action: 'login' | 'registration'
}>()


const username = ref('');
const password = ref('');

const error = ref('');

watch(() => action, () => {
    username.value = '';
    password.value = '';
    error.value = '';
});

const title = computed(() => action === 'login' ? 'Login' : 'Registration');
const goToText = computed(() => action === 'login' ? 'Registration' : 'Login');

const handleSubmit = (event: Event) => {
    event.preventDefault();
    const userData = { username: username.value, password: password.value };

    const request = async () => {
        const res = action === 'login' ? await login(userData) : await registration(userData);
        console.log(res)

        if ('error' in res) {
            error.value = res.error;
        }
    }

    request()
}


</script>

<template>
    <div class="auth-wrapper">
        <h1 class="auth-title">Budget: {{ title }}</h1>

        <div v-if="error" class="auth-error">
            {{ error }}
        </div>

        <form @submit="handleSubmit">
            <label for="username">
                <span class="label__text">Username</span>
                <input v-model.trim="username" type="text" id="username" name="username" autofocus required>
            </label>


            <label for="password">
                <span class="label__text">Password</span>
                <input v-model.trim="password" type="password" id="password" name="password" required>
            </label>

            <button type="submit">{{ title }}</button>
        </form>

        <RouterLink :to="{ name: goToText }">to {{ goToText }}</RouterLink>
    </div>
</template>

<style scoped>
.auth-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;

    border: 1px solid black;
    margin: 0 auto;
    background: rgb(216, 245, 191);
    min-width: 290px;
    max-width: 600px;
}

.auth-title {
    width: max-content;
    border-bottom: 1px solid black
}

.auth-error {
    color: red;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}


.label__text {
    display: block;
}
</style>