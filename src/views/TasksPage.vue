<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="app-shell">

        <!-- ================= NAVIGATION ================= -->
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

            <router-link to="/tasks" class="nav-item active">
              <span class="nav-icon">☷</span>
              My Tasks
            </router-link>

            <router-link to="/add-task" class="nav-item">
              <span class="nav-icon">＋</span>
              Add Task
            </router-link>

            <router-link to="/subjects" class="nav-item">
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

          <!-- MOBILE TOP BAR -->
          <div class="mobile-header">
            <div class="mobile-logo">
              <div class="small-logo">✓</div>
              <strong>Assignment Tracker</strong>
            </div>
          </div>

          <!-- PAGE HEADER -->
          <section class="page-header">
            <div>
              <p class="eyebrow">TASK MANAGEMENT</p>

              <h1>My Assignments</h1>

              <p class="subtitle">
                View, search, organize, and manage your academic tasks.
              </p>
            </div>

            <router-link to="/add-task" class="add-button">
              <span>＋</span>
              Add Assignment
            </router-link>
          </section>

          <!-- ================= STATS ================= -->
          <section class="stats-grid">

            <div class="stat-card total">
              <div class="stat-icon">▣</div>

              <div>
                <span class="stat-label">TOTAL TASKS</span>
                <strong>{{ assignments.length }}</strong>
                <p>All academic tasks</p>
              </div>
            </div>

            <div class="stat-card pending">
              <div class="stat-icon">◷</div>

              <div>
                <span class="stat-label">PENDING</span>
                <strong>{{ pendingCount }}</strong>
                <p>Need your attention</p>
              </div>
            </div>

            <div class="stat-card progress">
              <div class="stat-icon">↗</div>

              <div>
                <span class="stat-label">IN PROGRESS</span>
                <strong>{{ progressCount }}</strong>
                <p>Currently working</p>
              </div>
            </div>

            <div class="stat-card completed">
              <div class="stat-icon">✓</div>

              <div>
                <span class="stat-label">COMPLETED</span>
                <strong>{{ completedCount }}</strong>
                <p>Great work!</p>
              </div>
            </div>

          </section>

          <!-- ================= TASK CONTAINER ================= -->
          <section class="task-panel">

            <div class="panel-heading">
              <div>
                <h2>All Assignments</h2>

                <p>
                  Showing {{ filteredAssignments.length }}
                  of {{ assignments.length }} assignments
                </p>
              </div>

              <button
                class="refresh-button"
                @click="loadAssignments"
                :disabled="loading"
              >
                ↻
                {{ loading ? 'Loading...' : 'Refresh' }}
              </button>
            </div>

            <!-- ================= SEARCH ================= -->
            <div class="filter-row">

              <div class="search-box">
                <span>⌕</span>

                <input
                  v-model="searchText"
                  type="text"
                  placeholder="Search assignments..."
                />
              </div>

              <select v-model="statusFilter">
                <option value="All">
                  All Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <select v-model="priorityFilter">
                <option value="All">
                  All Priority
                </option>

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>

            </div>

            <!-- ================= LOADING ================= -->
            <div
              v-if="loading && assignments.length === 0"
              class="skeleton-list"
              aria-label="Loading assignments"
            >
              <article
                v-for="item in 3"
                :key="item"
                class="skeleton-card"
              >
                <div class="skeleton-main">
                  <div class="skeleton-badges">
                    <span class="skeleton-block skeleton-subject"></span>
                    <span class="skeleton-block skeleton-priority"></span>
                  </div>

                  <span class="skeleton-block skeleton-title"></span>
                  <span class="skeleton-block skeleton-note"></span>

                  <div class="skeleton-meta">
                    <span class="skeleton-block skeleton-date"></span>
                    <span class="skeleton-block skeleton-status"></span>
                  </div>

                  <span class="skeleton-block skeleton-action"></span>
                </div>

                <div class="skeleton-side">
                  <span class="skeleton-block skeleton-pill"></span>
                  <span class="skeleton-block skeleton-button"></span>
                  <span class="skeleton-block skeleton-button"></span>
                </div>
              </article>
            </div>

            <!-- ================= EMPTY ================= -->
            <div
              v-else-if="filteredAssignments.length === 0"
              class="empty-state"
            >
              <div class="empty-icon">▤</div>

              <h3>No assignments found</h3>

              <p v-if="assignments.length === 0">
                You don't have any assignments yet.
              </p>

              <p v-else>
                Try changing your search or filters.
              </p>

              <router-link
                v-if="assignments.length === 0"
                to="/add-task"
                class="empty-add"
              >
                ＋ Create your first task
              </router-link>
            </div>

            <!-- ================= TASK LIST ================= -->
            <div
              v-else
              class="task-list"
            >

              <article
                v-for="assignment in filteredAssignments"
                :key="assignment.id"
                class="task-card"
                :class="statusClass(assignment.status)"
              >

                <!-- LEFT -->
                <div class="task-main">

                  <div class="task-top">

                    <span class="subject-badge">
                      {{ assignment.subject }}
                    </span>

                    <span
                      class="priority-badge"
                      :class="assignment.priority.toLowerCase()"
                    >
                      ● {{ assignment.priority }}
                    </span>

                  </div>

                  <h3>
                    {{ assignment.title }}
                  </h3>

                  <p
                    v-if="assignment.notes"
                    class="notes"
                  >
                    {{ assignment.notes }}
                  </p>

                  <div class="task-meta">
                    <span>
                      ▦ {{ formatDeadline(assignment.deadline) }}
                    </span>

                    <span
                      v-if="deadlineInfo(assignment).show"
                      class="deadline-badge"
                      :class="deadlineInfo(assignment).className"
                    >
                      {{ deadlineInfo(assignment).label }}
                    </span>

                    <span
                      class="status-text"
                      :class="statusClass(assignment.status)"
                    >
                      {{ assignment.status }}
                    </span>
                  </div>

                  <!-- QUICK STATUS BUTTONS -->
                  <div class="quick-actions">

                    <button
                      v-if="assignment.status === 'Pending'"
                      class="start-button"
                      :disabled="statusUpdatingId === assignment.id"
                      @click="
                        updateAssignmentStatus(
                          assignment.id,
                          'In Progress'
                        )
                      "
                    >
                      ▶ Start Task
                    </button>

                    <button
                      v-if="assignment.status === 'In Progress'"
                      class="complete-button"
                      :disabled="statusUpdatingId === assignment.id"
                      @click="
                        updateAssignmentStatus(
                          assignment.id,
                          'Completed'
                        )
                      "
                    >
                      ✓ Mark Completed
                    </button>

                    <button
                      v-if="assignment.status === 'Completed'"
                      class="reopen-button"
                      :disabled="statusUpdatingId === assignment.id"
                      @click="
                        updateAssignmentStatus(
                          assignment.id,
                          'Pending'
                        )
                      "
                    >
                      ↶ Reopen Task
                    </button>

                  </div>

                </div>

                <!-- RIGHT -->
                <div class="task-actions">

                  <span
                    class="status-pill"
                    :class="statusClass(assignment.status)"
                  >
                    {{ assignment.status }}
                  </span>

                  <button
                    class="edit-button"
                    @click="openEditModal(assignment)"
                  >
                    ✎ Edit
                  </button>

                  <button
                    class="delete-button"
                    @click="
                      deleteAssignmentRecord(
                        assignment.id
                      )
                    "
                  >
                    × Delete
                  </button>

                </div>

              </article>

            </div>

          </section>

        </main>

        <!-- ================= EDIT ASSIGNMENT MODAL ================= -->
        <div
          v-if="showEditModal"
          class="modal-backdrop"
          @click.self="closeEditModal"
        >
          <div class="edit-modal">
            <div class="modal-header">
              <div>
                <p class="eyebrow">EDIT TASK</p>
                <h2>Edit Assignment</h2>
                <p>Update the details of your academic task.</p>
              </div>

              <button
                class="modal-close"
                type="button"
                @click="closeEditModal"
              >
                ×
              </button>
            </div>

            <form
              class="edit-form"
              @submit.prevent="saveEditedAssignment"
            >
              <label>
                <span>Subject *</span>
                <input
                  v-model.trim="editForm.subject"
                  type="text"
                  placeholder="Enter subject"
                  required
                />
              </label>

              <label>
                <span>Assignment Title *</span>
                <input
                  v-model.trim="editForm.title"
                  type="text"
                  placeholder="Enter assignment title"
                  required
                />
              </label>

              <div class="edit-form-row">
                <label>
                  <span>Deadline *</span>
                  <input
                    v-model="editForm.deadline"
                    type="date"
                    required
                  />
                </label>

                <label>
                  <span>Priority *</span>
                  <select
                    v-model="editForm.priority"
                    required
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Notes</span>
                <textarea
                  v-model.trim="editForm.notes"
                  rows="4"
                  placeholder="Add notes or instructions..."
                ></textarea>
              </label>

              <div class="modal-actions">
                <button
                  class="cancel-edit-button"
                  type="button"
                  :disabled="editSaving"
                  @click="closeEditModal"
                >
                  Cancel
                </button>

                <button
                  class="save-edit-button"
                  type="submit"
                  :disabled="editSaving"
                >
                  {{ editSaving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ================= MOBILE NAV ================= -->
        <nav class="mobile-nav">

          <router-link to="/home">
            <span>▦</span>
            Dashboard
          </router-link>

          <router-link
            to="/tasks"
            class="mobile-active"
          >
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

          <router-link to="/subjects">
            <span>▤</span>
            Subjects
          </router-link>

        </nav>

        <!-- TOAST -->
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
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc
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


const assignments =
  ref<Assignment[]>([]);


const loading =
  ref(false);


const statusUpdatingId =
  ref('');


const searchText =
  ref('');


const statusFilter =
  ref('All');


const priorityFilter =
  ref('All');


const toastMessage =
  ref('');


const showEditModal =
  ref(false);


const editSaving =
  ref(false);


const editingAssignmentId =
  ref('');


const editForm =
  ref({
    subject: '',
    title: '',
    deadline: '',
    priority: 'Medium',
    notes: ''
  });



/* ========================================
   EDIT ASSIGNMENT
======================================== */

const openEditModal =
  (assignment: Assignment) => {

    editingAssignmentId.value =
      assignment.id;

    editForm.value = {
      subject:
        assignment.subject,

      title:
        assignment.title,

      deadline:
        assignment.deadline,

      priority:
        assignment.priority,

      notes:
        assignment.notes
    };

    showEditModal.value =
      true;

  };


const closeEditModal =
  () => {

    if (editSaving.value) {
      return;
    }

    showEditModal.value =
      false;

    editingAssignmentId.value =
      '';

  };


const saveEditedAssignment =
  async () => {

    const id =
      editingAssignmentId.value;

    if (!id) {
      return;
    }

    if (
      !editForm.value.subject ||
      !editForm.value.title ||
      !editForm.value.deadline ||
      !editForm.value.priority
    ) {

      showToast(
        'Please complete all required fields.'
      );

      return;

    }

    try {

      editSaving.value =
        true;

      const updatedData = {
        subject:
          editForm.value.subject,

        title:
          editForm.value.title,

        deadline:
          editForm.value.deadline,

        priority:
          editForm.value.priority,

        notes:
          editForm.value.notes
      };

      await updateDoc(
        doc(
          db,
          'assignments',
          id
        ),
        updatedData
      );

      const assignment =
        assignments.value.find(
          (item) =>
            item.id === id
        );

      if (assignment) {

        assignment.subject =
          updatedData.subject;

        assignment.title =
          updatedData.title;

        assignment.deadline =
          updatedData.deadline;

        assignment.priority =
          updatedData.priority;

        assignment.notes =
          updatedData.notes;

      }

      showEditModal.value =
        false;

      editingAssignmentId.value =
        '';

      showToast(
        'Assignment updated successfully.'
      );

    }

    catch (error) {

      console.error(
        'Update assignment failed:',
        error
      );

      showToast(
        'Unable to update assignment.'
      );

    }

    finally {

      editSaving.value =
        false;

    }

  };



/* ========================================
   TOAST
======================================== */

const showToast =
  (message: string) => {

    toastMessage.value =
      message;


    setTimeout(() => {

      toastMessage.value =
        '';

    }, 2500);

  };



/* ========================================
   LOAD ASSIGNMENTS
======================================== */

const loadAssignments =
  async () => {

    try {

      loading.value =
        true;


      const assignmentQuery =
        query(

          collection(
            db,
            'assignments'
          ),

          orderBy(
            'createdAt',
            'desc'
          )

        );


      const snapshot =
        await getDocs(
          assignmentQuery
        );


      assignments.value =
        snapshot.docs.map(
          (document) => {

            const data =
              document.data();


            return {

              id:
                document.id,

              subject:
                data.subject ?? '',

              title:
                data.title ?? '',

              deadline:
                data.deadline ?? '',

              status:
                data.status ??
                'Pending',

              priority:
                data.priority ??
                'Medium',

              notes:
                data.notes ?? ''

            };

          }
        );

    }


    catch (error) {

      console.error(
        'Ordered query failed:',
        error
      );


      /*
        Fallback in case Firestore
        ordering is unavailable.
      */

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              'assignments'
            )

          );


        assignments.value =
          snapshot.docs.map(
            (document) => {

              const data =
                document.data();


              return {

                id:
                  document.id,

                subject:
                  data.subject ?? '',

                title:
                  data.title ?? '',

                deadline:
                  data.deadline ?? '',

                status:
                  data.status ??
                  'Pending',

                priority:
                  data.priority ??
                  'Medium',

                notes:
                  data.notes ?? ''

              };

            }
          );

      }


      catch (secondError) {

        console.error(
          'Loading assignments failed:',
          secondError
        );


        showToast(
          'Unable to load assignments.'
        );

      }

    }


    finally {

      loading.value =
        false;

    }

  };



/* ========================================
   UPDATE STATUS
======================================== */

const updateAssignmentStatus =
  async (
    assignmentId: string,
    newStatus: string
  ) => {

    if (
      statusUpdatingId.value
    ) {

      return;

    }


    try {

      statusUpdatingId.value =
        assignmentId;


      await updateDoc(

        doc(
          db,
          'assignments',
          assignmentId
        ),

        {
          status:
            newStatus
        }

      );


      const assignment =
        assignments.value.find(
          (item) =>
            item.id ===
            assignmentId
        );


      if (assignment) {

        assignment.status =
          newStatus;

      }


      if (
        newStatus ===
        'In Progress'
      ) {

        showToast(
          'Task is now in progress.'
        );

      }

      else if (
        newStatus ===
        'Completed'
      ) {

        showToast(
          'Task completed! Great work.'
        );

      }

      else {

        showToast(
          'Task reopened successfully.'
        );

      }

    }


    catch (error) {

      console.error(
        'Status update failed:',
        error
      );


      showToast(
        'Unable to update task status.'
      );

    }


    finally {

      statusUpdatingId.value =
        '';

    }

  };



/* ========================================
   DELETE
======================================== */

const deleteAssignmentRecord =
  async (
    id: string
  ) => {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this assignment?'
      );


    if (!confirmed) {

      return;

    }


    try {

      loading.value =
        true;


      await deleteDoc(

        doc(
          db,
          'assignments',
          id
        )

      );


      assignments.value =
        assignments.value.filter(
          (assignment) =>
            assignment.id !== id
        );


      showToast(
        'Assignment deleted successfully.'
      );

    }


    catch (error) {

      console.error(
        'Delete failed:',
        error
      );


      showToast(
        'Unable to delete assignment.'
      );

    }


    finally {

      loading.value =
        false;

    }

  };



/* ========================================
   SEARCH + FILTER
======================================== */

const filteredAssignments =
  computed(() => {

    const search =
      searchText.value
        .toLowerCase()
        .trim();


    return assignments.value.filter(
      (assignment) => {

        const matchesSearch =

          assignment.subject
            .toLowerCase()
            .includes(search)

          ||

          assignment.title
            .toLowerCase()
            .includes(search)

          ||

          assignment.notes
            .toLowerCase()
            .includes(search);


        const matchesStatus =

          statusFilter.value ===
            'All'

          ||

          assignment.status ===
            statusFilter.value;


        const matchesPriority =

          priorityFilter.value ===
            'All'

          ||

          assignment.priority ===
            priorityFilter.value;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority
        );

      }
    );

  });



/* ========================================
   COUNTERS
======================================== */

const pendingCount =
  computed(() => {

    return assignments.value.filter(
      (item) =>
        item.status ===
        'Pending'
    ).length;

  });


const progressCount =
  computed(() => {

    return assignments.value.filter(
      (item) =>
        item.status ===
        'In Progress'
    ).length;

  });


const completedCount =
  computed(() => {

    return assignments.value.filter(
      (item) =>
        item.status ===
        'Completed'
    ).length;

  });



/* ========================================
   HELPERS
======================================== */

const statusClass =
  (status: string) => {

    if (
      status ===
      'Completed'
    ) {

      return 'completed-status';

    }


    if (
      status ===
      'In Progress'
    ) {

      return 'progress-status';

    }


    return 'pending-status';

  };


const deadlineInfo =
  (assignment: Assignment) => {

    if (
      !assignment.deadline ||
      assignment.status === 'Completed'
    ) {
      return {
        show: false,
        label: '',
        className: ''
      };
    }

    const deadline =
      new Date(
        `${assignment.deadline}T00:00:00`
      );

    if (
      Number.isNaN(
        deadline.getTime()
      )
    ) {
      return {
        show: false,
        label: '',
        className: ''
      };
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    deadline.setHours(
      0,
      0,
      0,
      0
    );

    const oneDay =
      1000 * 60 * 60 * 24;

    const daysLeft =
      Math.round(
        (
          deadline.getTime() -
          today.getTime()
        ) / oneDay
      );

    if (daysLeft < 0) {
      return {
        show: true,
        label: 'Overdue',
        className: 'deadline-overdue'
      };
    }

    if (daysLeft === 0) {
      return {
        show: true,
        label: 'Due Today',
        className: 'deadline-today'
      };
    }

    if (daysLeft === 1) {
      return {
        show: true,
        label: 'Due Tomorrow',
        className: 'deadline-tomorrow'
      };
    }

    if (daysLeft <= 3) {
      return {
        show: true,
        label: `${daysLeft} Days Left`,
        className: 'deadline-soon'
      };
    }

    return {
      show: false,
      label: '',
      className: ''
    };

  };


const formatDeadline =
  (deadline: string) => {

    if (!deadline) {

      return 'No deadline';

    }


    const date =
      new Date(
        `${deadline}T00:00:00`
      );


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return deadline;

    }


    return date.toLocaleDateString(
      'en-US',
      {
        month:
          'short',

        day:
          'numeric',

        year:
          'numeric'
      }
    );

  };



onMounted(() => {

  loadAssignments();

});

</script>


<style scoped>

/* ========================================
   GLOBAL
======================================== */

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
  font-family:
    Inter,
    Arial,
    sans-serif;
}


/* ========================================
   SIDEBAR
======================================== */

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


/* ========================================
   MAIN
======================================== */

.main-content {
  margin-left: 245px;

  padding:
    42px 44px 70px;

  max-width:
    1700px;
}


.mobile-header {
  display: none;
}


.page-header {
  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap: 20px;

  margin-bottom:
    30px;
}


.eyebrow {
  margin:
    0 0 8px;

  color: #2d63e6;

  font-size: 11px;

  font-weight: 900;

  letter-spacing:
    1.2px;
}


.page-header h1 {
  margin: 0;

  font-size: 38px;

  line-height: 1.1;

  font-weight: 850;

  color: #17233b;
}


.subtitle {
  margin:
    10px 0 0;

  color: #7b879b;

  font-size: 14px;
}


.add-button {
  min-height: 48px;

  padding:
    0 20px;

  border-radius:
    13px;

  display: flex;

  align-items: center;

  justify-content:
    center;

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


/* ========================================
   STATS
======================================== */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;

  margin-bottom:
    24px;
}


.stat-card {
  min-height: 130px;

  border-radius:
    18px;

  padding: 20px;

  display: flex;

  align-items:
    center;

  gap: 17px;

  border:
    1px solid
    rgba(0, 0, 0, .04);
}


.stat-card.total {
  background: #e7efff;
}


.stat-card.pending {
  background: #fff1ca;
}


.stat-card.progress {
  background: #eee7ff;
}


.stat-card.completed {
  background: #def5eb;
}


.stat-icon {
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


.stat-label {
  display: block;

  margin-bottom: 5px;

  font-size: 9px;

  font-weight: 900;

  color: #53617a;
}


.stat-card strong {
  display: block;

  font-size: 28px;

  color: #17233b;
}


.stat-card p {
  margin:
    4px 0 0;

  font-size: 9px;

  color: #8791a4;
}


/* ========================================
   TASK PANEL
======================================== */

.task-panel {
  background: white;

  border:
    1px solid #e2e8f2;

  border-radius:
    20px;

  padding: 24px;

  box-shadow:
    0 12px 35px
    rgba(37, 54, 91, .05);
}


.panel-heading {
  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  margin-bottom:
    20px;
}


.panel-heading h2 {
  margin: 0;

  font-size: 20px;

  font-weight: 800;
}


.panel-heading p {
  margin:
    5px 0 0;

  font-size: 11px;

  color: #919bad;
}


.refresh-button {
  border:
    1px solid #d8e1f0;

  background: #f8faff;

  color: #2859df;

  min-height: 42px;

  padding:
    0 15px;

  border-radius:
    11px;

  cursor: pointer;

  font-size: 11px;

  font-weight: 800;
}


/* ========================================
   FILTER
======================================== */

.filter-row {
  display: grid;

  grid-template-columns:
    1fr 170px 170px;

  gap: 10px;

  margin-bottom:
    20px;
}


.search-box {
  min-height: 48px;

  border:
    1px solid #dce3ef;

  background: #fafcff;

  border-radius:
    12px;

  display: flex;

  align-items:
    center;

  gap: 10px;

  padding:
    0 15px;
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


.filter-row select {
  border:
    1px solid #dce3ef;

  border-radius:
    12px;

  background: #fafcff;

  padding:
    0 13px;

  color: #3e4b62;

  font-weight: 700;

  outline: none;
}


/* ========================================
   TASK CARD
======================================== */

.task-list {
  display: flex;

  flex-direction: column;

  gap: 12px;
}


.task-card {
  position: relative;

  display: flex;

  justify-content:
    space-between;

  gap: 20px;

  padding: 19px;

  border:
    1px solid #e1e7f0;

  border-radius:
    15px;

  background: white;

  overflow: hidden;

  transition: .2s;
}


.task-card:hover {
  transform:
    translateY(-1px);

  box-shadow:
    0 8px 24px
    rgba(32, 49, 84, .06);
}


.task-card::before {
  content: '';

  position: absolute;

  left: 0;
  top: 0;
  bottom: 0;

  width: 4px;
}


.task-card.pending-status::before {
  background: #efb52b;
}


.task-card.progress-status::before {
  background: #7659e7;
}


.task-card.completed-status::before {
  background: #18a276;
}


.task-main {
  flex: 1;

  min-width: 0;
}


.task-top {
  display: flex;

  flex-wrap: wrap;

  gap: 7px;

  align-items: center;

  margin-bottom: 9px;
}


.subject-badge {
  padding:
    5px 9px;

  border-radius:
    20px;

  background: #eaf1ff;

  color: #3163e2;

  font-size: 9px;

  font-weight: 800;
}


.priority-badge {
  padding:
    5px 9px;

  border-radius:
    20px;

  font-size: 9px;

  font-weight: 800;
}


.priority-badge.high {
  background: #ffe5e9;

  color: #c43b52;
}


.priority-badge.medium {
  background: #fff0c4;

  color: #a87408;
}


.priority-badge.low {
  background: #e2f6ee;

  color: #148660;
}


.task-main h3 {
  margin:
    0 0 5px;

  font-size: 16px;

  font-weight: 800;

  color: #1d2940;
}


.notes {
  margin:
    0 0 10px;

  font-size: 11px;

  color: #7f8a9d;
}


.task-meta {
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  gap: 12px;

  padding-bottom:
    12px;

  border-bottom:
    1px solid #edf0f5;

  color: #7c879a;

  font-size: 10px;
}


.status-text {
  font-weight: 800;
}


.status-text.pending-status {
  color: #ad7900;
}


.status-text.progress-status {
  color: #6648d4;
}


.status-text.completed-status {
  color: #13845f;
}


.deadline-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 23px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9px;
  line-height: 1;
  font-weight: 900;
  white-space: nowrap;
}

.deadline-overdue {
  background: #ffe4e8;
  color: #c7374d;
}

.deadline-today {
  background: #ffe4e8;
  color: #c7374d;
}

.deadline-tomorrow {
  background: #fff0cd;
  color: #a76f05;
}

.deadline-soon {
  background: #e8f0ff;
  color: #2d61e4;
}


/* ========================================
   QUICK ACTION
======================================== */

.quick-actions {
  margin-top:
    11px;

  display: flex;

  gap: 8px;
}


.quick-actions button {
  min-height: 35px;

  padding:
    0 13px;

  border: 0;

  border-radius:
    9px;

  cursor: pointer;

  font-size: 10px;

  font-weight: 800;
}


.start-button {
  background: #eee9ff;

  color: #6349cf;
}


.complete-button {
  background: #ddf5eb;

  color: #13835e;
}


.reopen-button {
  background: #f6f8fc;

  color: #5d687b;

  border:
    1px solid #dce3ed !important;
}


/* ========================================
   RIGHT ACTIONS
======================================== */

.task-actions {
  display: flex;

  align-items:
    flex-start;

  gap: 8px;
}


.status-pill {
  min-width: 86px;

  min-height: 38px;

  padding:
    0 12px;

  border-radius:
    22px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 9px;

  font-weight: 900;
}


.status-pill.pending-status {
  background: #fff0c5;

  color: #9d7109;
}


.status-pill.progress-status {
  background: #eee8ff;

  color: #644bd0;
}


.status-pill.completed-status {
  background: #dcf4e9;

  color: #11825d;
}


.delete-button {
  min-height: 38px;

  padding:
    0 13px;

  border:
    1px solid #f2cdd3;

  border-radius:
    10px;

  background: #fffafb;

  color: #d1485c;

  font-size: 10px;

  font-weight: 800;

  cursor: pointer;
}


/* ========================================
   EDIT BUTTON + MODAL
======================================== */

.edit-button {
  min-height: 38px;
  padding: 0 13px;
  border: 1px solid #cfdcf8;
  border-radius: 10px;
  background: #f5f8ff;
  color: #2d61e4;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.edit-button:hover {
  background: #eaf1ff;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  padding: 20px;
  background: rgba(19, 31, 55, .42);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}

.edit-modal {
  width: min(620px, 100%);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: white;
  border: 1px solid #e2e8f2;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 24px 70px rgba(20, 35, 65, .22);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #edf0f5;
}

.modal-header h2 {
  margin: 0;
  color: #17233b;
  font-size: 24px;
  font-weight: 850;
}

.modal-header p:not(.eyebrow) {
  margin: 7px 0 0;
  color: #8791a4;
  font-size: 12px;
}

.modal-close {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border: 1px solid #dce3ed;
  border-radius: 10px;
  background: #f8faff;
  color: #5d687b;
  font-size: 23px;
  cursor: pointer;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
}

.edit-form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.edit-form label > span {
  color: #344159;
  font-size: 11px;
  font-weight: 800;
}

.edit-form input,
.edit-form select,
.edit-form textarea {
  width: 100%;
  border: 1px solid #dce3ef;
  border-radius: 12px;
  background: #fafcff;
  color: #27334a;
  outline: none;
  font-family: inherit;
  font-size: 13px;
}

.edit-form input,
.edit-form select {
  min-height: 48px;
  padding: 0 14px;
}

.edit-form textarea {
  min-height: 110px;
  padding: 13px 14px;
  resize: vertical;
}

.edit-form input:focus,
.edit-form select:focus,
.edit-form textarea:focus {
  border-color: #5f86ed;
  box-shadow: 0 0 0 3px rgba(48, 98, 228, .08);
}

.edit-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
}

.cancel-edit-button,
.save-edit-button {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 11px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.cancel-edit-button {
  border: 1px solid #dce3ed;
  background: #f8faff;
  color: #5d687b;
}

.save-edit-button {
  border: 0;
  background: linear-gradient(135deg, #2857df, #3978ef);
  color: white;
  box-shadow: 0 8px 20px rgba(40, 87, 223, .18);
}

.cancel-edit-button:disabled,
.save-edit-button:disabled {
  opacity: .6;
  cursor: not-allowed;
}


/* ========================================
   SKELETON LOADING
======================================== */

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  min-height: 150px;
  padding: 19px;
  overflow: hidden;
  border: 1px solid #e6ebf3;
  border-radius: 15px;
  background: #ffffff;
}

.skeleton-main {
  flex: 1;
  min-width: 0;
}

.skeleton-badges,
.skeleton-meta,
.skeleton-side {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skeleton-badges {
  margin-bottom: 13px;
}

.skeleton-meta {
  margin-top: 13px;
  padding-bottom: 13px;
  border-bottom: 1px solid #f0f2f6;
}

.skeleton-side {
  align-items: flex-start;
}

.skeleton-block {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 8px;
  background: #edf1f6;
}

.skeleton-block::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, .8),
    transparent
  );
  animation: skeleton-shimmer 1.25s infinite;
}

.skeleton-subject {
  width: 78px;
  height: 22px;
  border-radius: 20px;
}

.skeleton-priority {
  width: 62px;
  height: 22px;
  border-radius: 20px;
}

.skeleton-title {
  width: min(330px, 72%);
  height: 18px;
  margin-bottom: 9px;
}

.skeleton-note {
  width: min(460px, 90%);
  height: 11px;
}

.skeleton-date {
  width: 115px;
  height: 12px;
}

.skeleton-status {
  width: 72px;
  height: 12px;
}

.skeleton-action {
  width: 105px;
  height: 35px;
  margin-top: 11px;
}

.skeleton-pill {
  width: 86px;
  height: 38px;
  border-radius: 22px;
}

.skeleton-button {
  width: 65px;
  height: 38px;
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* ========================================
   EMPTY
======================================== */

.empty-state {
  padding:
    70px 20px;

  text-align: center;
}


.empty-icon {
  width: 60px;
  height: 60px;

  margin:
    0 auto 15px;

  border-radius:
    18px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #edf3ff;

  color: #3163e2;

  font-size: 27px;
}


.empty-state h3 {
  margin:
    0 0 7px;

  font-size: 17px;
}


.empty-state p {
  margin:
    0 0 17px;

  color: #8a95a8;

  font-size: 12px;
}


.empty-add {
  display: inline-flex;

  padding:
    12px 16px;

  border-radius:
    10px;

  background: #3063e5;

  color: white;

  text-decoration: none;

  font-size: 11px;

  font-weight: 800;
}


/* ========================================
   TOAST
======================================== */

.toast {
  position: fixed;

  right: 25px;
  bottom: 25px;

  z-index: 1000;

  padding:
    13px 18px;

  border-radius:
    11px;

  background: #17233b;

  color: white;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.15);

  font-size: 12px;

  font-weight: 700;
}


/* ========================================
   MOBILE NAV
======================================== */

.mobile-nav {
  display: none;
}


/* ========================================
   TABLET
======================================== */

@media (max-width: 1050px) {

  .sidebar {
    width: 205px;
  }


  .main-content {
    margin-left:
      205px;

    padding:
      30px 25px 60px;
  }


  .stats-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .filter-row {
    grid-template-columns:
      1fr 145px 145px;
  }

}


/* ========================================
   MOBILE
======================================== */

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

    border-radius:
      10px;

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
    align-items:
      flex-start;
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


  .stats-grid {
    grid-template-columns:
      repeat(2, 1fr);

    gap: 9px;
  }


  .stat-card {
    min-height: 100px;

    padding: 13px;

    gap: 10px;
  }


  .stat-icon {
    width: 38px;
    height: 38px;

    border-radius:
      10px;

    font-size: 16px;
  }


  .stat-card strong {
    font-size: 22px;
  }


  .stat-card p {
    display: none;
  }


  .task-panel {
    padding: 15px;

    border-radius:
      16px;
  }


  .panel-heading {
    align-items:
      flex-start;

    gap: 10px;
  }


  .panel-heading h2 {
    font-size: 17px;
  }


  .refresh-button {
    min-height: 37px;

    padding:
      0 10px;
  }


  .filter-row {
    grid-template-columns:
      1fr;
  }


  .filter-row select {
    min-height: 45px;
  }


  .task-card {
    flex-direction:
      column;

    padding: 16px;
  }


  .task-actions {
    justify-content:
      space-between;

    border-top:
      1px solid #edf0f5;

    padding-top:
      12px;
  }


  .status-pill {
    min-height: 36px;
  }


  .quick-actions button {
    width: 100%;
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


  .skeleton-card {
    min-height: 175px;
    flex-direction: column;
    padding: 16px;
  }

  .skeleton-side {
    padding-top: 12px;
    border-top: 1px solid #f0f2f6;
  }

  .skeleton-title {
    width: 72%;
  }

  .skeleton-note {
    width: 92%;
  }


  .toast {
    left: 15px;
    right: 15px;
    bottom: 85px;

    text-align: center;
  }


  .modal-backdrop {
    padding: 12px;
    align-items: flex-end;
  }


  .edit-modal {
    max-height: 88vh;
    padding: 20px 16px;
    border-radius: 20px 20px 14px 14px;
  }


  .modal-header h2 {
    font-size: 21px;
  }


  .edit-form-row {
    grid-template-columns: 1fr;
  }


  .modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }


  .cancel-edit-button,
  .save-edit-button {
    width: 100%;
  }

}


/* ========================================
   VERY SMALL PHONE
======================================== */

@media (max-width: 380px) {

  .stats-grid {
    grid-template-columns:
      1fr;
  }


  .page-header h1 {
    font-size: 25px;
  }

}

</style>