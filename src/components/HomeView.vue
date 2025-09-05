<!-- src/views/HomeView.vue -->
<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <h1 class="text-center mb-4">Library Registration</h1>
  
          <form @submit.prevent="submitForm">
            <!-- Username -->
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                class="form-control"
                :class="{ 'is-invalid': !!errors.username }"
                type="text"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                placeholder="At least 3 characters"
                autocomplete="username"
              />
              <div v-if="errors.username" class="invalid-feedback">
                {{ errors.username }}
              </div>
            </div>
  
            <!-- Password & Confirm -->
            <div class="row">
              <div class="col-md-6 col-sm-6 mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': !!errors.password }"
                  type="password"
                  v-model="formData.password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  placeholder="≥8 & upper/lower/number/special"
                  autocomplete="new-password"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
  
              <div class="col-md-6 col-sm-6 mb-3">
                <label for="confirm-password" class="form-label">Confirm password</label>
                <input
                  id="confirm-password"
                  class="form-control"
                  :class="{ 'is-invalid': !!errors.confirmPassword }"
                  type="password"
                  v-model="formData.confirmPassword"
                  @blur="() => validateConfirmPassword(true)"
                  placeholder="Re-enter password"
                  autocomplete="new-password"
                />
                <div v-if="errors.confirmPassword" class="invalid-feedback">
                  {{ errors.confirmPassword }}
                </div>
              </div>
            </div>
  
            <!-- Resident -->
            <div class="form-check mb-3">
              <input id="isAustralian" class="form-check-input" type="checkbox" v-model="formData.isAustralian" />
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
            </div>
  
            <!-- Gender -->
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                :class="{ 'is-invalid': !!errors.gender }"
                v-model="formData.gender"
              >
                <option disabled value="">Select…</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="invalid-feedback">
                {{ errors.gender }}
              </div>
            </div>
  
            <!-- Reason + “friend” 绿色提示 -->
            <div class="mb-1">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                id="reason"
                class="form-control"
                :class="{ 'is-invalid': !!errors.reason }"
                rows="3"
                v-model="formData.reason"
                placeholder="Tell us a bit more (≥ 10 characters)"
                @input="() => validateReason(false)"
                @blur="() => validateReason(true)"
              ></textarea>
              <div v-if="errors.reason" class="invalid-feedback">
                {{ errors.reason }}
              </div>
            </div>
            <div v-if="containsFriend" class="form-text text-success mb-3">Great to have a friend</div>
  
            <!-- Buttons -->
            <div class="d-grid gap-2 d-md-flex">
              <button type="submit" class="btn btn-primary me-md-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  })
  
  const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    gender: null,
    reason: null
  })
  
  const containsFriend = computed(() => /friend/i.test(formData.value.reason))
  
  const validateName = (blur) => {
    const v = formData.value.username?.trim() || ''
    if (v.length < 3) { if (blur) errors.value.username = 'Name must be at least 3 characters' }
    else errors.value.username = null
  }
  
  const validatePassword = (blur) => {
    const p = formData.value.password || ''
    const minLength = 8
    const ok = p.length >= minLength
      && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[!@#$%^&*(),.?":{}|<>]/.test(p)
    if (!ok) { if (blur) errors.value.password = 'Password ≥8 & include upper/lower/number/special' }
    else errors.value.password = null
  }
  
  const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
      if (blur) errors.value.confirmPassword = 'Passwords do not match.'
    } else errors.value.confirmPassword = null
  }
  
  const validateReason = (blur) => {
    const r = formData.value.reason?.trim() || ''
    if (r.length < 10) { if (blur) errors.value.reason = 'Reason must be at least 10 characters' }
    else errors.value.reason = null
  }
  
  const submitForm = () => {
    validateName(true); validatePassword(true); validateConfirmPassword(true); validateReason(true)
    if (Object.values(errors.value).some(Boolean)) return
    alert('Submitted! (take screenshot if needed)')
    clearForm()
  }
  
  const clearForm = () => {
    formData.value = { username: '', password: '', confirmPassword: '', isAustralian: false, reason: '', gender: '' }
    errors.value = { username: null, password: null, confirmPassword: null, gender: null, reason: null }
  }
  </script>
  