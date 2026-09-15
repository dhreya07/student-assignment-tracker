<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="app-shell">

        <!-- ==================================================
             HEADER
        =================================================== -->
        <header class="app-header">
          <div class="brand-area">
            <div class="brand-logo">✓</div>

            <div class="brand-copy">
              <h1>
                Assignment <span>Tracker</span>
              </h1>

              <p>
                Student Productivity Dashboard
              </p>
            </div>
          </div>

          <div class="header-date">
            <div class="date-icon">▦</div>

            <div>
              <span>{{ currentDay }}</span>
              <strong>{{ currentDateLabel }}</strong>
            </div>
          </div>
        </header>


        <!-- ==================================================
             HERO
        =================================================== -->
        <section class="hero-section">

          <div class="hero-copy">

            <div class="hero-label">
              <span>◆</span>
              BUILT FOR STUDENTS
            </div>

            <h2>
              Plan Smarter.
              <span>Stay Ahead.</span>
            </h2>

            <p>
              Organize assignments, set priorities, track deadlines,
              and stay on top of your academic tasks—all in one place.
            </p>


            <div class="hero-features">

              <span class="feature blue-feature">
                <span>★</span>
                Smart Priority
              </span>

              <span class="feature teal-feature">
                <span>✓</span>
                Stay Organized
              </span>

              <span class="feature amber-feature">
                <span>◷</span>
                Track Deadlines
              </span>

              <span class="feature violet-feature">
                <span>▣</span>
                Study Better
              </span>

            </div>

          </div>


          <!-- MINI APPLICATION PREVIEW -->
          <div class="hero-preview">

            <div class="preview-decoration decoration-one"></div>
            <div class="preview-decoration decoration-two"></div>

            <div class="preview-window">

              <div class="preview-topbar">

                <div>
                  <span class="preview-label">
                    TODAY
                  </span>

                  <strong>
                    My Tasks
                  </strong>
                </div>

                <div class="preview-count">
                  {{ assignments.length }}
                </div>

              </div>


              <div class="preview-progress">

                <div class="preview-progress-info">

                  <span>
                    Overall progress
                  </span>

                  <strong>
                    {{ completionPercentage }}%
                  </strong>

                </div>


                <div class="progress-track">

                  <div
                    class="progress-fill"
                    :style="{
                      width: completionPercentage + '%'
                    }"
                  ></div>

                </div>

              </div>


              <div class="preview-task preview-task-blue">

                <div class="preview-checkbox">
                  ✓
                </div>

                <div>
                  <strong>
                    Stay organized
                  </strong>

                  <small>
                    Manage your schoolwork
                  </small>
                </div>

              </div>


              <div class="preview-task preview-task-yellow">

                <div class="preview-checkbox">
                  ◷
                </div>

                <div>
                  <strong>
                    Meet deadlines
                  </strong>

                  <small>
                    Track important tasks
                  </small>
                </div>

              </div>


              <div class="preview-task preview-task-green">

                <div class="preview-checkbox">
                  ★
                </div>

                <div>
                  <strong>
                    Reach your goals
                  </strong>

                  <small>
                    One task at a time
                  </small>
                </div>

              </div>

            </div>

          </div>

        </section>


        <!-- ==================================================
             STATS
        =================================================== -->
        <section class="stats-grid">

          <div class="stat-card stat-blue">

            <div class="stat-icon blue-icon">
              ▣
            </div>

            <div class="stat-content">

              <span class="stat-label">
                TOTAL ASSIGNMENTS
              </span>

              <strong class="stat-number">
                {{ assignments.length }}
              </strong>

              <small>
                All academic tasks
              </small>

            </div>

          </div>


          <div class="stat-card stat-yellow">

            <div class="stat-icon yellow-icon">
              ◷
            </div>

            <div class="stat-content">

              <span class="stat-label">
                PENDING
              </span>

              <strong class="stat-number">
                {{ pendingCount }}
              </strong>

              <small>
                Need your attention
              </small>

            </div>

          </div>


          <div class="stat-card stat-purple">

            <div class="stat-icon purple-icon">
              ↗
            </div>

            <div class="stat-content">

              <span class="stat-label">
                IN PROGRESS
              </span>

              <strong class="stat-number">
                {{ progressCount }}
              </strong>

              <small>
                Currently working
              </small>

            </div>

          </div>


          <div class="stat-card stat-green">

            <div class="stat-icon green-icon">
              ✓
            </div>

            <div class="stat-content">

              <span class="stat-label">
                COMPLETED
              </span>

              <strong class="stat-number">
                {{ completedCount }}
              </strong>

              <small>
                Great work
              </small>

            </div>

          </div>

        </section>


        <!-- ==================================================
             MOTIVATION
        =================================================== -->
        <section class="motivation-banner">

          <div class="motivation-icon">
            ★
          </div>

          <div class="motivation-copy">

            <strong>
              Stay Organized. Save Time. Achieve More.
            </strong>

            <p>
              Small progress every day leads to bigger results.
            </p>

          </div>

          <div class="motivation-decoration">
            ✦
          </div>

        </section>


        <!-- ==================================================
             WORKSPACE
        =================================================== -->
        <section class="workspace">


          <!-- ==================================================
               ADD / EDIT FORM
          =================================================== -->
          <div class="app-panel form-panel">

            <div class="panel-header">

              <div class="panel-heading">

                <div class="panel-icon primary-panel-icon">
                  {{ isEditing ? '✎' : '+' }}
                </div>

                <div>

                  <h2>
                    {{
                      isEditing
                        ? 'Edit Assignment'
                        : 'Add Assignment'
                    }}
                  </h2>

                  <p>
                    {{
                      isEditing
                        ? 'Update your assignment details.'
                        : 'Create a new academic task.'
                    }}
                  </p>

                </div>

              </div>

            </div>


            <form @submit.prevent="saveAssignment">


              <!-- SUBJECT -->
              <div class="form-group">

                <label>
                  Subject
                  <span>*</span>
                </label>

                <div class="input-wrapper">

                  <div class="input-icon">
                    ▣
                  </div>

                  <ion-input
                    v-model="form.subject"
                  ></ion-input>

                </div>

              </div>


              <!-- TITLE -->
              <div class="form-group">

                <label>
                  Assignment Title
                  <span>*</span>
                </label>

                <div class="input-wrapper">

                  <div class="input-icon">
                    ✎
                  </div>

                  <ion-input
                    v-model="form.title"
                  ></ion-input>

                </div>

              </div>


              <!-- DEADLINE -->
              <div class="form-group">

                <label>
                  Deadline
                  <span>*</span>
                </label>

                <div class="input-wrapper">

                  <div class="input-icon">
                    ▦
                  </div>

                  <ion-input
                    v-model="form.deadline"
                    type="date"
                  ></ion-input>

                </div>

              </div>


              <!-- PRIORITY -->
              <div class="form-group">

                <label>
                  Priority
                  <span>*</span>
                </label>

                <div class="input-wrapper">

                  <div class="input-icon">
                    ⚡
                  </div>

                  <ion-select
                    v-model="form.priority"
                    interface="popover"
                  >

                    <ion-select-option value="Low">
                      Low
                    </ion-select-option>

                    <ion-select-option value="Medium">
                      Medium
                    </ion-select-option>

                    <ion-select-option value="High">
                      High
                    </ion-select-option>

                  </ion-select>

                </div>

              </div>


              <!-- CURRENT STATUS WHEN EDITING -->
              <div
                v-if="isEditing"
                class="current-status-info"
              >

                <span>
                  Current Status
                </span>

                <strong
                  :class="
                    statusClass(
                      form.status
                    )
                  "
                >
                  {{ form.status }}
                </strong>

                <small>
                  Change the status directly from the assignment card.
                </small>

              </div>


              <!-- NOTES -->
              <div class="form-group">

                <label>
                  Notes
                </label>

                <div class="input-wrapper textarea-wrapper">

                  <div class="input-icon textarea-icon">
                    ✎
                  </div>

                  <ion-textarea
                    v-model="form.notes"
                    :auto-grow="true"
                  ></ion-textarea>

                </div>

              </div>


              <!-- SAVE -->
              <button
                type="submit"
                class="main-button"
                :disabled="loading"
              >

                <span class="button-icon">
                  {{ isEditing ? '✓' : '+' }}
                </span>

                {{
                  isEditing
                    ? 'Update Assignment'
                    : 'Add Assignment'
                }}

              </button>


              <!-- CANCEL -->
              <button
                v-if="isEditing"
                type="button"
                class="cancel-button"
                @click="cancelEdit"
              >
                Cancel Editing
              </button>

            </form>

          </div>


          <!-- ==================================================
               ASSIGNMENTS
          =================================================== -->
          <div class="app-panel assignments-panel">


            <!-- PANEL HEADER -->
            <div class="assignments-heading">

              <div class="panel-heading">

                <div class="panel-icon secondary-panel-icon">
                  ☷
                </div>

                <div>

                  <h2>
                    My Assignments
                  </h2>

                  <p>
                    View and manage your academic tasks.
                  </p>

                </div>

              </div>


              <button
                class="refresh-button"
                @click="loadAssignments"
                :disabled="loading"
              >
                <span>↻</span>
                Refresh
              </button>

            </div>


            <!-- ==================================================
                 SEARCH AND FILTER
            =================================================== -->
            <div class="toolbar">


              <div class="search-control">

                <span class="search-icon">
                  ⌕
                </span>

                <input
                  v-model="searchText"
                  type="text"
                  placeholder="Search assignments..."
                />

              </div>


              <div class="filter-control">

                <select
                  v-model="statusFilter"
                >

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

              </div>


              <div class="filter-control">

                <select
                  v-model="priorityFilter"
                >

                  <option value="All">
                    All Priority
                  </option>

                  <option value="High">
                    High Priority
                  </option>

                  <option value="Medium">
                    Medium Priority
                  </option>

                  <option value="Low">
                    Low Priority
                  </option>

                </select>

              </div>

            </div>


            <!-- RESULT COUNT -->
            <div
              v-if="
                !loading &&
                assignments.length > 0
              "
              class="results-info"
            >

              Showing

              <strong>
                {{ filteredAssignments.length }}
              </strong>

              of

              <strong>
                {{ assignments.length }}
              </strong>

              assignments

            </div>


            <!-- ==================================================
                 LOADING
            =================================================== -->
            <div
              v-if="loading"
              class="state-container"
            >

              <div class="loader"></div>

              <h3>
                Loading assignments
              </h3>

              <p>
                Getting your latest tasks...
              </p>

            </div>


            <!-- ==================================================
                 EMPTY
            =================================================== -->
            <div
              v-else-if="
                filteredAssignments.length === 0
              "
              class="state-container"
            >

              <div class="state-icon">
                ☷
              </div>

              <h3>
                No assignments found
              </h3>

              <p>
                Add a new task or change your filters.
              </p>

            </div>


            <!-- ==================================================
                 ASSIGNMENT CARDS
            =================================================== -->
            <div
              v-else
              class="assignment-list"
            >

              <article
                v-for="assignment in filteredAssignments"
                :key="assignment.id"
                class="assignment-card"
                :class="
                  assignmentBorderClass(
                    assignment.status
                  )
                "
              >


                <!-- ICON -->
                <div class="assignment-icon">

                  {{
                    subjectIcon(
                      assignment.subject
                    )
                  }}

                </div>


                <!-- CONTENT -->
                <div class="assignment-content">


                  <!-- TOP -->
                  <div class="assignment-top">

                    <div class="assignment-main">


                      <!-- BADGES -->
                      <div class="assignment-tags">

                        <span class="subject-badge">
                          {{ assignment.subject }}
                        </span>


                        <span
                          class="priority-badge"
                          :class="
                            priorityClass(
                              assignment.priority
                            )
                          "
                        >

                          <span class="priority-dot"></span>

                          {{ assignment.priority }}

                        </span>

                      </div>


                      <h3>
                        {{ assignment.title }}
                      </h3>

                    </div>


                    <span
                      class="status-badge"
                      :class="
                        statusClass(
                          assignment.status
                        )
                      "
                    >
                      {{ assignment.status }}
                    </span>

                  </div>


                  <!-- NOTES -->
                  <p class="assignment-notes">

                    {{
                      assignment.notes ||
                      'No additional notes for this assignment.'
                    }}

                  </p>


                  <!-- META -->
                  <div class="assignment-meta">

                    <span class="meta-item">

                      <span class="meta-icon">
                        ▦
                      </span>

                      {{
                        formatDate(
                          assignment.deadline
                        )
                      }}

                    </span>


                    <span
                      v-if="
                        assignment.status !==
                        'Completed'
                      "
                      class="deadline-badge"
                      :class="
                        deadlineClass(
                          assignment.deadline
                        )
                      "
                    >

                      <span>
                        ◷
                      </span>

                      {{
                        deadlineMessage(
                          assignment.deadline
                        )
                      }}

                    </span>


                    <span
                      v-else
                      class="completed-badge"
                    >
                      ✓ Finished
                    </span>

                  </div>


                  <!-- ==================================================
                       QUICK STATUS ACTION
                  =================================================== -->
                  <div class="quick-status-area">


                    <!-- PENDING -->
                    <button
                      v-if="
                        assignment.status ===
                        'Pending'
                      "
                      class="quick-status-button start-task-button"
                      :disabled="
                        statusUpdatingId ===
                        assignment.id
                      "
                      @click="
                        updateAssignmentStatus(
                          assignment.id,
                          'In Progress'
                        )
                      "
                    >

                      <span>
                        {{
                          statusUpdatingId ===
                          assignment.id
                            ? '↻'
                            : '▶'
                        }}
                      </span>

                      {{
                        statusUpdatingId ===
                        assignment.id
                          ? 'Updating...'
                          : 'Start Task'
                      }}

                    </button>


                    <!-- IN PROGRESS -->
                    <button
                      v-else-if="
                        assignment.status ===
                        'In Progress'
                      "
                      class="quick-status-button complete-task-button"
                      :disabled="
                        statusUpdatingId ===
                        assignment.id
                      "
                      @click="
                        updateAssignmentStatus(
                          assignment.id,
                          'Completed'
                        )
                      "
                    >

                      <span>
                        {{
                          statusUpdatingId ===
                          assignment.id
                            ? '↻'
                            : '✓'
                        }}
                      </span>

                      {{
                        statusUpdatingId ===
                        assignment.id
                          ? 'Updating...'
                          : 'Mark Complete'
                      }}

                    </button>


                    <!-- COMPLETED -->
                    <div
                      v-else
                      class="completed-actions"
                    >

                      <div class="completed-message">
                        <span>✓</span>
                        Task Completed
                      </div>


                      <button
                        class="reopen-button"
                        :disabled="
                          statusUpdatingId ===
                          assignment.id
                        "
                        @click="
                          updateAssignmentStatus(
                            assignment.id,
                            'In Progress'
                          )
                        "
                      >
                        ↶ Reopen Task
                      </button>

                    </div>

                  </div>

                </div>


                <!-- ==================================================
                     EDIT DELETE
                =================================================== -->
                <div class="assignment-actions">

                  <button
                    class="action-button edit-action"
                    @click="
                      editAssignment(
                        assignment
                      )
                    "
                  >

                    <span>
                      ✎
                    </span>

                    <span>
                      Edit
                    </span>

                  </button>


                  <button
                    class="action-button delete-action"
                    @click="
                      deleteAssignmentRecord(
                        assignment.id
                      )
                    "
                  >

                    <span>
                      ×
                    </span>

                    <span>
                      Delete
                    </span>

                  </button>

                </div>

              </article>

            </div>

          </div>

        </section>


        <!-- ==================================================
             FOOTER
        =================================================== -->
        <footer class="app-footer">

          <div class="footer-brand">

            <div class="footer-logo">
              ✓
            </div>

            <div>

              <strong>
                Assignment Tracker
              </strong>

              <small>
                Student Productivity Dashboard
              </small>

            </div>

          </div>


          <p>
            Plan • Prioritize • Progress • Succeed
          </p>

        </footer>

      </div>


      <!-- TOAST -->
      <ion-toast
        :is-open="toastOpen"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="toastOpen = false"
      ></ion-toast>

    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import {
  IonPage,
  IonContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToast
} from '@ionic/vue';


import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';


import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue';


import { db } from '../firebase';



/* ==================================================
   INTERFACE
=================================================== */

interface Assignment {
  id: string;
  subject: string;
  title: string;
  deadline: string;
  status: string;
  priority: string;
  notes: string;
}



/* ==================================================
   STATES
=================================================== */

const assignments =
  ref<Assignment[]>([]);


const loading =
  ref(false);


const isEditing =
  ref(false);


const editingId =
  ref('');


const searchText =
  ref('');


const statusFilter =
  ref('All');


const priorityFilter =
  ref('All');


const toastOpen =
  ref(false);


const toastMessage =
  ref('');


/*
  Used only for the quick status button.

  Example:
  if assignment "abc123" is being updated,
  statusUpdatingId becomes "abc123".

  This prevents multiple clicks while Firebase
  is currently updating that assignment.
*/
const statusUpdatingId =
  ref('');



/* ==================================================
   FORM
=================================================== */

const form =
  reactive({

    subject: '',

    title: '',

    deadline: '',

    status: 'Pending',

    priority: 'Medium',

    notes: ''

  });



/* ==================================================
   TOAST
=================================================== */

const showToast = (
  message: string
) => {

  toastMessage.value =
    message;

  toastOpen.value =
    true;

};



/* ==================================================
   RESET FORM
=================================================== */

const resetForm = () => {

  form.subject =
    '';

  form.title =
    '';

  form.deadline =
    '';

  form.status =
    'Pending';

  form.priority =
    'Medium';

  form.notes =
    '';


  isEditing.value =
    false;


  editingId.value =
    '';

};



/* ==================================================
   CREATE / UPDATE
=================================================== */

const saveAssignment =
  async () => {


    if (
      !form.subject.trim() ||
      !form.title.trim() ||
      !form.deadline
    ) {

      showToast(
        'Please complete all required fields.'
      );

      return;

    }


    try {

      loading.value =
        true;


      /* =============================================
         UPDATE EXISTING ASSIGNMENT
      ============================================== */

      if (
        isEditing.value &&
        editingId.value
      ) {

        await updateDoc(

          doc(
            db,
            'assignments',
            editingId.value
          ),

          {

            subject:
              form.subject.trim(),

            title:
              form.title.trim(),

            deadline:
              form.deadline,

            /*
              Status remains the existing status.

              We no longer need to manually select
              the status inside the edit form.

              Quick Status buttons handle that.
            */
            status:
              form.status,

            priority:
              form.priority,

            notes:
              form.notes.trim()

          }

        );


        showToast(
          'Assignment updated successfully.'
        );

      }


      /* =============================================
         CREATE NEW ASSIGNMENT
      ============================================== */

      else {

        await addDoc(

          collection(
            db,
            'assignments'
          ),

          {

            subject:
              form.subject.trim(),

            title:
              form.title.trim(),

            deadline:
              form.deadline,

            /*
              Every newly created assignment
              begins as Pending.
            */
            status:
              'Pending',

            priority:
              form.priority,

            notes:
              form.notes.trim(),

            createdAt:
              serverTimestamp()

          }

        );


        showToast(
          'Assignment added successfully.'
        );

      }


      resetForm();


      await loadAssignments();

    }


    catch (error) {

      console.error(
        'Error saving assignment:',
        error
      );


      showToast(
        'Unable to save assignment.'
      );

    }


    finally {

      loading.value =
        false;

    }

  };



/* ==================================================
   READ ASSIGNMENTS
=================================================== */

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
        Fallback query without orderBy.
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



/* ==================================================
   QUICK STATUS UPDATE
=================================================== */

const updateAssignmentStatus =
  async (
    assignmentId: string,
    newStatus: string
  ) => {


    /*
      Prevent another click while
      this assignment is updating.
    */

    if (
      statusUpdatingId.value
    ) {

      return;

    }


    try {

      statusUpdatingId.value =
        assignmentId;


      /*
        Update ONLY the status field.

        Nothing else in the assignment
        will be changed.
      */

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


      /*
        Update local UI immediately.

        This makes the app feel faster
        without waiting for another
        complete Firebase query.
      */

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


      /*
        If the assignment currently
        being edited is the same one,
        synchronize the edit form too.
      */

      if (
        editingId.value ===
        assignmentId
      ) {

        form.status =
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
          `Status changed to ${newStatus}.`
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



/* ==================================================
   EDIT
=================================================== */

const editAssignment = (
  assignment: Assignment
) => {


  form.subject =
    assignment.subject;


  form.title =
    assignment.title;


  form.deadline =
    assignment.deadline;


  form.status =
    assignment.status;


  form.priority =
    assignment.priority;


  form.notes =
    assignment.notes;


  editingId.value =
    assignment.id;


  isEditing.value =
    true;


  window.scrollTo({

    top: 0,

    behavior:
      'smooth'

  });

};



/* ==================================================
   CANCEL EDIT
=================================================== */

const cancelEdit = () => {

  resetForm();

};



/* ==================================================
   DELETE
=================================================== */

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


      /*
        If the assignment currently being
        edited gets deleted, reset the form.
      */

      if (
        editingId.value ===
        id
      ) {

        resetForm();

      }


      showToast(
        'Assignment deleted successfully.'
      );


      await loadAssignments();

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



/* ==================================================
   SEARCH + FILTER
=================================================== */

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



/* ==================================================
   COUNTERS
=================================================== */

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



/* ==================================================
   COMPLETION PERCENTAGE
=================================================== */

const completionPercentage =
  computed(() => {


    if (
      assignments.value.length ===
      0
    ) {

      return 0;

    }


    return Math.round(

      (
        completedCount.value /
        assignments.value.length
      )

      * 100

    );

  });



/* ==================================================
   DATE
=================================================== */

const currentDay =
  computed(() => {

    return new Intl.DateTimeFormat(

      'en-US',

      {
        weekday:
          'long'
      }

    ).format(
      new Date()
    );

  });



const currentDateLabel =
  computed(() => {

    return new Intl.DateTimeFormat(

      'en-US',

      {

        month:
          'long',

        day:
          'numeric',

        year:
          'numeric'

      }

    ).format(
      new Date()
    );

  });



/* ==================================================
   FORMAT DEADLINE
=================================================== */

const formatDate = (
  date: string
) => {


  if (!date) {

    return 'No deadline';

  }


  return new Intl.DateTimeFormat(

    'en-US',

    {

      month:
        'short',

      day:
        'numeric',

      year:
        'numeric'

    }

  ).format(

    new Date(
      `${date}T00:00:00`
    )

  );

};



/* ==================================================
   DAYS LEFT
=================================================== */

const daysUntilDeadline = (
  deadline: string
) => {


  if (!deadline) {

    return 0;

  }


  const end =
    new Date(
      `${deadline}T23:59:59`
    );


  const now =
    new Date();


  return Math.ceil(

    (
      end.getTime() -
      now.getTime()
    )

    /

    (
      1000 *
      60 *
      60 *
      24
    )

  );

};



/* ==================================================
   DEADLINE MESSAGE
=================================================== */

const deadlineMessage = (
  deadline: string
) => {


  const days =
    daysUntilDeadline(
      deadline
    );


  if (
    days < 0
  ) {

    return 'Overdue';

  }


  if (
    days === 0
  ) {

    return 'Due today';

  }


  if (
    days === 1
  ) {

    return '1 day left';

  }


  return `${days} days left`;

};



/* ==================================================
   DEADLINE STYLE
=================================================== */

const deadlineClass = (
  deadline: string
) => {


  const days =
    daysUntilDeadline(
      deadline
    );


  if (
    days < 0
  ) {

    return 'deadline-overdue';

  }


  if (
    days <= 2
  ) {

    return 'deadline-urgent';

  }


  return 'deadline-normal';

};



/* ==================================================
   STATUS STYLE
=================================================== */

const statusClass = (
  status: string
) => {


  if (
    status ===
    'Completed'
  ) {

    return 'status-completed';

  }


  if (
    status ===
    'In Progress'
  ) {

    return 'status-progress';

  }


  return 'status-pending';

};



/* ==================================================
   PRIORITY STYLE
=================================================== */

const priorityClass = (
  priority: string
) => {


  if (
    priority ===
    'High'
  ) {

    return 'priority-high';

  }


  if (
    priority ===
    'Low'
  ) {

    return 'priority-low';

  }


  return 'priority-medium';

};



/* ==================================================
   CARD STYLE
=================================================== */

const assignmentBorderClass = (
  status: string
) => {


  if (
    status ===
    'Completed'
  ) {

    return 'card-completed';

  }


  if (
    status ===
    'In Progress'
  ) {

    return 'card-progress';

  }


  return 'card-pending';

};



/* ==================================================
   SUBJECT ICON
=================================================== */

const subjectIcon = (
  subject: string
) => {


  const value =
    subject.toLowerCase();


  if (
    value.includes('cyber') ||
    value.includes('security')
  ) {

    return '◆';

  }


  if (
    value.includes('math')
  ) {

    return '∑';

  }


  if (
    value.includes('research') ||
    value.includes('capstone')
  ) {

    return '⌁';

  }


  if (
    value.includes('web') ||
    value.includes('program') ||
    value.includes('java') ||
    value.includes('code')
  ) {

    return '</>';

  }


  if (
    value.includes('network')
  ) {

    return '◎';

  }


  if (
    value.includes('database')
  ) {

    return '▤';

  }


  if (
    value.includes('history')
  ) {

    return '▣';

  }


  if (
    value.includes('science')
  ) {

    return '⚗';

  }


  return '▣';

};



/* ==================================================
   ON PAGE LOAD
=================================================== */

onMounted(() => {

  loadAssignments();

});

</script>


<style scoped>

/* ==================================================
   VARIABLES
=================================================== */

.app-shell {

  --primary:
    #315ee8;

  --primary-dark:
    #2446bd;

  --secondary:
    #11867e;

  --background:
    #f4f7fb;

  --surface:
    #ffffff;

  --text:
    #1d2939;

  --text-secondary:
    #667085;

  --border:
    #dfe6ef;

}


/* ==================================================
   GLOBAL
=================================================== */

* {
  box-sizing: border-box;
}


ion-content {
  --background: #f4f7fb;
}


.app-shell {

  width:
    min(
      1400px,
      calc(100% - 36px)
    );

  min-height:
    100vh;

  margin:
    auto;

  padding:
    24px 0 36px;

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;

  color:
    var(--text);

}


/* ==================================================
   HEADER
=================================================== */

.app-header {

  min-height:
    80px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;

  padding:
    12px 4px 18px;

}


.brand-area {

  display:
    flex;

  align-items:
    center;

  gap:
    14px;

}


.brand-logo {

  width:
    50px;

  height:
    50px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    15px;

  color:
    white;

  background:
    linear-gradient(
      135deg,
      #294ac9,
      #3c7df0
    );

  box-shadow:
    0 8px 20px
    rgba(49, 94, 232, 0.2);

  font-size:
    25px;

  font-weight:
    900;

}


.brand-copy h1 {

  margin:
    0;

  color:
    #1d2939;

  font-size:
    25px;

  font-weight:
    850;

}


.brand-copy h1 span {
  color: var(--primary);
}


.brand-copy p {

  margin:
    4px 0 0;

  color:
    #7a8699;

  font-size:
    11px;

}


.header-date {

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

  padding:
    9px 13px;

  border:
    1px solid var(--border);

  border-radius:
    14px;

  background:
    white;

}


.date-icon {

  width:
    30px;

  height:
    30px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    9px;

  color:
    var(--primary);

  background:
    #e8efff;

}


.header-date > div:last-child {
  display: grid;
}


.header-date span {

  color:
    var(--primary);

  font-size:
    10px;

  font-weight:
    800;

}


.header-date strong {

  margin-top:
    2px;

  color:
    #4c5b72;

  font-size:
    11px;

}


/* ==================================================
   HERO
=================================================== */

.hero-section {

  min-height:
    310px;

  display:
    grid;

  grid-template-columns:
    minmax(0, 1.45fr)
    minmax(300px, 0.65fr);

  gap:
    44px;

  align-items:
    center;

  padding:
    38px 42px;

  overflow:
    hidden;

  border:
    1px solid #dbe4f1;

  border-radius:
    26px;

  background:

    radial-gradient(
      circle at 78% 20%,
      rgba(255, 255, 255, 0.88),
      transparent 28%
    ),

    linear-gradient(
      120deg,
      #edf4ff,
      #f1f8f8 53%,
      #f5f2ff
    );

}


.hero-label {

  width:
    fit-content;

  display:
    flex;

  align-items:
    center;

  gap:
    6px;

  margin-bottom:
    16px;

  padding:
    7px 11px;

  border-radius:
    8px;

  color:
    white;

  background:
    var(--secondary);

  font-size:
    10px;

  font-weight:
    850;

}


.hero-copy h2 {

  margin:
    0;

  color:
    #172033;

  font-size:
    clamp(40px, 5vw, 60px);

  line-height:
    0.98;

  font-weight:
    900;

  letter-spacing:
    -2px;

}


.hero-copy h2 span {

  display:
    block;

  margin-top:
    4px;

  color:
    var(--primary);

}


.hero-copy > p {

  max-width:
    690px;

  margin:
    20px 0 0;

  color:
    #627087;

  font-size:
    14px;

  line-height:
    1.65;

}


.hero-features {

  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    8px;

  margin-top:
    22px;

}


.feature {

  min-height:
    31px;

  display:
    inline-flex;

  align-items:
    center;

  gap:
    6px;

  padding:
    6px 11px;

  border-radius:
    999px;

  font-size:
    10px;

  font-weight:
    800;

}


.blue-feature {
  color: #3157bc;
  background: #e4ecff;
}


.teal-feature {
  color: #11715d;
  background: #dff4eb;
}


.amber-feature {
  color: #946614;
  background: #fff0c8;
}


.violet-feature {
  color: #6856aa;
  background: #ece7ff;
}


/* ==================================================
   HERO PREVIEW
=================================================== */

.hero-preview {

  position:
    relative;

  min-height:
    225px;

  display:
    grid;

  place-items:
    center;

}


.preview-decoration {

  position:
    absolute;

  border-radius:
    50%;

  opacity:
    0.55;

}


.decoration-one {

  width:
    190px;

  height:
    190px;

  background:
    #d9eff2;

}


.decoration-two {

  width:
    100px;

  height:
    100px;

  right:
    -20px;

  bottom:
    -20px;

  background:
    #e4defb;

}


.preview-window {

  position:
    relative;

  z-index:
    2;

  width:
    min(100%, 320px);

  padding:
    17px;

  border:
    1px solid #d5deea;

  border-radius:
    19px;

  background:
    rgba(255, 255, 255, 0.95);

  box-shadow:
    0 18px 40px
    rgba(45, 61, 91, 0.13);

}


.preview-topbar {

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

  margin-bottom:
    14px;

}


.preview-topbar > div:first-child {
  display: grid;
}


.preview-label {

  color:
    #8994a6;

  font-size:
    8px;

  font-weight:
    900;

}


.preview-topbar strong {

  margin-top:
    2px;

  font-size:
    14px;

}


.preview-count {

  width:
    31px;

  height:
    31px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    10px;

  color:
    white;

  background:
    var(--primary);

  font-size:
    11px;

  font-weight:
    900;

}


.preview-progress {

  margin-bottom:
    14px;

  padding:
    10px;

  border-radius:
    11px;

  background:
    #f5f7fb;

}


.preview-progress-info {

  display:
    flex;

  justify-content:
    space-between;

  margin-bottom:
    7px;

  color:
    #788497;

  font-size:
    8px;

}


.preview-progress-info strong {
  color: var(--primary);
}


.progress-track {

  height:
    5px;

  overflow:
    hidden;

  border-radius:
    999px;

  background:
    #e1e6ee;

}


.progress-fill {

  height:
    100%;

  border-radius:
    inherit;

  background:
    linear-gradient(
      90deg,
      #315ee8,
      #19a28d
    );

  transition:
    width 0.3s ease;

}


.preview-task {

  min-height:
    47px;

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

  margin-top:
    8px;

  padding:
    8px 9px;

  border-radius:
    10px;

}


.preview-task-blue {
  background: #edf3ff;
}


.preview-task-yellow {
  background: #fff5dc;
}


.preview-task-green {
  background: #e8f7f1;
}


.preview-checkbox {

  width:
    27px;

  height:
    27px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    8px;

  background:
    rgba(255, 255, 255, 0.85);

  font-size:
    10px;

  font-weight:
    900;

}


.preview-task > div:last-child {
  display: grid;
}


.preview-task strong {

  color:
    #38475b;

  font-size:
    9px;

}


.preview-task small {

  margin-top:
    2px;

  color:
    #8290a1;

  font-size:
    7px;

}


/* ==================================================
   STATS
=================================================== */

.stats-grid {

  display:
    grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap:
    14px;

  margin:
    18px 0;

}


.stat-card {

  min-height:
    120px;

  display:
    flex;

  align-items:
    center;

  gap:
    14px;

  padding:
    18px;

  border:
    1px solid
    rgba(65, 82, 111, 0.07);

  border-radius:
    18px;

}


.stat-blue {
  background: #e7eeff;
}


.stat-yellow {
  background: #fff2d2;
}


.stat-purple {
  background: #eee9ff;
}


.stat-green {
  background: #dcf3ea;
}


.stat-icon {

  width:
    50px;

  height:
    50px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    15px;

  background:
    rgba(255, 255, 255, 0.75);

  font-size:
    20px;

  font-weight:
    900;

}


.blue-icon {
  color: #315ee8;
}


.yellow-icon {
  color: #bd821b;
}


.purple-icon {
  color: #765dc4;
}


.green-icon {
  color: #19835f;
}


.stat-label {

  display:
    block;

  color:
    #52627a;

  font-size:
    9px;

  font-weight:
    900;

}


.stat-number {

  display:
    block;

  margin:
    3px 0;

  color:
    #243149;

  font-size:
    29px;

}


.stat-content small {

  color:
    #7b889c;

  font-size:
    9px;

}


/* ==================================================
   MOTIVATION
=================================================== */

.motivation-banner {

  min-height:
    82px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    15px;

  margin-bottom:
    18px;

  padding:
    15px 25px;

  border-radius:
    17px;

  color:
    white;

  background:
    linear-gradient(
      110deg,
      #294ac9,
      #315ee8 48%,
      #10867d
    );

}


.motivation-icon {

  width:
    38px;

  height:
    38px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    12px;

  background:
    rgba(255, 255, 255, 0.14);

}


.motivation-copy {
  text-align: center;
}


.motivation-copy strong {
  font-size: 14px;
}


.motivation-copy p {

  margin:
    4px 0 0;

  opacity:
    0.83;

  font-size:
    10px;

}


/* ==================================================
   WORKSPACE
=================================================== */

.workspace {

  display:
    grid;

  grid-template-columns:
    410px
    minmax(0, 1fr);

  gap:
    16px;

}


.app-panel {

  min-width:
    0;

  padding:
    22px;

  border:
    1px solid var(--border);

  border-radius:
    20px;

  background:
    white;

  box-shadow:
    0 9px 26px
    rgba(36, 52, 80, 0.05);

}


.panel-header {
  margin-bottom: 22px;
}


.panel-heading {

  display:
    flex;

  align-items:
    center;

  gap:
    11px;

}


.panel-icon {

  width:
    44px;

  height:
    44px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    13px;

  color:
    white;

  font-size:
    20px;

}


.primary-panel-icon {

  background:
    linear-gradient(
      135deg,
      #315ee8,
      #3b82f6
    );

}


.secondary-panel-icon {

  background:
    linear-gradient(
      135deg,
      #10867d,
      #15a28d
    );

}


.panel-heading h2 {

  margin:
    0;

  color:
    #273449;

  font-size:
    18px;

}


.panel-heading p {

  margin:
    4px 0 0;

  color:
    #8590a2;

  font-size:
    10px;

}


/* ==================================================
   FORM
=================================================== */

.form-group {
  margin-bottom: 15px;
}


.form-group label {

  display:
    block;

  margin-bottom:
    7px;

  color:
    #46556b;

  font-size:
    11px;

  font-weight:
    750;

}


.form-group label span {
  color: #d64551;
}


.input-wrapper {

  min-height:
    50px;

  display:
    flex;

  align-items:
    center;

  gap:
    8px;

  padding:
    0 12px;

  border:
    1px solid #dce4ed;

  border-radius:
    12px;

  background:
    #fbfcfe;

}


.input-wrapper:focus-within {

  border-color:
    #7190ee;

  background:
    white;

  box-shadow:
    0 0 0 3px
    rgba(49, 94, 232, 0.075);

}


.input-icon {

  width:
    22px;

  display:
    grid;

  place-items:
    center;

  color:
    #5270cf;

  font-size:
    13px;

  font-weight:
    800;

}


.textarea-wrapper {

  min-height:
    96px;

  align-items:
    flex-start;

}


.textarea-icon {
  margin-top: 13px;
}


ion-input,
ion-select,
ion-textarea {

  width:
    100%;

  --background:
    transparent;

  --color:
    #354258;

  --placeholder-color:
    #9da8b8;

  --padding-start:
    0;

  --padding-end:
    0;

  font-size:
    12px;

}


/* CURRENT EDITING STATUS */

.current-status-info {

  margin-bottom:
    15px;

  padding:
    12px;

  display:
    flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    8px;

  border:
    1px solid #dce4ed;

  border-radius:
    12px;

  background:
    #f8faff;

}


.current-status-info > span {

  color:
    #65738a;

  font-size:
    10px;

  font-weight:
    800;

}


.current-status-info strong {

  padding:
    5px 8px;

  border-radius:
    999px;

  font-size:
    9px;

}


.current-status-info small {

  width:
    100%;

  color:
    #8995a7;

  font-size:
    8px;

}


/* ==================================================
   BUTTONS
=================================================== */

.main-button {

  width:
    100%;

  min-height:
    48px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    7px;

  border:
    none;

  border-radius:
    12px;

  color:
    white;

  background:
    linear-gradient(
      100deg,
      #294ac9,
      #315ee8,
      #397bf0
    );

  font-size:
    11px;

  font-weight:
    850;

  cursor:
    pointer;

}


.main-button:disabled {

  opacity:
    0.6;

  cursor:
    not-allowed;

}


.cancel-button {

  width:
    100%;

  min-height:
    44px;

  margin-top:
    9px;

  border:
    1px solid #dbe2ec;

  border-radius:
    11px;

  color:
    #627087;

  background:
    #f8fafc;

  font-size:
    11px;

  font-weight:
    750;

}


/* ==================================================
   ASSIGNMENT HEADER
=================================================== */

.assignments-heading {

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    14px;

}


.refresh-button {

  min-height:
    40px;

  display:
    flex;

  align-items:
    center;

  gap:
    5px;

  padding:
    0 13px;

  border:
    1px solid #cfdaec;

  border-radius:
    10px;

  color:
    #315ee8;

  background:
    #f7f9ff;

  font-size:
    10px;

  font-weight:
    800;

}


/* ==================================================
   TOOLBAR
=================================================== */

.toolbar {

  display:
    grid;

  grid-template-columns:
    minmax(0, 1fr)
    165px
    165px;

  gap:
    9px;

  margin:
    21px 0 9px;

}


.search-control {

  min-height:
    46px;

  display:
    flex;

  align-items:
    center;

  gap:
    9px;

  padding:
    0 13px;

  border:
    1px solid #dce4ed;

  border-radius:
    11px;

  background:
    #fbfcfe;

}


.search-control input {

  width:
    100%;

  border:
    none;

  outline:
    none;

  background:
    transparent;

  color:
    #354258;

  font-size:
    12px;

}


.search-icon {
  color: #6077bb;
}


.filter-control {

  overflow:
    hidden;

  border:
    1px solid #dce4ed;

  border-radius:
    11px;

  background:
    #fbfcfe;

}


.filter-control select {

  width:
    100%;

  min-height:
    46px;

  padding:
    0 12px;

  border:
    none;

  outline:
    none;

  color:
    #526176;

  background:
    transparent;

  font-size:
    10px;

  font-weight:
    800;

}


.results-info {

  margin:
    8px 2px 12px;

  color:
    #8b97a8;

  font-size:
    9px;

}


/* ==================================================
   CARDS
=================================================== */

.assignment-list {

  display:
    grid;

  gap:
    11px;

}


.assignment-card {

  position:
    relative;

  min-height:
    145px;

  display:
    grid;

  grid-template-columns:
    48px
    minmax(0, 1fr)
    auto;

  gap:
    12px;

  align-items:
    flex-start;

  padding:
    15px;

  overflow:
    hidden;

  border:
    1px solid #e0e6ee;

  border-radius:
    15px;

  background:
    white;

}


.assignment-card::before {

  content:
    "";

  position:
    absolute;

  top:
    0;

  bottom:
    0;

  left:
    0;

  width:
    4px;

}


.card-pending::before {
  background: #dda52d;
}


.card-progress::before {
  background: #755fc0;
}


.card-completed::before {
  background: #15906a;
}


.assignment-icon {

  width:
    43px;

  height:
    43px;

  display:
    grid;

  place-items:
    center;

  margin-top:
    2px;

  border-radius:
    12px;

  color:
    #315ee8;

  background:
    #edf3ff;

  font-size:
    13px;

  font-weight:
    900;

}


.assignment-content {
  min-width: 0;
}


.assignment-top {

  display:
    flex;

  justify-content:
    space-between;

  gap:
    12px;

}


.assignment-tags {

  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    5px;

  margin-bottom:
    5px;

}


.subject-badge,
.priority-badge {

  min-height:
    21px;

  display:
    inline-flex;

  align-items:
    center;

  gap:
    5px;

  padding:
    3px 8px;

  border-radius:
    999px;

  font-size:
    8px;

  font-weight:
    850;

}


.subject-badge {

  max-width:
    170px;

  overflow:
    hidden;

  color:
    #315ee8;

  background:
    #e8efff;

  white-space:
    nowrap;

  text-overflow:
    ellipsis;

}


.priority-high {

  color:
    #b43c49;

  background:
    #ffe6e8;

}


.priority-medium {

  color:
    #956810;

  background:
    #fff1ca;

}


.priority-low {

  color:
    #3e6fae;

  background:
    #e7f0ff;

}


.priority-dot {

  width:
    6px;

  height:
    6px;

  border-radius:
    50%;

  background:
    currentColor;

}


.assignment-main h3 {

  margin:
    0;

  color:
    #28364c;

  font-size:
    13px;

  font-weight:
    800;

}


.status-badge {

  min-height:
    25px;

  display:
    inline-flex;

  align-items:
    center;

  padding:
    4px 9px;

  border-radius:
    999px;

  font-size:
    8px;

  font-weight:
    850;

  white-space:
    nowrap;

}


.status-pending {

  color:
    #956810;

  background:
    #fff0c8;

}


.status-progress {

  color:
    #684fa9;

  background:
    #eee8ff;

}


.status-completed {

  color:
    #197858;

  background:
    #def4ea;

}


.assignment-notes {

  margin:
    7px 0 10px;

  color:
    #7e8a9c;

  font-size:
    10px;

  line-height:
    1.45;

}


.assignment-meta {

  display:
    flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    7px;

}


.meta-item {

  display:
    inline-flex;

  align-items:
    center;

  gap:
    5px;

  color:
    #718097;

  font-size:
    9px;

}


.deadline-badge,
.completed-badge {

  min-height:
    24px;

  display:
    inline-flex;

  align-items:
    center;

  gap:
    5px;

  padding:
    4px 8px;

  border-radius:
    999px;

  font-size:
    8px;

  font-weight:
    800;

}


.deadline-normal {

  color:
    #3f6fae;

  background:
    #e7f0ff;

}


.deadline-urgent {

  color:
    #a7641c;

  background:
    #fff0d7;

}


.deadline-overdue {

  color:
    #b93b48;

  background:
    #ffe6e8;

}


.completed-badge {

  color:
    #197858;

  background:
    #def4ea;

}


/* ==================================================
   QUICK STATUS
=================================================== */

.quick-status-area {

  margin-top:
    13px;

  padding-top:
    11px;

  border-top:
    1px solid #edf1f5;

}


.quick-status-button {

  min-height:
    39px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    7px;

  padding:
    0 14px;

  border:
    none;

  border-radius:
    10px;

  font-size:
    9px;

  font-weight:
    850;

  cursor:
    pointer;

  transition:
    0.15s ease;

}


.quick-status-button:hover {
  transform: translateY(-1px);
}


.quick-status-button:disabled {

  opacity:
    0.6;

  cursor:
    wait;

}


.start-task-button {

  color:
    #57439d;

  background:
    #eee9ff;

  border:
    1px solid #ded5fb;

}


.start-task-button:hover {
  background: #e6dfff;
}


.complete-task-button {

  color:
    white;

  background:
    linear-gradient(
      100deg,
      #128061,
      #1aa078
    );

  box-shadow:
    0 5px 12px
    rgba(23, 140, 104, 0.16);

}


.completed-actions {

  display:
    flex;

  flex-wrap:
    wrap;

  align-items:
    center;

  gap:
    8px;

}


.completed-message {

  min-height:
    38px;

  display:
    inline-flex;

  align-items:
    center;

  gap:
    6px;

  padding:
    0 12px;

  border-radius:
    10px;

  color:
    #197858;

  background:
    #e4f6ed;

  font-size:
    9px;

  font-weight:
    850;

}


.completed-message span {

  width:
    20px;

  height:
    20px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    50%;

  color:
    white;

  background:
    #19936a;

}


.reopen-button {

  min-height:
    38px;

  padding:
    0 11px;

  border:
    1px solid #d6dee9;

  border-radius:
    9px;

  color:
    #657287;

  background:
    #f9fafc;

  font-size:
    8px;

  font-weight:
    800;

  cursor:
    pointer;

}


/* ==================================================
   EDIT / DELETE
=================================================== */

.assignment-actions {

  display:
    flex;

  gap:
    6px;

  padding-top:
    2px;

}


.action-button {

  min-height:
    38px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    5px;

  padding:
    0 10px;

  border-radius:
    9px;

  font-size:
    9px;

  font-weight:
    800;

  cursor:
    pointer;

}


.edit-action {

  border:
    1px solid #cbd8f1;

  color:
    #315ee8;

  background:
    #f7f9ff;

}


.delete-action {

  border:
    1px solid #efcbd0;

  color:
    #c03f4d;

  background:
    #fff8f8;

}


/* ==================================================
   EMPTY / LOADING
=================================================== */

.state-container {

  min-height:
    300px;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  justify-content:
    center;

  padding:
    25px;

  border:
    1px dashed #d8e1ec;

  border-radius:
    14px;

  background:
    #fbfcfe;

  text-align:
    center;

}


.state-icon {

  width:
    55px;

  height:
    55px;

  display:
    grid;

  place-items:
    center;

  margin-bottom:
    12px;

  border-radius:
    17px;

  color:
    #6680cf;

  background:
    #edf3ff;

}


.state-container h3 {

  margin:
    0;

  color:
    #536176;

  font-size:
    14px;

}


.state-container p {

  margin:
    5px 0 0;

  color:
    #8a96a8;

  font-size:
    10px;

}


.loader {

  width:
    37px;

  height:
    37px;

  margin-bottom:
    13px;

  border:
    3px solid #dce5f5;

  border-top-color:
    #315ee8;

  border-radius:
    50%;

  animation:
    spin 0.75s linear infinite;

}


@keyframes spin {

  to {
    transform: rotate(360deg);
  }

}


/* ==================================================
   FOOTER
=================================================== */

.app-footer {

  min-height:
    85px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;

  padding:
    20px 5px 0;

  color:
    #7f8a9c;

  font-size:
    9px;

}


.footer-brand {

  display:
    flex;

  align-items:
    center;

  gap:
    8px;

}


.footer-logo {

  width:
    28px;

  height:
    28px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    8px;

  color:
    white;

  background:
    var(--primary);

}


/* ==================================================
   TABLET
=================================================== */

@media (max-width: 1100px) {

  .workspace {

    grid-template-columns:
      360px
      minmax(0, 1fr);

  }


  .toolbar {

    grid-template-columns:
      1fr 1fr;

  }


  .search-control {

    grid-column:
      1 / -1;

  }


  .assignment-card {

    grid-template-columns:
      45px
      minmax(0, 1fr);

  }


  .assignment-actions {

    grid-column:
      1 / -1;

    justify-content:
      flex-end;

  }

}


@media (max-width: 900px) {

  .hero-section {

    grid-template-columns:
      1fr;

  }


  .hero-preview {

    max-width:
      400px;

    width:
      100%;

    margin:
      auto;

  }


  .stats-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .workspace {

    grid-template-columns:
      1fr;

  }


  .toolbar {

    grid-template-columns:
      1fr 1fr;

  }

}


/* ==================================================
   MOBILE
=================================================== */

@media (max-width: 650px) {

  .app-shell {

    width:
      calc(100% - 18px);

    padding:
      10px 0 24px;

  }


  /* HEADER */

  .app-header {

    min-height:
      63px;

    padding:
      6px 1px 10px;

  }


  .brand-area {
    gap: 9px;
  }


  .brand-logo {

    width:
      42px;

    height:
      42px;

    border-radius:
      12px;

  }


  .brand-copy h1 {

    font-size:
      18px;

  }


  .brand-copy p {

    font-size:
      8px;

  }


  .header-date {
    display: none;
  }


  /* HERO */

  .hero-section {

    min-height:
      auto;

    gap:
      24px;

    padding:
      24px 19px;

    border-radius:
      19px;

  }


  .hero-copy h2 {

    font-size:
      clamp(
        34px,
        11vw,
        45px
      );

    letter-spacing:
      -1.5px;

  }


  .hero-copy > p {

    margin-top:
      14px;

    font-size:
      11px;

  }


  .hero-features {

    margin-top:
      16px;

  }


  .feature {

    min-height:
      29px;

    padding:
      5px 9px;

    font-size:
      8px;

  }


  .hero-preview {

    min-height:
      190px;

  }


  .preview-window {

    width:
      min(100%, 300px);

  }


  /* STATS */

  .stats-grid {

    grid-template-columns:
      1fr 1fr;

    gap:
      9px;

    margin:
      12px 0;

  }


  .stat-card {

    min-height:
      102px;

    padding:
      12px;

    gap:
      9px;

    border-radius:
      15px;

  }


  .stat-icon {

    width:
      40px;

    height:
      40px;

    font-size:
      16px;

  }


  .stat-label {
    font-size: 7px;
  }


  .stat-number {
    font-size: 23px;
  }


  .stat-content small {
    font-size: 7px;
  }


  /* MOTIVATION */

  .motivation-banner {

    min-height:
      70px;

    justify-content:
      flex-start;

    padding:
      12px 14px;

  }


  .motivation-copy {
    text-align: left;
  }


  .motivation-copy strong {
    font-size: 10px;
  }


  .motivation-copy p {
    font-size: 8px;
  }


  .motivation-decoration {
    display: none;
  }


  /* PANEL */

  .app-panel {

    padding:
      17px;

    border-radius:
      17px;

  }


  .panel-icon {

    width:
      40px;

    height:
      40px;

  }


  .panel-heading h2 {
    font-size: 16px;
  }


  /* TOOLBAR */

  .toolbar {

    grid-template-columns:
      1fr 1fr;

  }


  .search-control {

    grid-column:
      1 / -1;

    min-height:
      48px;

  }


  .filter-control select {

    min-height:
      48px;

  }


  /* ASSIGNMENT CARD */

  .assignment-card {

    grid-template-columns:
      42px
      minmax(0, 1fr);

    padding:
      13px;

  }


  .assignment-icon {

    width:
      40px;

    height:
      40px;

  }


  .assignment-actions {

    grid-column:
      1 / -1;

    width:
      100%;

    padding-top:
      10px;

    border-top:
      1px solid #edf1f5;

  }


  .action-button {

    min-height:
      43px;

    padding:
      0 14px;

  }


  /* QUICK STATUS */

  .quick-status-button {

    width:
      100%;

    min-height:
      46px;

    font-size:
      10px;

  }


  .completed-actions {

    display:
      grid;

    grid-template-columns:
      1fr;

  }


  .completed-message,
  .reopen-button {

    width:
      100%;

    min-height:
      44px;

    justify-content:
      center;

  }


  /* FOOTER */

  .app-footer {

    flex-direction:
      column;

    align-items:
      flex-start;

    justify-content:
      center;

    gap:
      8px;

  }

}


/* ==================================================
   SMALL PHONES
=================================================== */

@media (max-width: 430px) {

  .app-shell {

    width:
      calc(100% - 14px);

  }


  .hero-section {

    padding:
      21px 16px;

  }


  .hero-copy h2 {

    font-size:
      35px;

  }


  .stats-grid {

    grid-template-columns:
      1fr 1fr;

  }


  .stat-card {

    min-height:
      98px;

    flex-direction:
      column;

    align-items:
      flex-start;

    justify-content:
      center;

  }


  .stat-icon {

    width:
      34px;

    height:
      34px;

  }


  .toolbar {

    grid-template-columns:
      1fr;

  }


  .search-control {

    grid-column:
      auto;

  }


  .assignment-top {

    flex-direction:
      column;

    align-items:
      flex-start;

  }


  .status-badge {

    align-self:
      flex-start;

  }


  .assignment-actions {

    display:
      grid;

    grid-template-columns:
      1fr 1fr;

  }


  .action-button {

    width:
      100%;

  }

}


/* ==================================================
   VERY SMALL PHONE
=================================================== */

@media (max-width: 350px) {

  .stats-grid {

    grid-template-columns:
      1fr;

  }


  .stat-card {

    min-height:
      85px;

    flex-direction:
      row;

    align-items:
      center;

  }


  .hero-copy h2 {

    font-size:
      31px;

  }

}

</style>