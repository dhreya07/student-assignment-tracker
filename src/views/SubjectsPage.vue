<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="app-shell">

        <!-- ================= SIDEBAR ================= -->
        <aside class="sidebar">
          <div class="brand">
            <div class="brand-icon">✓</div>

            <div>
              <h2>Assignment</h2>
              <span>Tracker</span>
            </div>
          </div>

          <nav class="nav-menu">
            <router-link to="/home" class="nav-item">
              <span class="nav-icon">▦</span>
              Dashboard
            </router-link>

            <router-link to="/tasks" class="nav-item">
              <span class="nav-icon">☷</span>
              My Tasks
            </router-link>

            <router-link to="/add-task" class="nav-item">
              <span class="nav-icon">＋</span>
              Add Task
            </router-link>

            <router-link to="/subjects" class="nav-item active">
              <span class="nav-icon">▤</span>
              Subjects
            </router-link>
          </nav>

          <div class="sidebar-bottom">
            <p>Student Productivity</p>
            <span>Stay organized. Stay ahead.</span>
          </div>
        </aside>

        <!-- ================= MAIN ================= -->
        <main class="main-content">

          <!-- MOBILE HEADER -->
          <div class="mobile-header">
            <div class="mobile-logo">
              <div class="small-logo">✓</div>
              <strong>Assignment Tracker</strong>
            </div>
          </div>

          <!-- ================= PAGE HEADER ================= -->
          <section class="page-header">
            <div>
              <p class="eyebrow">ACADEMIC ORGANIZATION</p>

              <h1>My Subjects</h1>

              <p class="subtitle">
                View your subjects and track assignments for each course.
              </p>
            </div>

            <router-link to="/add-task" class="add-button">
              <span>＋</span>
              Add Assignment
            </router-link>
          </section>

          <!-- ================= SUMMARY ================= -->
          <section class="summary-grid">

            <div class="summary-card subjects">
              <div class="summary-icon">▤</div>

              <div>
                <span>TOTAL SUBJECTS</span>
                <strong>{{ subjects.length }}</strong>
                <p>Active academic subjects</p>
              </div>
            </div>

            <div class="summary-card assignments">
              <div class="summary-icon">▣</div>

              <div>
                <span>TOTAL ASSIGNMENTS</span>
                <strong>{{ assignments.length }}</strong>
                <p>Across all subjects</p>
              </div>
            </div>

            <div class="summary-card progress">
              <div class="summary-icon">↗</div>

              <div>
                <span>IN PROGRESS</span>
                <strong>{{ totalInProgress }}</strong>
                <p>Currently working</p>
              </div>
            </div>

            <div class="summary-card completed">
              <div class="summary-icon">✓</div>

              <div>
                <span>COMPLETED</span>
                <strong>{{ totalCompleted }}</strong>
                <p>Finished assignments</p>
              </div>
            </div>

          </section>

          <!-- ================= SUBJECT PANEL ================= -->
          <section class="subject-panel">

            <div class="panel-header">
              <div>
                <h2>All Subjects</h2>

                <p>
                  {{ filteredSubjects.length }}
                  {{ filteredSubjects.length === 1 ? 'subject' : 'subjects' }}
                  found
                </p>
              </div>

              <button
                class="refresh-button"
                @click="loadAssignments"
                :disabled="loading"
              >
                ↻ {{ loading ? 'Loading...' : 'Refresh' }}
              </button>
            </div>

            <!-- ================= SEARCH ================= -->
            <div class="search-box">
              <span>⌕</span>

              <input
                v-model="searchText"
                type="text"
                placeholder="Search subjects..."
              />
            </div>

            <!-- ================= LOADING ================= -->
            <div
              v-if="loading && assignments.length === 0"
              class="empty-state"
            >
              <div class="empty-icon">↻</div>

              <h3>Loading subjects...</h3>

              <p>Please wait for a moment.</p>
            </div>

            <!-- ================= EMPTY ================= -->
            <div
              v-else-if="filteredSubjects.length === 0"
              class="empty-state"
            >
              <div class="empty-icon">▤</div>

              <h3>
                {{ subjects.length === 0
                  ? 'No subjects yet'
                  : 'No subjects found'
                }}
              </h3>

              <p v-if="subjects.length === 0">
                Subjects will automatically appear here
                when you create assignments.
              </p>

              <p v-else>
                Try searching for another subject.
              </p>

              <router-link
                v-if="subjects.length === 0"
                to="/add-task"
                class="empty-button"
              >
                ＋ Add your first assignment
              </router-link>
            </div>

            <!-- ================= SUBJECT CARDS ================= -->
            <div
              v-else
              class="subjects-grid"
            >

              <article
                v-for="subject in filteredSubjects"
                :key="subject.name"
                class="subject-card"
              >

                <!-- TOP -->
                <div class="subject-card-top">

                  <div class="subject-icon">
                    {{ getSubjectInitial(subject.name) }}
                  </div>

                  <div class="subject-count">
                    {{ subject.total }}
                    {{ subject.total === 1 ? 'Task' : 'Tasks' }}
                  </div>

                </div>

                <!-- NAME -->
                <div class="subject-info">

                  <span class="subject-label">
                    SUBJECT
                  </span>

                  <h3>{{ subject.name }}</h3>

                  <p>
                    {{ subject.completed }} of
                    {{ subject.total }} assignments completed
                  </p>

                </div>

                <!-- PROGRESS -->
                <div class="progress-section">

                  <div class="progress-heading">
                    <span>Overall Progress</span>
                    <strong>{{ subject.progress }}%</strong>
                  </div>

                  <div class="progress-track">
                    <div
                      class="progress-fill"
                      :style="{ width: subject.progress + '%' }"
                    ></div>
                  </div>

                </div>

                <!-- STATS -->
                <div class="subject-stats">

                  <div class="mini-stat pending">
                    <span>◷</span>

                    <div>
                      <strong>{{ subject.pending }}</strong>
                      <small>Pending</small>
                    </div>
                  </div>

                  <div class="mini-stat in-progress">
                    <span>↗</span>

                    <div>
                      <strong>{{ subject.inProgress }}</strong>
                      <small>In Progress</small>
                    </div>
                  </div>

                  <div class="mini-stat done">
                    <span>✓</span>

                    <div>
                      <strong>{{ subject.completed }}</strong>
                      <small>Completed</small>
                    </div>
                  </div>

                </div>

                <!-- FOOTER -->
                <div class="subject-footer">

                  <span
                    v-if="subject.pending > 0"
                    class="attention"
                  >
                    ● {{ subject.pending }} need attention
                  </span>

                  <span
                    v-else-if="subject.inProgress > 0"
                    class="working"
                  >
                    ● Keep going!
                  </span>

                  <span
                    v-else
                    class="all-done"
                  >
                    ✓ All tasks completed
                  </span>

                  <router-link
                    to="/tasks"
                    class="view-button"
                  >
                    View Tasks →
                  </router-link>

                </div>

              </article>

            </div>

          </section>

        </main>

        <!-- ================= MOBILE NAV ================= -->
        <nav class="mobile-nav">

          <router-link to="/home">
            <span>▦</span>
            Dashboard
          </router-link>

          <router-link to="/tasks">
            <span>☷</span>
            Tasks
          </router-link>

          <router-link
            to="/add-task"
            class="mobile-add"
          >
            <span>＋</span>
            Add
          </router-link>

          <router-link
            to="/subjects"
            class="mobile-active"
          >
            <span>▤</span>
            Subjects
          </router-link>

        </nav>

        <!-- ================= TOAST ================= -->
        <div
          v-if="toastMessage"
          class="toast"
        >
          {{ toastMessage }}
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import {
  computed,
  onMounted,
  ref
} from 'vue';

import {
  IonContent,
  IonPage
} from '@ionic/vue';

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
  status: string;
  priority: string;
  notes: string;
}


interface SubjectSummary {
  name: string;
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  progress: number;
}


const assignments =
  ref<Assignment[]>([]);

const loading =
  ref(false);

const searchText =
  ref('');

const toastMessage =
  ref('');


/* ================= TOAST ================= */

const showToast = (message: string) => {

  toastMessage.value = message;

  setTimeout(() => {
    toastMessage.value = '';
  }, 2500);

};


/* ================= LOAD FIREBASE ================= */

const loadAssignments = async () => {

  try {

    loading.value = true;

    const assignmentQuery = query(
      collection(db, 'assignments'),
      orderBy('createdAt', 'desc')
    );

    const snapshot =
      await getDocs(assignmentQuery);

    assignments.value =
      snapshot.docs.map((document) => {

        const data = document.data();

        return {
          id: document.id,
          subject: data.subject ?? '',
          title: data.title ?? '',
          deadline: data.deadline ?? '',
          status: data.status ?? 'Pending',
          priority: data.priority ?? 'Medium',
          notes: data.notes ?? ''
        };

      });

  }

  catch (error) {

    console.error(
      'Ordered subject query failed:',
      error
    );

    /*
      Fallback query just like TasksPage.
    */

    try {

      const snapshot =
        await getDocs(
          collection(db, 'assignments')
        );

      assignments.value =
        snapshot.docs.map((document) => {

          const data = document.data();

          return {
            id: document.id,
            subject: data.subject ?? '',
            title: data.title ?? '',
            deadline: data.deadline ?? '',
            status: data.status ?? 'Pending',
            priority: data.priority ?? 'Medium',
            notes: data.notes ?? ''
          };

        });

    }

    catch (secondError) {

      console.error(
        'Loading subjects failed:',
        secondError
      );

      showToast(
        'Unable to load subjects.'
      );

    }

  }

  finally {

    loading.value = false;

  }

};


/* ================= SUBJECT SUMMARY ================= */

const subjects =
  computed<SubjectSummary[]>(() => {

    const subjectMap =
      new Map<string, Assignment[]>();

    assignments.value.forEach(
      (assignment) => {

        const subjectName =
          assignment.subject.trim();

        if (!subjectName) {
          return;
        }

        /*
          Case-insensitive grouping.
          "CIA 2" and "cia 2" will be treated
          as the same subject.
        */

        const existingKey =
          Array.from(subjectMap.keys()).find(
            (key) =>
              key.toLowerCase() ===
              subjectName.toLowerCase()
          );

        if (existingKey) {

          subjectMap
            .get(existingKey)!
            .push(assignment);

        }

        else {

          subjectMap.set(
            subjectName,
            [assignment]
          );

        }

      }
    );


    return Array.from(
      subjectMap.entries()
    )
      .map(([name, subjectAssignments]) => {

        const total =
          subjectAssignments.length;

        const pending =
          subjectAssignments.filter(
            (assignment) =>
              assignment.status === 'Pending'
          ).length;

        const inProgress =
          subjectAssignments.filter(
            (assignment) =>
              assignment.status === 'In Progress'
          ).length;

        const completed =
          subjectAssignments.filter(
            (assignment) =>
              assignment.status === 'Completed'
          ).length;

        const progress =
          total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
              );

        return {
          name,
          total,
          pending,
          inProgress,
          completed,
          progress
        };

      })
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

  });


/* ================= SEARCH ================= */

const filteredSubjects =
  computed(() => {

    const search =
      searchText.value
        .toLowerCase()
        .trim();

    if (!search) {
      return subjects.value;
    }

    return subjects.value.filter(
      (subject) =>
        subject.name
          .toLowerCase()
          .includes(search)
    );

  });


/* ================= COUNTERS ================= */

const totalInProgress =
  computed(() => {

    return assignments.value.filter(
      (assignment) =>
        assignment.status ===
        'In Progress'
    ).length;

  });


const totalCompleted =
  computed(() => {

    return assignments.value.filter(
      (assignment) =>
        assignment.status ===
        'Completed'
    ).length;

  });


/* ================= HELPERS ================= */

const getSubjectInitial =
  (subject: string) => {

    const cleaned =
      subject.trim();

    if (!cleaned) {
      return '?';
    }

    const words =
      cleaned.split(/\s+/);

    if (words.length >= 2) {

      return (
        words[0].charAt(0) +
        words[1].charAt(0)
      ).toUpperCase();

    }

    return cleaned
      .substring(0, 2)
      .toUpperCase();

  };


onMounted(() => {

  loadAssignments();

});

</script>


<style scoped>

/* ================= GLOBAL ================= */

* {
  box-sizing: border-box;
}

ion-content {
  --background: #f5f8fd;
}

.app-shell {
  min-height: 100vh;
  background: #f5f8fd;
  color: #17233b;
  font-family: Inter, Arial, sans-serif;
}


/* ================= SIDEBAR ================= */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  width: 245px;
  padding: 28px 20px;

  background: white;

  border-right:
    1px solid #e6ebf5;

  z-index: 50;

  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 42px;
}

.brand-icon {
  width: 48px;
  height: 48px;

  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #2857df,
      #3e7bf4
    );

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 26px;
  font-weight: 800;

  box-shadow:
    0 10px 25px
    rgba(45, 91, 220, .20);
}

.brand h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
}

.brand span {
  color: #3465e8;
  font-weight: 800;
  font-size: 18px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  text-decoration: none;

  display: flex;
  align-items: center;
  gap: 13px;

  min-height: 50px;

  padding: 0 15px;

  border-radius: 13px;

  color: #68748a;

  font-size: 14px;
  font-weight: 700;

  transition: .2s;
}

.nav-item:hover {
  background: #f3f6fd;
  color: #2858df;
}

.nav-item.active {
  color: #2858df;
  background: #edf3ff;
}

.nav-icon {
  width: 25px;
  font-size: 19px;
  text-align: center;
}

.sidebar-bottom {
  margin-top: auto;

  border-top:
    1px solid #edf0f6;

  padding-top: 20px;
}

.sidebar-bottom p {
  margin: 0 0 5px;

  font-size: 12px;
  font-weight: 800;

  color: #45536c;
}

.sidebar-bottom span {
  font-size: 10px;
  color: #9aa4b7;
}


/* ================= MAIN ================= */

.main-content {
  margin-left: 245px;

  padding:
    42px 44px 70px;

  max-width: 1700px;
}

.mobile-header {
  display: none;
}


/* ================= HEADER ================= */

.page-header {
  display: flex;

  justify-content:
    space-between;

  align-items: center;

  gap: 20px;

  margin-bottom: 30px;
}

.eyebrow {
  margin: 0 0 8px;

  color: #2d63e6;

  font-size: 11px;
  font-weight: 900;

  letter-spacing: 1.2px;
}

.page-header h1 {
  margin: 0;

  font-size: 38px;
  line-height: 1.1;

  font-weight: 850;

  color: #17233b;
}

.subtitle {
  margin: 10px 0 0;

  color: #7b879b;

  font-size: 14px;
}

.add-button {
  min-height: 48px;

  padding: 0 20px;

  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  text-decoration: none;

  background:
    linear-gradient(
      135deg,
      #2857df,
      #3978ef
    );

  color: white;

  font-size: 13px;
  font-weight: 800;

  box-shadow:
    0 8px 20px
    rgba(40, 87, 223, .18);
}


/* ================= SUMMARY ================= */

.summary-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;

  margin-bottom: 24px;
}

.summary-card {
  min-height: 125px;

  border-radius: 18px;

  padding: 20px;

  display: flex;
  align-items: center;

  gap: 17px;

  border:
    1px solid rgba(0,0,0,.04);
}

.summary-card.subjects {
  background: #e7efff;
}

.summary-card.assignments {
  background: #fff1ca;
}

.summary-card.progress {
  background: #eee7ff;
}

.summary-card.completed {
  background: #def5eb;
}

.summary-icon {
  width: 50px;
  height: 50px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background:
    rgba(255,255,255,.75);

  font-size: 21px;
  font-weight: 800;
}

.summary-card span {
  display: block;

  margin-bottom: 5px;

  font-size: 9px;
  font-weight: 900;

  color: #53617a;
}

.summary-card strong {
  display: block;

  font-size: 28px;

  color: #17233b;
}

.summary-card p {
  margin: 4px 0 0;

  font-size: 9px;

  color: #8791a4;
}


/* ================= PANEL ================= */

.subject-panel {
  background: white;

  border:
    1px solid #e2e8f2;

  border-radius: 20px;

  padding: 24px;

  box-shadow:
    0 12px 35px
    rgba(37, 54, 91, .05);
}

.panel-header {
  display: flex;

  justify-content:
    space-between;

  align-items: center;

  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;

  font-size: 20px;
  font-weight: 800;
}

.panel-header p {
  margin: 5px 0 0;

  color: #919bad;

  font-size: 11px;
}

.refresh-button {
  min-height: 42px;

  padding: 0 15px;

  border:
    1px solid #d8e1f0;

  border-radius: 11px;

  background: #f8faff;

  color: #2859df;

  cursor: pointer;

  font-size: 11px;
  font-weight: 800;
}


/* ================= SEARCH ================= */

.search-box {
  width: 100%;

  min-height: 48px;

  margin-bottom: 22px;

  border:
    1px solid #dce3ef;

  background: #fafcff;

  border-radius: 12px;

  display: flex;
  align-items: center;

  gap: 10px;

  padding: 0 15px;
}

.search-box span {
  color: #3769e8;

  font-size: 19px;
}

.search-box input {
  width: 100%;

  border: 0;
  outline: 0;

  background: transparent;

  color: #27334a;

  font-size: 13px;
}


/* ================= SUBJECT GRID ================= */

.subjects-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 16px;
}

.subject-card {
  border:
    1px solid #e1e7f0;

  border-radius: 17px;

  padding: 20px;

  background: white;

  transition: .2s;

  overflow: hidden;
}

.subject-card:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 28px
    rgba(31, 48, 84, .07);
}

.subject-card-top {
  display: flex;

  justify-content:
    space-between;

  align-items:
    flex-start;

  margin-bottom: 18px;
}

.subject-icon {
  width: 48px;
  height: 48px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #e6eeff,
      #f1f5ff
    );

  color: #3062e4;

  font-size: 16px;
  font-weight: 900;
}

.subject-count {
  padding: 7px 10px;

  border-radius: 20px;

  background: #f2f5fb;

  color: #66738a;

  font-size: 9px;
  font-weight: 800;
}

.subject-label {
  color: #3162e2;

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 1px;
}

.subject-info h3 {
  margin: 5px 0 6px;

  color: #17233b;

  font-size: 19px;
  font-weight: 850;

  word-break: break-word;
}

.subject-info p {
  margin: 0;

  color: #8a95a8;

  font-size: 10px;
}


/* ================= PROGRESS ================= */

.progress-section {
  margin-top: 20px;
}

.progress-heading {
  display: flex;

  justify-content:
    space-between;

  align-items: center;

  margin-bottom: 8px;

  font-size: 9px;

  color: #778399;
}

.progress-heading strong {
  color: #3062e4;

  font-size: 10px;
}

.progress-track {
  height: 7px;

  border-radius: 10px;

  background: #edf1f7;

  overflow: hidden;
}

.progress-fill {
  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      #3164e8,
      #16a487
    );

  transition: width .3s ease;
}


/* ================= MINI STATS ================= */

.subject-stats {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 8px;

  margin-top: 18px;
}

.mini-stat {
  min-height: 63px;

  padding: 10px;

  border-radius: 11px;

  display: flex;
  align-items: center;

  gap: 8px;
}

.mini-stat > span {
  font-size: 17px;
}

.mini-stat strong {
  display: block;

  color: #27334a;

  font-size: 14px;
}

.mini-stat small {
  display: block;

  margin-top: 2px;

  font-size: 7px;

  color: #7e899d;
}

.mini-stat.pending {
  background: #fff6dc;
}

.mini-stat.in-progress {
  background: #f0ebff;
}

.mini-stat.done {
  background: #e4f7ef;
}


/* ================= FOOTER ================= */

.subject-footer {
  margin-top: 18px;

  padding-top: 15px;

  border-top:
    1px solid #edf0f5;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 10px;
}

.attention,
.working,
.all-done {
  font-size: 9px;
  font-weight: 800;
}

.attention {
  color: #b17b05;
}

.working {
  color: #694fd3;
}

.all-done {
  color: #14845f;
}

.view-button {
  color: #3062e4;

  text-decoration: none;

  font-size: 9px;
  font-weight: 900;
}


/* ================= EMPTY ================= */

.empty-state {
  padding: 70px 20px;

  text-align: center;
}

.empty-icon {
  width: 60px;
  height: 60px;

  margin: 0 auto 15px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #edf3ff;

  color: #3163e2;

  font-size: 27px;
}

.empty-state h3 {
  margin: 0 0 7px;

  font-size: 17px;
}

.empty-state p {
  margin: 0 auto 17px;

  max-width: 380px;

  color: #8a95a8;

  font-size: 12px;

  line-height: 1.6;
}

.empty-button {
  display: inline-flex;

  padding: 12px 16px;

  border-radius: 10px;

  background: #3063e5;

  color: white;

  text-decoration: none;

  font-size: 11px;
  font-weight: 800;
}


/* ================= TOAST ================= */

.toast {
  position: fixed;

  right: 25px;
  bottom: 25px;

  z-index: 1000;

  padding: 13px 18px;

  border-radius: 11px;

  background: #17233b;

  color: white;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.15);

  font-size: 12px;
  font-weight: 700;
}


/* ================= MOBILE NAV ================= */

.mobile-nav {
  display: none;
}


/* ================= TABLET ================= */

@media (max-width: 1050px) {

  .sidebar {
    width: 205px;
  }

  .main-content {
    margin-left: 205px;

    padding:
      30px 25px 60px;
  }

  .summary-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


/* ================= MOBILE ================= */

@media (max-width: 760px) {

  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;

    padding:
      20px 15px 100px;
  }

  .mobile-header {
    display: block;

    margin-bottom: 25px;
  }

  .mobile-logo {
    display: flex;

    align-items: center;

    gap: 10px;
  }

  .small-logo {
    width: 37px;
    height: 37px;

    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #3062e4;

    color: white;

    font-size: 20px;
    font-weight: 900;
  }

  .mobile-logo strong {
    font-size: 15px;
  }

  .page-header {
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 29px;
  }

  .subtitle {
    font-size: 12px;
  }

  .add-button {
    display: none;
  }

  .summary-grid {
    grid-template-columns:
      repeat(2, 1fr);

    gap: 9px;
  }

  .summary-card {
    min-height: 100px;

    padding: 13px;

    gap: 10px;
  }

  .summary-icon {
    width: 38px;
    height: 38px;

    border-radius: 10px;

    font-size: 16px;
  }

  .summary-card strong {
    font-size: 22px;
  }

  .summary-card p {
    display: none;
  }

  .subject-panel {
    padding: 15px;

    border-radius: 16px;
  }

  .panel-header {
    align-items: flex-start;

    gap: 10px;
  }

  .panel-header h2 {
    font-size: 17px;
  }

  .refresh-button {
    min-height: 37px;

    padding: 0 10px;
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }

  .subject-card {
    padding: 16px;
  }

  .mobile-nav {
    position: fixed;

    left: 0;
    right: 0;
    bottom: 0;

    z-index: 100;

    display: grid;

    grid-template-columns:
      repeat(4, 1fr);

    background: white;

    border-top:
      1px solid #e2e7f0;

    padding:
      8px 4px
      calc(8px + env(safe-area-inset-bottom));

    box-shadow:
      0 -5px 20px
      rgba(20, 35, 65, .06);
  }

  .mobile-nav a {
    min-height: 52px;

    text-decoration: none;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 3px;

    color: #8a94a6;

    font-size: 9px;
    font-weight: 700;
  }

  .mobile-nav a span {
    font-size: 19px;
  }

  .mobile-nav .mobile-active {
    color: #2d61e4;
  }

  .mobile-nav .mobile-add span {
    width: 34px;
    height: 34px;

    margin-top: -20px;

    border-radius: 11px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #3062e4;

    color: white;

    box-shadow:
      0 6px 16px
      rgba(48,98,228,.25);
  }

  .toast {
    left: 15px;
    right: 15px;
    bottom: 85px;

    text-align: center;
  }

}


/* ================= VERY SMALL PHONE ================= */

@media (max-width: 380px) {

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 25px;
  }

  .subject-stats {
    grid-template-columns: 1fr;
  }

}

</style>