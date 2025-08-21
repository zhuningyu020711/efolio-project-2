<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <h1 class="text-center mb-4">User Information Form / Credentials</h1>
  
          <form @submit.prevent="submitForm" novalidate>
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
                placeholder="Enter at least 3 characters"
                autocomplete="username"
              />
              <div v-if="errors.username" class="invalid-feedback">
                {{ errors.username }}
              </div>
            </div>
  
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                class="form-control"
                :class="{ 'is-invalid': !!errors.password }"
                type="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                placeholder="Min 8 chars incl. upper/lower/number/special"
                autocomplete="new-password"
              />
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
  
            <!-- Australian Resident -->
            <div class="form-check mb-3">
              <input
                id="isAustralian"
                class="form-check-input"
                type="checkbox"
                v-model="formData.isAustralian"
              />
              <label class="form-check-label" for="isAustralian">
                Australian Resident?
              </label>
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
  
            <!-- Reason -->
            <div class="mb-4">
              <label for="reason" class="form-label">Reason For Joining</label>
              <textarea
                id="reason"
                class="form-control"
                :class="{ 'is-invalid': !!errors.reason }"
                rows="3"
                v-model="formData.reason"
                placeholder="Tell us a bit more (≥ 10 characters)"
              ></textarea>
              <div v-if="errors.reason" class="invalid-feedback">
                {{ errors.reason }}
              </div>
            </div>
  
            <div class="d-grid gap-2 d-md-flex">
              <button type="submit" class="btn btn-primary me-md-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
  
          <!-- 提交记录（卡片版） -->
          <div class="row mt-5" v-if="submittedCards.length">
            <div class="d-flex flex-wrap justify-content-start">
              <div
                v-for="(card, index) in submittedCards"
                :key="index"
                class="card m-2"
                style="width: 18rem;"
              >
                <div class="card-header">User Information</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Username: {{ card.username }}</li>
                  <li class="list-group-item">Password: {{ card.password }}</li>
                  <li class="list-group-item">
                    Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                  </li>
                  <li class="list-group-item">Gender: {{ card.gender }}</li>
                  <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  })
  
  const submittedCards = ref([])
  
  const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  })
  
  const validateName = (blur) => {
    const v = formData.value.username?.trim() || ''
    if (v.length < 3) {
      if (blur) errors.value.username = 'Name must be at least 3 characters'
    } else {
      errors.value.username = null
    }
  }
  
  const validatePassword = (blur) => {
    const p = formData.value.password || ''
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(p)
    const hasLowercase = /[a-z]/.test(p)
    const hasNumber = /\d/.test(p)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(p)
  
    if (p.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      if (blur) {
        errors.value.password =
          'Password ≥8 chars & include upper, lower, number, special char'
      }
    } else {
      errors.value.password = null
    }
  }
  
  const validateOthers = (onSubmit = false) => {
    if (!formData.value.gender) {
      if (onSubmit) errors.value.gender = 'Please select a gender'
    } else errors.value.gender = null
  
    const r = formData.value.reason?.trim() || ''
    if (r.length < 10) {
      if (onSubmit) errors.value.reason = 'Reason must be at least 10 characters'
    } else errors.value.reason = null
  
    errors.value.resident = null
  }
  
  const submitForm = () => {
    validateName(true)
    validatePassword(true)
    validateOthers(true)
  
    const hasError = Object.values(errors.value).some(Boolean)
    if (hasError) return
  
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
  
  const clearForm = () => {
    formData.value = {
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: ''
    }
    errors.value = {
      username: null,
      password: null,
      resident: null,
      gender: null,
      reason: null
    }
  }
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .card-header {
    background-color: #275FDA;
    color: #fff;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }
  .list-group-item { padding: 10px; }


  </style>
  