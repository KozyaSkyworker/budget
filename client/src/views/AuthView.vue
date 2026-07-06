<script setup lang="ts">
  import { computed, reactive, ref, useTemplateRef, watch } from 'vue'
  import { useRouter } from 'vue-router'

  import { login, registration } from '@/api'

  import { useUserStore } from '@/entities/user/store'

  const { action } = defineProps<{
    action: 'login' | 'registration'
  }>()

  const userStore = useUserStore()
  const router = useRouter()

  const input = useTemplateRef('input')

  const formData = reactive({
    username: '',
    password: ''
  })

  const isLoading = ref(false)
  const error = ref('')

  watch(
    () => action,
    () => {
      input.value?.focus()
      formData.username = ''
      formData.password = ''
      error.value = ''
    }
  )

  const title = computed(() => (action === 'login' ? 'Login' : 'Registration'))
  const goToText = computed(() =>
    action === 'login' ? "Don't have an account?" : 'Have an account?'
  )
  const goToLinkText = computed(() =>
    action === 'login' ? 'Registration' : 'Login'
  )

  const handleSubmit = (event: Event) => {
    event.preventDefault()

    const request = async () => {
      isLoading.value = true
      const res =
        action === 'login'
          ? await login(formData)
          : await registration(formData)
      isLoading.value = false
      if ('error' in res) {
        error.value = res.error
      } else {
        userStore.setUser({
          username: res.username,
          role: res.role
        })
        localStorage.setItem('token', res.token)
        router.replace({ name: 'Home' })
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
        <input
          id="username"
          ref="input"
          v-model.trim="formData.username"
          type="text"
          name="username"
          autofocus
          required
          :disabled="isLoading"
        />
      </label>

      <label for="password">
        <span class="label__text">Password</span>
        <input
          id="password"
          v-model.trim="formData.password"
          type="password"
          name="password"
          required
          :disabled="isLoading"
        />
      </label>

      <button type="submit" :disabled="isLoading">{{ title }}</button>
    </form>

    <p>
      {{ goToText }}
      <RouterLink :to="{ name: goToLinkText }">
        Go to {{ goToLinkText }}</RouterLink
      >
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
    border-bottom: 1px solid black;
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
