<template>
  <div class="login-container" dir="rtl">
    <div class="login-box">
      <h2>وارد شوید</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">ایمیل</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="ایمیل خود را وارد کنید..."
            required
          />
        </div>
        <div class="form-group">
          <label for="password">پسورد</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="رمز عبور خود را وارد کنید..."
            required
          />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? "در حال ورود..." : "ورود" }}
        </button>
      </form>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { navigateTo } from "nuxt/app";

const { login } = useAuth();
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

async function handleLogin() {
  error.value = "";
  isLoading.value = true;

  try {
    await login(email.value, password.value);
    await navigateTo("/admin");
  } catch (err: any) {
    error.value = handleLoginError(err);
    if (err.response) {
      console.error('Server response:', err.response.data);
    }
  } finally {
    isLoading.value = false;
  }
}

function handleLoginError(err: any): string {
  if (err.message.includes("CSRF")) {
    return "خطای امنیتی، لطفا صفحه را رفرش کنید";
  }
  switch (err.response?.status) {
    case 401:
      return "ایمیل یا رمز عبور نادرست است";
    case 422:
      return "لطفا اطلاعات ورود را به درستی وارد کنید";
    case 405:
      return "متد درخواست نامعتبر است";
    default:
      return err.response?.data?.message || "خطایی در ورود رخ داده است";
  }
}
</script>
  
  <style scoped>
/* Keep your existing styles unchanged */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff8565, #702816);
}

.login-box {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: right;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  text-align: right;
}

input:focus {
  outline: none;
  border-color: #ff8565;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 1rem;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #ff8565;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #ff6e49;
}

.login-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login-box {
    padding: 1.5rem;
  }
}
</style>