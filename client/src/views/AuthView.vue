<script setup lang="ts">
import { login, registration } from '@/api';
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const { action } = defineProps<{
    action: 'login' | 'registration'
}>()

const userStore = useUserStore();
const router = useRouter()

const input = useTemplateRef('input')

const username = ref('');
const password = ref('');

const isLoading = ref(false)
const error = ref('');

watch(() => action, () => {
    input.value?.focus()
    username.value = '';
    password.value = '';
    error.value = '';
});

const title = computed(() => action === 'login' ? 'Login' : 'Registration');
const goToText = computed(() => action === 'login' ? "Don't have an account?" : "Have an account?");
const goToLinkText = computed(() => action === 'login' ? 'Registration' : 'Login');

const handleSubmit = (event: Event) => {
    event.preventDefault();
    const userData = { username: username.value, password: password.value };

    const request = async () => {
        isLoading.value = true
        const res = action === 'login' ? await login(userData) : await registration(userData);
        isLoading.value = false
        if ('error' in res) {
            error.value = res.error;
        } else {
            userStore.setUser({
                username: res.username,
                role: res.role,
            });
            localStorage.setItem('token', res.token)
            router.replace({ name: 'Home' });
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
                <input v-model.trim="username" type="text" id="username" name="username" autofocus required
                    :disabled="isLoading" ref="input">
            </label>


            <label for="password">
                <span class="label__text">Password</span>
                <input v-model.trim="password" type="password" id="password" name="password" required
                    :disabled="isLoading">
            </label>

            <button type="submit" :disabled="isLoading">{{ title }}</button>
        </form>

        <p>{{ goToText }} <RouterLink :to="{ name: goToLinkText }"> Go to {{ goToLinkText }}</RouterLink>
        </p>
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