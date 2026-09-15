<template>
  <nav class="bottom-nav">
    <button
      class="bottom-nav-item"
      :class="{ active: isActive('/home') }"
      @click="goTo('/home')"
    >
      <span class="nav-icon">▦</span>
      <span class="nav-label">Dashboard</span>
    </button>

    <button
      class="bottom-nav-item"
      :class="{ active: isActive('/tasks') }"
      @click="goTo('/tasks')"
    >
      <span class="nav-icon">☷</span>
      <span class="nav-label">My Tasks</span>
    </button>

    <button
      class="bottom-nav-item"
      :class="{ active: isActive('/add-task') }"
      @click="goTo('/add-task')"
    >
      <span class="nav-icon">＋</span>
      <span class="nav-label">Add Task</span>
    </button>

    <button
      class="bottom-nav-item"
      :class="{ active: isActive('/subjects') }"
      @click="goTo('/subjects')"
    >
      <span class="nav-icon">▤</span>
      <span class="nav-label">Subjects</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goTo = (path: string) => {
  if (route.path !== path) {
    router.push(path);
  }
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);

  width: min(620px, calc(100% - 28px));
  min-height: 72px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  padding: 8px;

  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dfe6f2;
  border-radius: 22px;

  box-shadow:
    0 12px 35px rgba(28, 43, 73, 0.14),
    0 2px 8px rgba(28, 43, 73, 0.06);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  z-index: 9999;
}

.bottom-nav-item {
  position: relative;

  border: none;
  outline: none;

  min-width: 0;
  min-height: 55px;

  padding: 7px 5px;

  border-radius: 15px;
  background: transparent;

  color: #78849a;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  cursor: pointer;

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.bottom-nav-item:hover {
  background: #f2f6ff;
  color: #2f63ed;
}

.bottom-nav-item:active {
  transform: scale(0.96);
}

.bottom-nav-item.active {
  background: #eaf1ff;
  color: #2f63ed;
}

.nav-icon {
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  line-height: 1;

  font-weight: 700;
}

.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  max-width: 100%;

  font-size: 10px;
  line-height: 1.2;

  font-weight: 800;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {
  .bottom-nav {
    bottom: 9px;

    width: calc(100% - 18px);
    min-height: 67px;

    padding: 6px;

    border-radius: 19px;
  }

  .bottom-nav-item {
    min-height: 53px;
    padding: 6px 2px;
    border-radius: 13px;
  }

  .nav-icon {
    font-size: 18px;
  }

  .nav-label {
    font-size: 9px;
  }
}

/* =========================
   VERY SMALL PHONE
========================= */

@media (max-width: 360px) {
  .bottom-nav {
    width: calc(100% - 12px);
  }

  .nav-label {
    font-size: 8px;
  }

  .nav-icon {
    font-size: 17px;
  }
}
</style>