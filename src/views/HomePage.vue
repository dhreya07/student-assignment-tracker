<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="dashboard">

        <!-- ================= MOBILE HEADER ================= -->
        <header class="mobile-brand-header">
          <div class="mobile-brand">
            <div class="mobile-brand-icon">✓</div>
            <strong>Assignment Tracker</strong>
          </div>
        </header>

        <!-- ================= SIDEBAR ================= -->
        <aside class="sidebar">
          <div>
            <div class="brand">
              <div class="brand-icon">✓</div>
              <div>
                <h2>Assignment</h2>
                <h2 class="blue">Tracker</h2>
              </div>
            </div>

            <nav class="nav-menu">
              <button class="nav-item active" @click="goTo('/home')">
                <span class="nav-icon">▦</span>
                <span>Dashboard</span>
              </button>

              <button class="nav-item" @click="goTo('/tasks')">
                <span class="nav-icon">☷</span>
                <span>My Tasks</span>
              </button>

              <button class="nav-item" @click="goTo('/add-task')">
                <span class="nav-icon">＋</span>
                <span>Add Task</span>
              </button>

              <button class="nav-item" @click="goTo('/subjects')">
                <span class="nav-icon">▤</span>
                <span>Subjects</span>
              </button>
            </nav>
          </div>

          <div class="sidebar-footer">
            <strong>Student Productivity</strong>
            <p>Stay organized. Stay ahead.</p>
          </div>
        </aside>

        <!-- ================= MAIN ================= -->
        <main class="main-content">

          <!-- HEADER -->
          <header class="top-header">
            <div>
              <p class="eyebrow">STUDENT PRODUCTIVITY DASHBOARD</p>
              <h1>Dashboard</h1>
              <p class="subtitle">
                Stay organized, manage your assignments, and keep track of your progress.
              </p>
            </div>

            <div class="date-card">
              <div class="calendar-icon">▦</div>
              <div>
                <strong>{{ currentDay }}</strong>
                <span>{{ currentDate }}</span>
              </div>
            </div>
          </header>

          <!-- HERO -->
          <section class="hero">
            <div class="hero-content">
              <span class="student-badge">◆ BUILT FOR STUDENTS</span>

              <h2>
                Plan Smarter.<br />
                <span>Stay Ahead.</span>
              </h2>

              <p>
                Organize assignments, set priorities, track deadlines,
                and stay on top of your academic tasks—all in one place.
              </p>

              <div class="hero-tags">
                <span class="tag blue-tag">★ Smart Priority</span>
                <span class="tag green-tag">✓ Stay Organized</span>
                <span class="tag yellow-tag">◷ Track Deadlines</span>
                <span class="tag purple-tag">▣ Study Better</span>
              </div>
            </div>

            <!-- HERO PROGRESS CARD -->
            <div class="hero-progress">
              <div class="progress-title">
                <div>
                  <small>TODAY</small>
                  <h3>My Tasks</h3>
                </div>

                <div class="task-number">
                  {{ totalAssignments }}
                </div>
              </div>

              <div class="overall-row">
                <span>Overall progress</span>
                <strong>{{ progressPercentage }}%</strong>
              </div>

              <div class="progress-track">
                <div
                  class="progress-fill"
                  :style="{ width: progressPercentage + '%' }"
                ></div>
              </div>

              <div class="mini-feature feature-blue">
                <div class="mini-icon">✓</div>
                <div>
                  <strong>Stay organized</strong>
                  <span>Manage your schoolwork</span>
                </div>
              </div>

              <div class="mini-feature feature-yellow">
                <div class="mini-icon">◷</div>
                <div>
                  <strong>Meet deadlines</strong>
                  <span>Track important tasks</span>
                </div>
              </div>

              <div class="mini-feature feature-green">
                <div class="mini-icon">★</div>
                <div>
                  <strong>Reach your goals</strong>
                  <span>One task at a time</span>
                </div>
              </div>
            </div>
          </section>

          <!-- ================= STATISTICS ================= -->
          <section class="stats-grid">

            <div class="stat-card total-card">
              <div class="stat-icon">▣</div>
              <div>
                <span class="stat-label">TOTAL ASSIGNMENTS</span>
                <h3>{{ totalAssignments }}</h3>
                <p>All academic tasks</p>
              </div>
            </div>

            <div class="stat-card pending-card">
              <div class="stat-icon">◷</div>
              <div>
                <span class="stat-label">PENDING</span>
                <h3>{{ pendingCount }}</h3>
                <p>Need your attention</p>
              </div>
            </div>

            <div class="stat-card progress-card">
              <div class="stat-icon">↗</div>
              <div>
                <span class="stat-label">IN PROGRESS</span>
                <h3>{{ inProgressCount }}</h3>
                <p>Currently working</p>
              </div>
            </div>

            <div class="stat-card completed-card">
              <div class="stat-icon">✓</div>
              <div>
                <span class="stat-label">COMPLETED</span>
                <h3>{{ completedCount }}</h3>
                <p>Great work!</p>
              </div>
            </div>

          </section>

          <!-- MOTIVATION -->
          <section class="motivation-banner">
            <div class="motivation-icon">★</div>
            <div>
              <strong>Stay Organized. Save Time. Achieve More.</strong>
              <p>Small progress every day leads to bigger results.</p>
            </div>
            <span class="sparkle">✦</span>
          </section>

          <!-- ================= DASHBOARD CONTENT ================= -->
          <section class="dashboard-grid">

            <!-- UPCOMING DEADLINES -->
            <div class="panel deadlines-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-eyebrow">KEEP ON TRACK</p>
                  <h2>Upcoming Deadlines</h2>
                  <span>Your nearest unfinished assignments.</span>
                </div>

                <button class="outline-btn" @click="goTo('/tasks')">
                  View All →
                </button>
              </div>

              <div v-if="loading" class="empty-state">
                Loading assignments...
              </div>

              <div
                v-else-if="upcomingAssignments.length === 0"
                class="empty-state"
              >
                <div class="empty-icon">✓</div>
                <h3>No upcoming deadlines</h3>
                <p>You're all caught up. Great work!</p>
              </div>

              <div v-else class="deadline-list">
                <div
                  v-for="task in upcomingAssignments"
                  :key="task.id"
                  class="deadline-item"
                >
                  <div
                    class="priority-line"
                    :class="priorityClass(task.priority)"
                  ></div>

                  <div class="deadline-info">
                    <div class="task-tags">
                      <span class="subject-pill">
                        {{ task.subject || 'No Subject' }}
                      </span>

                      <span
                        class="priority-pill"
                        :class="priorityClass(task.priority)"
                      >
                        • {{ task.priority || 'Medium' }}
                      </span>
                    </div>

                    <h3>{{ task.title || 'Untitled Assignment' }}</h3>

                    <div class="deadline-meta">
                      <span>▦ {{ formatDate(task.deadline) }}</span>
                      <span :class="statusClass(task.status)">
                        {{ task.status || 'Pending' }}
                      </span>
                    </div>
                  </div>

                  <button
                    class="small-view-btn"
                    @click="goTo('/tasks')"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            <!-- OVERALL PROGRESS -->
            <div class="panel progress-panel">
              <div class="panel-header simple">
                <div>
                  <p class="panel-eyebrow">YOUR PROGRESS</p>
                  <h2>Overall Progress</h2>
                  <span>Based on all your assignments.</span>
                </div>
              </div>

              <div class="circle-wrapper">
                <div
                  class="progress-circle"
                  :style="{
                    background:
                      'conic-gradient(#2f63ed ' +
                      progressPercentage +
                      '%, #e8eefb ' +
                      progressPercentage +
                      '%)'
                  }"
                >
                  <div class="circle-inner">
                    <strong>{{ progressPercentage }}%</strong>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              <div class="progress-details">
                <div>
                  <span class="dot pending-dot"></span>
                  <p>Pending</p>
                  <strong>{{ pendingCount }}</strong>
                </div>

                <div>
                  <span class="dot progress-dot"></span>
                  <p>In Progress</p>
                  <strong>{{ inProgressCount }}</strong>
                </div>

                <div>
                  <span class="dot completed-dot"></span>
                  <p>Completed</p>
                  <strong>{{ completedCount }}</strong>
                </div>
              </div>
            </div>

          </section>

          <!-- ================= RECENT TASKS + QUICK ACTIONS ================= -->
          <section class="bottom-grid">

            <!-- RECENT TASKS -->
            <div class="panel recent-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-eyebrow">LATEST ACTIVITY</p>
                  <h2>Recent Tasks</h2>
                  <span>Your recently added assignments.</span>
                </div>

                <button class="outline-btn" @click="goTo('/tasks')">
                  My Tasks →
                </button>
              </div>

              <div
                v-if="!loading && recentAssignments.length === 0"
                class="empty-state compact"
              >
                <div class="empty-icon">▣</div>
                <h3>No assignments yet</h3>
                <p>Create your first assignment to get started.</p>

                <button class="primary-btn" @click="goTo('/add-task')">
                  + Add Assignment
                </button>
              </div>

              <div v-else class="recent-list">
                <div
                  v-for="task in recentAssignments"
                  :key="task.id"
                  class="recent-item"
                >
                  <div class="recent-icon">▣</div>

                  <div class="recent-info">
                    <div class="task-tags">
                      <span class="subject-pill">
                        {{ task.subject || 'No Subject' }}
                      </span>

                      <span
                        class="priority-pill"
                        :class="priorityClass(task.priority)"
                      >
                        • {{ task.priority || 'Medium' }}
                      </span>
                    </div>

                    <h3>{{ task.title || 'Untitled Assignment' }}</h3>
                    <p>Due {{ formatDate(task.deadline) }}</p>
                  </div>

                  <span
                    class="status-badge"
                    :class="statusClass(task.status)"
                  >
                    {{ task.status || 'Pending' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="panel quick-panel">
              <div class="panel-header simple">
                <div>
                  <p class="panel-eyebrow">SHORTCUTS</p>
                  <h2>Quick Actions</h2>
                  <span>Go directly to what you need.</span>
                </div>
              </div>

              <div class="quick-actions">
                <button
                  class="quick-card quick-add"
                  @click="goTo('/add-task')"
                >
                  <div class="quick-icon">＋</div>
                  <div>
                    <strong>Add Assignment</strong>
                    <span>Create a new academic task</span>
                  </div>
                  <b>→</b>
                </button>

                <button
                  class="quick-card quick-tasks"
                  @click="goTo('/tasks')"
                >
                  <div class="quick-icon">☷</div>
                  <div>
                    <strong>My Tasks</strong>
                    <span>Manage all assignments</span>
                  </div>
                  <b>→</b>
                </button>

                <button
                  class="quick-card quick-subjects"
                  @click="goTo('/subjects')"
                >
                  <div class="quick-icon">▤</div>
                  <div>
                    <strong>Subjects</strong>
                    <span>View academic subjects</span>
                  </div>
                  <b>→</b>
                </button>
              </div>
            </div>

          </section>

          <!-- FOOTER -->
          <footer class="footer">
            <div class="footer-brand">
              <div class="footer-logo">✓</div>
              <span>
                <strong>Assignment Tracker</strong>
                Student Productivity Dashboard
              </span>
            </div>

            <p>Plan • Prioritize • Progress • Succeed</p>
          </footer>

        </main>

        <!-- ================= MOBILE BOTTOM NAVIGATION ================= -->
        <nav class="mobile-nav">
          <button class="mobile-nav-item active" @click="goTo('/home')">
            <span class="mobile-nav-icon">▦</span>
            <span>Dashboard</span>
          </button>

          <button class="mobile-nav-item" @click="goTo('/tasks')">
            <span class="mobile-nav-icon">☷</span>
            <span>Tasks</span>
          </button>

          <button class="mobile-nav-item mobile-nav-add" @click="goTo('/add-task')">
            <span class="mobile-add-icon">＋</span>
            <span>Add</span>
          </button>

          <button class="mobile-nav-item" @click="goTo('/subjects')">
            <span class="mobile-nav-icon">▤</span>
            <span>Subjects</span>
          </button>
        </nav>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

import {
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';

import { db } from '../firebase';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  deadline: string;
  priority: string;
  notes?: string;
  status: string;
  createdAt?: any;
}

const router = useRouter();

const assignments = ref<Assignment[]>([]);
const loading = ref(true);

/* =========================
   NAVIGATION
========================= */

const goTo = (path: string) => {
  router.push(path);
};

/* =========================
   DATE
========================= */

const today = new Date();

const currentDay = today.toLocaleDateString('en-US', {
  weekday: 'long'
});

const currentDate = today.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

/* =========================
   FIREBASE
========================= */

const loadAssignments = async () => {
  loading.value = true;

  try {
    const assignmentsRef = collection(db, 'assignments');

    try {
      const q = query(
        assignmentsRef,
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);

      assignments.value = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Assignment, 'id'>)
      }));
    } catch {
      /*
        Fallback para gumana pa rin kahit may old document
        na walang createdAt.
      */
      const snapshot = await getDocs(assignmentsRef);

      assignments.value = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Assignment, 'id'>)
      }));
    }
  } catch (error) {
    console.error('Error loading assignments:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAssignments();
});

/* =========================
   STATISTICS
========================= */

const totalAssignments = computed(() => {
  return assignments.value.length;
});

const pendingCount = computed(() => {
  return assignments.value.filter(
    (task) =>
      String(task.status || '').toLowerCase() === 'pending'
  ).length;
});

const inProgressCount = computed(() => {
  return assignments.value.filter(
    (task) =>
      String(task.status || '').toLowerCase() === 'in progress'
  ).length;
});

const completedCount = computed(() => {
  return assignments.value.filter(
    (task) =>
      String(task.status || '').toLowerCase() === 'completed'
  ).length;
});

const progressPercentage = computed(() => {
  if (totalAssignments.value === 0) {
    return 0;
  }

  return Math.round(
    (completedCount.value / totalAssignments.value) * 100
  );
});

/* =========================
   UPCOMING DEADLINES
========================= */

const upcomingAssignments = computed(() => {
  return assignments.value
    .filter((task) => {
      return (
        String(task.status || '').toLowerCase() !== 'completed' &&
        task.deadline
      );
    })
    .sort((a, b) => {
      return (
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
      );
    })
    .slice(0, 3);
});

/* =========================
   RECENT TASKS
========================= */

const recentAssignments = computed(() => {
  return assignments.value.slice(0, 4);
});

/* =========================
   FORMATTERS
========================= */

const formatDate = (date: string) => {
  if (!date) {
    return 'No deadline';
  }

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const priorityClass = (priority: string) => {
  switch (String(priority || '').toLowerCase()) {
    case 'high':
      return 'priority-high';

    case 'low':
      return 'priority-low';

    default:
      return 'priority-medium';
  }
};

const statusClass = (status: string) => {
  switch (String(status || '').toLowerCase()) {
    case 'completed':
      return 'status-completed';

    case 'in progress':
      return 'status-progress';

    default:
      return 'status-pending';
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

ion-content {
  --background: #f5f8fd;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #17233d;
}

button {
  font-family: inherit;
}

.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f5f8fd;
  color: #17233d;
}

/* =========================
   SIDEBAR
========================= */

.sidebar {
  position: sticky;
  top: 0;
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e3e9f4;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 20;
}

.brand {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 42px;
}

.brand-icon {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d58dc, #3e7df3);
  color: white;
  font-size: 31px;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(47, 99, 237, 0.22);
}

.brand h2 {
  margin: 0;
  line-height: 1.08;
  font-size: 20px;
  font-weight: 800;
  color: #17233d;
}

.brand h2.blue {
  color: #3165ea;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  width: 100%;
  border: none;
  background: transparent;
  color: #65718a;
  border-radius: 13px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  transition: 0.2s ease;
}

.nav-item:hover {
  background: #f2f6ff;
  color: #2f63ed;
}

.nav-item.active {
  color: #2f63ed;
  background: #eaf1ff;
}

.nav-icon {
  width: 20px;
  text-align: center;
  font-size: 19px;
}

.sidebar-footer {
  border-top: 1px solid #e6ebf4;
  padding-top: 22px;
}

.sidebar-footer strong {
  font-size: 14px;
}

.sidebar-footer p {
  margin: 7px 0 0;
  color: #94a0b8;
  font-size: 12px;
}

/* =========================
   MAIN
========================= */

.main-content {
  flex: 1;
  width: calc(100% - 250px);
  padding: 38px 44px 24px;
  overflow: hidden;
}

.top-header {
  max-width: 1280px;
  margin: 0 auto 26px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow,
.panel-eyebrow {
  margin: 0 0 8px;
  color: #2f63ed;
  font-size: 12px;
  letter-spacing: 1.4px;
  font-weight: 900;
}

.top-header h1 {
  margin: 0;
  font-size: 38px;
  letter-spacing: -1px;
  font-weight: 900;
  color: #17233d;
}

.subtitle {
  color: #71809a;
  margin: 8px 0 0;
  font-size: 14px;
}

.date-card {
  display: flex;
  gap: 11px;
  align-items: center;
  background: #fff;
  border: 1px solid #dce4f1;
  border-radius: 16px;
  padding: 11px 17px;
  min-width: 190px;
  box-shadow: 0 8px 25px rgba(37, 54, 89, 0.04);
}

.calendar-icon {
  width: 36px;
  height: 36px;
  background: #edf3ff;
  color: #2f63ed;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-card div:last-child {
  display: flex;
  flex-direction: column;
}

.date-card strong {
  color: #2f63ed;
  font-size: 12px;
}

.date-card span {
  color: #536078;
  font-size: 11px;
  margin-top: 2px;
}

/* =========================
   HERO
========================= */

.hero {
  max-width: 1280px;
  min-height: 330px;
  margin: 0 auto 20px;
  border-radius: 27px;
  border: 1px solid #dce5f3;
  background:
    radial-gradient(circle at 95% 80%, rgba(171, 132, 255, 0.15), transparent 15%),
    linear-gradient(110deg, #eef5ff 0%, #fbfefe 55%, #faf8ff 100%);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  overflow: hidden;
}

.hero-content {
  flex: 1;
}

.student-badge {
  display: inline-flex;
  padding: 8px 13px;
  background: #149486;
  color: #fff;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 900;
  margin-bottom: 20px;
}

.hero h2 {
  font-size: clamp(42px, 4.2vw, 64px);
  line-height: 0.98;
  letter-spacing: -3px;
  margin: 0;
  font-weight: 900;
  color: #17233d;
}

.hero h2 span {
  color: #3564e9;
}

.hero-content > p {
  margin: 22px 0;
  max-width: 700px;
  color: #6f7c94;
  line-height: 1.7;
  font-size: 14px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.tag {
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 800;
}

.blue-tag {
  color: #2658d7;
  background: #e3ecff;
}

.green-tag {
  color: #087b64;
  background: #ddf4ea;
}

.yellow-tag {
  color: #9b6700;
  background: #fff0c7;
}

.purple-tag {
  color: #6950c8;
  background: #eee6ff;
}

.hero-progress {
  width: 310px;
  min-width: 310px;
  background: white;
  border: 1px solid #dce3ef;
  padding: 20px;
  border-radius: 22px;
  box-shadow: 0 18px 45px rgba(41, 55, 85, 0.09);
}

.progress-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-title small {
  color: #8290a8;
  font-size: 9px;
  font-weight: 900;
}

.progress-title h3 {
  margin: 3px 0 0;
  font-size: 16px;
  color: #17233d;
}

.task-number {
  background: #3263e9;
  color: white;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 900;
}

.overall-row {
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  font-size: 9px;
  color: #7e899e;
}

.overall-row strong {
  color: #2f63ed;
}

.progress-track {
  height: 6px;
  background: #e7ebf3;
  border-radius: 20px;
  margin: 8px 0 17px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #3262ed, #16a085);
  transition: width 0.4s ease;
}

.mini-feature {
  padding: 10px;
  border-radius: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 9px;
}

.feature-blue {
  background: #e9f0ff;
}

.feature-yellow {
  background: #fff2d1;
}

.feature-green {
  background: #e2f4ed;
}

.mini-icon {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f63ed;
}

.mini-feature div:last-child {
  display: flex;
  flex-direction: column;
}

.mini-feature strong {
  font-size: 10px;
  color: #17233d;
}

.mini-feature span {
  font-size: 8px;
  color: #78869c;
  margin-top: 2px;
}

/* =========================
   STAT CARDS
========================= */

.stats-grid {
  max-width: 1280px;
  margin: 0 auto 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stat-card {
  min-height: 130px;
  border: 1px solid;
  border-radius: 21px;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  gap: 17px;
}

.total-card {
  background: #e7efff;
  border-color: #d7e2fa;
}

.pending-card {
  background: #fff0c9;
  border-color: #f3dfaa;
}

.progress-card {
  background: #eee7ff;
  border-color: #e1d7fb;
}

.completed-card {
  background: #def3ea;
  border-color: #cce8dd;
}

.stat-icon {
  width: 49px;
  height: 49px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  color: #2f63ed;
}

.stat-label {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.4px;
  color: #536078;
}

.stat-card h3 {
  margin: 4px 0;
  font-size: 27px;
  color: #17233d;
}

.stat-card p {
  color: #75839b;
  margin: 0;
  font-size: 9px;
}

/* =========================
   MOTIVATION
========================= */

.motivation-banner {
  max-width: 1280px;
  margin: 0 auto 20px;
  min-height: 75px;
  border-radius: 18px;
  background: linear-gradient(100deg, #2d50d4, #3268eb, #0e9483);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 15px 25px;
}

.motivation-icon {
  width: 39px;
  height: 39px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.motivation-banner strong {
  font-size: 14px;
}

.motivation-banner p {
  margin: 3px 0 0;
  font-size: 9px;
  text-align: center;
}

.sparkle {
  font-size: 17px;
}

/* =========================
   PANELS
========================= */

.dashboard-grid,
.bottom-grid {
  max-width: 1280px;
  margin: 0 auto 20px;
  display: grid;
  grid-template-columns: 1.65fr 0.85fr;
  gap: 18px;
}

.bottom-grid {
  grid-template-columns: 1.5fr 0.8fr;
}

.panel {
  background: #fff;
  border: 1px solid #dce4f0;
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(35, 52, 82, 0.035);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.panel-header.simple {
  display: block;
}

.panel-header h2 {
  margin: 0;
  font-size: 21px;
  color: #17233d;
}

.panel-header span {
  display: block;
  margin-top: 5px;
  color: #8290a7;
  font-size: 11px;
}

.panel-eyebrow {
  margin-bottom: 5px;
  font-size: 9px;
}

.outline-btn {
  border: 1px solid #d5dff0;
  color: #2f63ed;
  background: #f9fbff;
  padding: 10px 14px;
  border-radius: 11px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.outline-btn:hover {
  background: #edf3ff;
}

/* =========================
   DEADLINES
========================= */

.deadline-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.deadline-item {
  position: relative;
  border: 1px solid #e0e6f0;
  border-radius: 15px;
  padding: 15px 15px 15px 21px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}

.priority-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}

.deadline-info {
  flex: 1;
  min-width: 0;
}

.task-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.subject-pill,
.priority-pill {
  display: inline-flex;
  width: fit-content;
  padding: 5px 8px;
  border-radius: 12px;
  font-size: 8px;
  font-weight: 800;
}

.subject-pill {
  color: #2f63ed;
  background: #eaf0ff;
}

.priority-high {
  color: #c72f49;
  background: #ffe5e9;
}

.priority-medium {
  color: #956200;
  background: #fff0c7;
}

.priority-low {
  color: #08765d;
  background: #ddf5ea;
}

.priority-line.priority-high {
  background: #e14d64;
}

.priority-line.priority-medium {
  background: #f1b92e;
}

.priority-line.priority-low {
  background: #25a57e;
}

.deadline-item h3 {
  margin: 8px 0 5px;
  font-size: 14px;
  color: #17233d;
}

.deadline-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  color: #7d8aa0;
  font-size: 9px;
}

.status-pending {
  color: #a66a00 !important;
}

.status-progress {
  color: #6543d8 !important;
}

.status-completed {
  color: #008265 !important;
}

.small-view-btn {
  border: 1px solid #d6e0f2;
  background: #f8faff;
  color: #2f63ed;
  border-radius: 10px;
  padding: 9px 13px;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

/* =========================
   CIRCLE PROGRESS
========================= */

.circle-wrapper {
  display: flex;
  justify-content: center;
  padding: 15px 0 25px;
}

.progress-circle {
  width: 155px;
  height: 155px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-inner {
  width: 122px;
  height: 122px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.circle-inner strong {
  font-size: 29px;
  color: #2f63ed;
}

.circle-inner span {
  color: #8996aa;
  font-size: 9px;
}

.progress-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  text-align: center;
}

.progress-details > div {
  background: #f7f9fd;
  border-radius: 12px;
  padding: 10px 5px;
}

.dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.pending-dot {
  background: #f1b82d;
}

.progress-dot {
  background: #8a68ea;
}

.completed-dot {
  background: #20a77d;
}

.progress-details p {
  margin: 4px 0;
  color: #8793a8;
  font-size: 8px;
}

.progress-details strong {
  font-size: 15px;
  color: #17233d;
}

/* =========================
   RECENT TASKS
========================= */

.recent-list {
  display: flex;
  flex-direction: column;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 14px 0;
  border-bottom: 1px solid #edf0f5;
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 11px;
  background: #edf3ff;
  color: #2f63ed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-info {
  flex: 1;
  min-width: 0;
}

.recent-info h3 {
  margin: 7px 0 3px;
  font-size: 13px;
  color: #17233d;
}

.recent-info p {
  margin: 0;
  color: #8794a9;
  font-size: 9px;
}

.status-badge {
  border-radius: 20px;
  padding: 8px 11px;
  font-size: 8px;
  font-weight: 900;
}

.status-badge.status-pending {
  background: #fff0c7;
}

.status-badge.status-progress {
  background: #eee5ff;
}

.status-badge.status-completed {
  background: #dcf3e9;
}

/* =========================
   QUICK ACTIONS
========================= */

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.quick-card {
  width: 100%;
  border: 1px solid #e0e6f1;
  border-radius: 15px;
  background: #fbfcff;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  color: #17233d;
  transition: 0.2s ease;
}

.quick-card:hover {
  transform: translateY(-2px);
  border-color: #b9c9ed;
  box-shadow: 0 8px 20px rgba(47, 99, 237, 0.07);
}

.quick-icon {
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.quick-add .quick-icon {
  background: #e6edff;
  color: #2f63ed;
}

.quick-tasks .quick-icon {
  background: #e1f5ef;
  color: #118e77;
}

.quick-subjects .quick-icon {
  background: #f0e8ff;
  color: #7252d5;
}

.quick-card > div:nth-child(2) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.quick-card strong {
  font-size: 11px;
  color: #17233d;
}

.quick-card span {
  margin-top: 3px;
  color: #8895aa;
  font-size: 8px;
}

.quick-card b {
  color: #2f63ed;
}

/* =========================
   EMPTY STATE
========================= */

.empty-state {
  min-height: 190px;
  border: 1px dashed #dce3ef;
  border-radius: 15px;
  background: #fafcff;
  color: #8b97aa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 25px;
}

.empty-state.compact {
  min-height: 230px;
}

.empty-icon {
  width: 43px;
  height: 43px;
  border-radius: 13px;
  background: #e9f0ff;
  color: #2f63ed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 20px;
}

.empty-state h3 {
  color: #27334a;
  margin: 0 0 5px;
  font-size: 14px;
}

.empty-state p {
  margin: 0;
  font-size: 10px;
}

.primary-btn {
  margin-top: 15px;
  border: none;
  border-radius: 11px;
  background: #3263eb;
  color: white;
  padding: 11px 17px;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

/* =========================
   FOOTER
========================= */

.footer {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 4px 10px;
  border-top: 1px solid #e5eaf3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8794a8;
  font-size: 9px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 9px;
}

.footer-logo {
  width: 29px;
  height: 29px;
  background: #3263e9;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-brand span {
  display: flex;
  gap: 4px;
}

.footer strong {
  color: #536079;
}

/* =========================
   MOBILE APP HEADER + BOTTOM NAV
========================= */

.mobile-brand-header,
.mobile-nav {
  display: none;
}

/* =========================
   TABLET
========================= */

@media (max-width: 1100px) {
  .main-content {
    padding: 30px 25px;
  }

  .hero {
    gap: 25px;
    padding: 32px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 760px) {
  .dashboard {
    display: block;
    min-height: 100vh;
  }

  /* Hide the desktop sidebar completely on phones. */
  .sidebar {
    display: none;
  }

  /* Simple, consistent app header. */
  .mobile-brand-header {
    position: sticky;
    top: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 66px;
    padding: 11px 14px;
    background: rgba(255, 255, 255, 0.98);
    border-bottom: 1px solid #e1e7f1;
    box-shadow: 0 4px 14px rgba(35, 52, 82, 0.035);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-brand-icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2d58dc, #3e7df3);
    color: #fff;
    font-size: 24px;
    font-weight: 800;
    box-shadow: 0 8px 18px rgba(47, 99, 237, 0.2);
  }

  .mobile-brand strong {
    color: #17233d;
    font-size: 16px;
    font-weight: 900;
  }

  .main-content {
    width: 100%;
    padding: 20px 14px 105px;
  }

  .top-header {
    display: block;
  }

  .top-header h1 {
    font-size: 30px;
  }

  .date-card {
    margin-top: 15px;
    width: fit-content;
  }

  .hero {
    display: block;
    padding: 26px 20px;
    border-radius: 20px;
  }

  .hero h2 {
    font-size: 42px;
    letter-spacing: -2px;
  }

  .hero-progress {
    width: 100%;
    min-width: 0;
    margin-top: 28px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }

  .stat-card {
    min-height: 115px;
    padding: 16px 12px;
    gap: 10px;
  }

  .stat-icon {
    width: 39px;
    height: 39px;
  }

  .stat-card h3 {
    font-size: 23px;
  }

  .motivation-banner {
    justify-content: flex-start;
  }

  .motivation-banner strong {
    font-size: 11px;
  }

  .motivation-banner p {
    text-align: left;
  }

  .panel {
    padding: 18px 15px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .deadline-item,
  .recent-item {
    align-items: flex-start;
  }

  .small-view-btn {
    padding: 7px 9px;
  }

  .status-badge {
    padding: 6px 8px;
  }

  .footer {
    display: block;
    text-align: center;
  }

  .footer-brand {
    justify-content: center;
  }

  .footer > p {
    margin-top: 12px;
  }

  /* Same fixed bottom navigation used throughout the mobile app. */
  .mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: end;
    min-height: 72px;
    padding: 7px 8px calc(7px + env(safe-area-inset-bottom));
    background: rgba(255, 255, 255, 0.98);
    border-top: 1px solid #dfe6f2;
    box-shadow: 0 -7px 22px rgba(30, 45, 75, 0.08);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .mobile-nav-item {
    min-width: 0;
    min-height: 58px;
    border: none;
    border-radius: 11px;
    background: transparent;
    color: #667085;
    padding: 5px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
  }

  .mobile-nav-item.active {
    color: #2f63ed;
  }

  .mobile-nav-icon {
    display: block;
    font-size: 24px;
    font-weight: 900;
    line-height: 1;
  }

  .mobile-nav-add {
    overflow: visible;
  }

  .mobile-add-icon {
    width: 38px;
    height: 38px;
    margin-top: -22px;
    margin-bottom: 1px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3263eb;
    color: #fff;
    font-size: 23px;
    font-weight: 500;
    box-shadow: 0 7px 17px rgba(47, 99, 237, 0.3);
  }
}

/* =========================
   VERY SMALL PHONE
========================= */

@media (max-width: 420px) {
  .main-content {
    padding-left: 10px;
    padding-right: 10px;
  }

  .hero {
    padding: 22px 16px;
  }

  .hero h2 {
    font-size: 36px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: 95px;
  }

  .hero-tags {
    gap: 6px;
  }

  .tag {
    font-size: 9px;
  }

  .progress-details {
    grid-template-columns: 1fr;
  }

  .deadline-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .footer-brand span {
    flex-direction: column;
  }
}
</style>