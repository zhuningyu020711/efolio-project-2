<template>
    <div class="container mt-5">
      <div class="row">
        <!-- 让内容在不同设备都居中：xs 满宽、sm 变窄、md 8列、lg 6列 -->
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <h1 class="text-center mb-4">User Information Form / Credentials</h1>
  
          <!-- 提交时阻止原生跳转，调用 submitForm -->
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="formData.username"
                required
              >
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="formData.password"
                required
              >
            </div>
  
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="isAustralian"
                v-model="formData.isAustralian"
              >
              <label class="form-check-label" for="isAustralian">
                Australian Resident?
              </label>
            </div>
  
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-select" v-model="formData.gender" required>
                <option disabled value="">Select…</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label for="reason" class="form-label">Reason For Joining</label>
              <textarea
                id="reason"
                class="form-control"
                rows="3"
                v-model="formData.reason"
                required
              ></textarea>
            </div>
  
            <!-- 小屏堆叠，大屏横排（纯 Bootstrap 断点工具类） -->
            <div class="d-grid gap-2 d-md-flex">
              <button type="submit" class="btn btn-primary me-md-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
  
          <!-- 提交后显示卡片 -->
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
  
  const submitForm = () => {
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
  .list-group-item {
    padding: 10px;
  }
  </style>
  