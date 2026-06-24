<script setup lang="ts">
import { login } from '@/api';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(username.value, password.value);
    login({ username: username.value, password: password.value });
}
</script>

<template>
    <div class="auth-wrapper">

        <h1 class="auth-title">Budget</h1>
        <form @submit="handleSubmit">
            <label for="username">
                <span class="label__text">Username</span>
                <input v-model.trim="username" type="text" id="username" name="username" autofocus required>
            </label>


            <label for="password">
                <span class="label__text">Password</span>
                <input v-model.trim="password" type="password" id="password" name="password" required>
            </label>

            <button type="submit" class="login-btn">Login</button>
        </form>

        registration
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
    background: rgb(163, 211, 120);
    min-width: 290px;
    max-width: 600px;
}

.auth-title {
    width: max-content;
    border-bottom: 1px solid black
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