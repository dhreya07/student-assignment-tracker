<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page-layout">

        <!-- MOBILE HEADER -->
        <header class="mobile-brand-header">
          <div class="mobile-brand">
            <div class="mobile-brand-icon">✓</div>
            <strong>Assignment Tracker</strong>
          </div>
        </header>

        <!-- SIDEBAR -->
        <aside class="sidebar">
          <div class="brand">
            <div class="brand-logo">✓</div>

            <div class="brand-text">
              <strong>Assignment</strong>
              <span>Tracker</span>
            </div>
          </div>

          <nav class="navigation">
            <button class="nav-item" @click="goTo('/home')">
              <span class="nav-icon">▦</span>
              Dashboard
            </button>

            <button class="nav-item" @click="goTo('/tasks')">
              <span class="nav-icon">☷</span>
              My Tasks
            </button>

            <button class="nav-item active">
              <span class="nav-icon">＋</span>
              Add Task
            </button>

            <button class="nav-item" @click="goTo('/subjects')">
              <span class="nav-icon">▤</span>
              Subjects
            </button>
          </nav>

          <div class="sidebar-footer">
            <strong>Student Productivity</strong>
            <span>Stay organized. Stay ahead.</span>
          </div>
        </aside>


        <!-- MAIN CONTENT -->
        <main class="main-content">

          <!-- PAGE HEADER -->
          <section class="page-header">
            <div>
              <span class="eyebrow">TASK MANAGEMENT</span>

              <h1>Add Assignment</h1>

              <p>
                Create a new academic task and keep track of your deadline.
              </p>
            </div>

            <button class="back-button" @click="goTo('/tasks')">
              ← My Tasks
            </button>
          </section>


          <!-- CONTENT -->
          <section class="content-grid">

            <!-- FORM CARD -->
            <div class="form-card">

              <div class="card-header">
                <div class="header-icon">＋</div>

                <div>
                  <h2>New Assignment</h2>
                  <p>Enter the details of your academic task.</p>
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
                    <span class="input-icon">▣</span>

                    <input
                      v-model="form.subject"
                      type="text"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>


                <!-- TITLE -->
                <div class="form-group">
                  <label>
                    Assignment Title
                    <span>*</span>
                  </label>

                  <div class="input-wrapper">
                    <span class="input-icon">✎</span>

                    <input
                      v-model="form.title"
                      type="text"
                      placeholder="Enter assignment title"
                    />
                  </div>
                </div>


                <!-- DEADLINE + PRIORITY -->
                <div class="two-column">

                  <div class="form-group">
                    <label>
                      Deadline
                      <span>*</span>
                    </label>

                    <div class="input-wrapper">
                      <span class="input-icon">▦</span>

                      <input
                        v-model="form.deadline"
                        type="date"
                      />
                    </div>
                  </div>


                  <div class="form-group">
                    <label>
                      Priority
                      <span>*</span>
                    </label>

                    <div class="input-wrapper">
                      <span class="input-icon">⚡</span>

                      <select v-model="form.priority">
                        <option value="Low">
                          Low Priority
                        </option>

                        <option value="Medium">
                          Medium Priority
                        </option>

                        <option value="High">
                          High Priority
                        </option>
                      </select>
                    </div>
                  </div>

                </div>


                <!-- NOTES -->
                <div class="form-group">
                  <label>
                    Notes
                    <span class="optional">(Optional)</span>
                  </label>

                  <div class="input-wrapper textarea-wrapper">
                    <span class="input-icon textarea-icon">✎</span>

                    <textarea
                      v-model="form.notes"
                      placeholder="Add notes or instructions..."
                      rows="5"
                    ></textarea>
                  </div>
                </div>


                <!-- INFO -->
                <div class="status-info">
                  <div class="status-icon">◷</div>

                  <div>
                    <strong>Initial Status: Pending</strong>

                    <p>
                      New assignments automatically start as Pending.
                      You can start or complete them from My Tasks.
                    </p>
                  </div>
                </div>


                <!-- BUTTONS -->
                <div class="form-actions">

                  <button
                    type="button"
                    class="cancel-button"
                    @click="goTo('/tasks')"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    class="save-button"
                    :disabled="loading"
                  >
                    <span>
                      {{ loading ? '↻' : '+' }}
                    </span>

                    {{
                      loading
                        ? 'Saving...'
                        : 'Add Assignment'
                    }}
                  </button>

                </div>

              </form>
            </div>


            <!-- SIDE INFORMATION -->
            <aside class="info-column">

              <div class="info-card">
                <div class="info-icon blue">✓</div>

                <h3>Stay Organized</h3>

                <p>
                  Add your school activities and assignments so you
                  can easily keep track of everything you need to do.
                </p>
              </div>


              <div class="info-card">
                <div class="info-icon yellow">◷</div>

                <h3>Track Deadlines</h3>

                <p>
                  Set the correct deadline so your Assignment Tracker
                  can help you see which tasks need your attention.
                </p>
              </div>


              <div class="info-card">
                <div class="info-icon purple">⚡</div>

                <h3>Set Priority</h3>

                <p>
                  Use High, Medium, or Low priority to identify which
                  assignments should be completed first.
                </p>
              </div>

            </aside>

          </section>

        </main>


        <!-- MOBILE BOTTOM NAVIGATION -->
        <nav class="mobile-nav">
          <button class="mobile-nav-item" @click="goTo('/home')">
            <span class="mobile-nav-icon">▦</span>
            <span>Dashboard</span>
          </button>

          <button class="mobile-nav-item" @click="goTo('/tasks')">
            <span class="mobile-nav-icon">☷</span>
            <span>Tasks</span>
          </button>

          <button class="mobile-nav-item mobile-nav-add active" @click="goTo('/add-task')">
            <span class="mobile-add-icon">＋</span>
            <span>Add</span>
          </button>

          <button class="mobile-nav-item" @click="goTo('/subjects')">
            <span class="mobile-nav-icon">▤</span>
            <span>Subjects</span>
          </button>
        </nav>

        <!-- TOAST -->
        <ion-toast
          :is-open="toastOpen"
          :message="toastMessage"
          :duration="2000"
          @didDismiss="toastOpen = false"
        ></ion-toast>

      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonToast
} from '@ionic/vue';

import {
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';

import {
  reactive,
  ref
} from 'vue';

import {
  useRouter
} from 'vue-router';

import {
  db
} from '../firebase';


const router = useRouter();

const loading = ref(false);

const toastOpen = ref(false);

const toastMessage = ref('');


const form = reactive({
  subject: '',
  title: '',
  deadline: '',
  priority: 'Medium',
  notes: ''
});


const showToast = (
  message: string
) => {

  toastMessage.value = message;

  toastOpen.value = true;

};


const goTo = (
  path: string
) => {

  router.push(path);

};


const resetForm = () => {

  form.subject = '';

  form.title = '';

  form.deadline = '';

  form.priority = 'Medium';

  form.notes = '';

};


const saveAssignment = async () => {

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

    loading.value = true;


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


    resetForm();


    showToast(
      'Assignment added successfully!'
    );


    /*
      Small delay para makita muna
      ang success message bago pumunta
      sa My Tasks.
    */

    setTimeout(() => {

      router.push('/tasks');

    }, 900);


  }

  catch (error) {

    console.error(
      'Error adding assignment:',
      error
    );


    showToast(
      'Unable to add assignment.'
    );

  }

  finally {

    loading.value = false;

  }

};

</script>


<style scoped>

/* =========================================
   PAGE
========================================= */

* {
  box-sizing: border-box;
}

ion-content {
  --background: #f5f7fc;
}

.page-layout {
  min-height: 100vh;
  display: flex;

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;

  color: #17233c;
}


/* =========================================
   SIDEBAR
========================================= */

.sidebar {
  width: 250px;
  min-height: 100vh;

  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  padding: 28px 20px 22px;

  background: #ffffff;

  border-right:
    1px solid #e2e8f2;
}


.brand {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 42px;
}


.brand-logo {
  width: 50px;
  height: 50px;

  display: grid;
  place-items: center;

  flex-shrink: 0;

  border-radius: 14px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #315ee8,
      #397cf0
    );

  box-shadow:
    0 9px 22px
    rgba(49, 94, 232, 0.2);

  font-size: 27px;
  font-weight: 900;
}


.brand-text {
  display: grid;

  color: #17233c;

  font-size: 20px;
  line-height: 1.1;
}


.brand-text strong {
  font-weight: 850;
}


.brand-text span {
  color: #315ee8;
  font-weight: 850;
}


.navigation {
  display: grid;

  gap: 8px;
}


.nav-item {
  width: 100%;
  min-height: 52px;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 18px;

  border: 0;
  border-radius: 12px;

  background: transparent;

  color: #5c6b82;

  cursor: pointer;

  text-align: left;

  font-size: 14px;
  font-weight: 700;

  transition:
    0.2s ease;
}


.nav-item:hover {
  color: #315ee8;

  background:
    #f2f6ff;
}


.nav-item.active {
  color: #315ee8;

  background:
    #eaf0ff;
}


.nav-icon {
  width: 20px;

  display: inline-grid;
  place-items: center;

  font-size: 18px;
  font-weight: 800;
}


.sidebar-footer {
  display: grid;

  gap: 8px;

  margin-top: auto;

  padding-top: 25px;

  border-top:
    1px solid #e5eaf2;
}


.sidebar-footer strong {
  color: #263653;

  font-size: 13px;
}


.sidebar-footer span {
  color: #93a0b4;

  font-size: 11px;
}


/* =========================================
   MAIN
========================================= */

.main-content {
  width: calc(100% - 250px);

  padding:
    42px 48px 55px;
}


/* =========================================
   HEADER
========================================= */

.page-header {
  max-width: 1180px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 25px;

  margin: 0 auto 30px;
}


.eyebrow {
  display: block;

  margin-bottom: 10px;

  color: #315ee8;

  font-size: 12px;

  font-weight: 900;

  letter-spacing:
    1.3px;
}


.page-header h1 {
  margin: 0;

  color: #17233c;

  font-size:
    clamp(
      31px,
      4vw,
      43px
    );

  line-height: 1.05;

  font-weight: 900;

  letter-spacing:
    -1px;
}


.page-header p {
  margin:
    9px 0 0;

  color: #728096;

  font-size: 14px;
}


.back-button {
  min-height: 48px;

  padding: 0 20px;

  border:
    1px solid #d9e2f1;

  border-radius: 12px;

  background: white;

  color: #315ee8;

  cursor: pointer;

  font-size: 13px;

  font-weight: 800;

  transition:
    0.2s ease;
}


.back-button:hover {
  transform:
    translateY(-1px);

  border-color:
    #315ee8;
}


/* =========================================
   GRID
========================================= */

.content-grid {
  max-width: 1180px;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    300px;

  gap: 22px;

  align-items: start;

  margin: auto;
}


/* =========================================
   FORM
========================================= */

.form-card {
  padding: 30px;

  border:
    1px solid #e0e6ef;

  border-radius: 20px;

  background: white;

  box-shadow:
    0 8px 30px
    rgba(33, 50, 85, 0.04);
}


.card-header {
  display: flex;

  align-items: center;

  gap: 14px;

  margin-bottom: 28px;

  padding-bottom: 22px;

  border-bottom:
    1px solid #edf0f5;
}


.header-icon {
  width: 48px;
  height: 48px;

  display: grid;

  place-items: center;

  flex-shrink: 0;

  border-radius: 13px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #315ee8,
      #397cf0
    );

  font-size: 24px;
}


.card-header h2 {
  margin: 0;

  color: #17233c;

  font-size: 21px;

  font-weight: 850;
}


.card-header p {
  margin:
    5px 0 0;

  color: #8591a3;

  font-size: 12px;
}


/* =========================================
   INPUT
========================================= */

.form-group {
  margin-bottom: 20px;
}


.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #34435b;

  font-size: 12px;

  font-weight: 800;
}


.form-group label > span {
  color: #e04b65;
}


.form-group label .optional {
  margin-left: 4px;

  color: #98a3b3;

  font-weight: 500;
}


.input-wrapper {
  min-height: 52px;

  display: flex;

  align-items: center;

  overflow: hidden;

  border:
    1px solid #dce4ef;

  border-radius: 12px;

  background:
    #fbfcff;

  transition:
    0.2s ease;
}


.input-wrapper:focus-within {
  border-color:
    #315ee8;

  background:
    white;

  box-shadow:
    0 0 0 3px
    rgba(49, 94, 232, 0.08);
}


.input-icon {
  width: 48px;

  display: grid;

  place-items: center;

  flex-shrink: 0;

  color: #315ee8;

  font-size: 16px;
}


.input-wrapper input,
.input-wrapper select,
.input-wrapper textarea {
  width: 100%;

  border: 0;

  outline: 0;

  background:
    transparent;

  color: #263653;

  font-family: inherit;

  font-size: 13px;
}


.input-wrapper input,
.input-wrapper select {
  min-height: 50px;

  padding:
    0 14px 0 0;
}


.input-wrapper textarea {
  min-height: 115px;

  resize: vertical;

  padding:
    16px 14px 16px 0;
}


.input-wrapper input::placeholder,
.input-wrapper textarea::placeholder {
  color: #a0aabb;
}


.textarea-wrapper {
  align-items:
    flex-start;
}


.textarea-icon {
  padding-top: 17px;
}


.two-column {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 16px;
}


/* =========================================
   STATUS INFO
========================================= */

.status-info {
  display: flex;

  align-items:
    flex-start;

  gap: 13px;

  margin-top: 6px;

  padding: 16px;

  border:
    1px solid #dce6ff;

  border-radius: 13px;

  background:
    #f2f6ff;
}


.status-icon {
  width: 36px;
  height: 36px;

  display: grid;

  place-items: center;

  flex-shrink: 0;

  border-radius: 10px;

  color: #315ee8;

  background:
    #dfe9ff;

  font-weight: 900;
}


.status-info strong {
  display: block;

  margin-top: 1px;

  color: #3155bd;

  font-size: 12px;
}


.status-info p {
  margin:
    5px 0 0;

  color: #6f7f98;

  font-size: 11px;

  line-height: 1.5;
}


/* =========================================
   ACTIONS
========================================= */

.form-actions {
  display: flex;

  justify-content:
    flex-end;

  gap: 11px;

  margin-top: 27px;

  padding-top: 23px;

  border-top:
    1px solid #edf0f5;
}


.cancel-button,
.save-button {
  min-height: 48px;

  padding:
    0 22px;

  border-radius:
    12px;

  cursor: pointer;

  font-family: inherit;

  font-size: 13px;

  font-weight: 800;
}


.cancel-button {
  border:
    1px solid #dce3ed;

  background: white;

  color: #69778b;
}


.save-button {
  min-width: 165px;

  border: 0;

  color: white;

  background:
    linear-gradient(
      135deg,
      #315ee8,
      #397cf0
    );

  box-shadow:
    0 10px 24px
    rgba(49, 94, 232, 0.18);
}


.save-button span {
  margin-right: 5px;
}


.save-button:hover:not(:disabled) {
  transform:
    translateY(-1px);
}


.save-button:disabled {
  opacity: 0.65;

  cursor:
    not-allowed;
}


/* =========================================
   INFO CARDS
========================================= */

.info-column {
  display: grid;

  gap: 14px;
}


.info-card {
  padding: 22px;

  border:
    1px solid #e0e6ef;

  border-radius: 17px;

  background: white;
}


.info-icon {
  width: 42px;
  height: 42px;

  display: grid;

  place-items: center;

  margin-bottom: 16px;

  border-radius: 12px;

  font-size: 17px;

  font-weight: 900;
}


.info-icon.blue {
  color: #315ee8;

  background:
    #e8efff;
}


.info-icon.yellow {
  color: #b57b17;

  background:
    #fff1cf;
}


.info-icon.purple {
  color: #7357c4;

  background:
    #eee9ff;
}


.info-card h3 {
  margin: 0;

  color: #263653;

  font-size: 14px;

  font-weight: 850;
}


.info-card p {
  margin:
    8px 0 0;

  color: #8290a4;

  font-size: 11px;

  line-height: 1.6;
}


/* =========================================
   MOBILE APP HEADER + BOTTOM NAV
========================================= */

.mobile-brand-header,
.mobile-nav {
  display: none;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1000px) {

  .sidebar {
    width: 210px;
  }

  .main-content {
    width:
      calc(100% - 210px);

    padding:
      32px 25px 45px;
  }

  .content-grid {
    grid-template-columns:
      1fr;
  }

  .info-column {
    grid-template-columns:
      repeat(3, 1fr);
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 760px) {

  .page-layout {
    display: block;
    min-height: 100vh;
  }

  /* Hide desktop sidebar on mobile */
  .sidebar {
    display: none;
  }

  /* Same top brand header as Dashboard */
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
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 11px;
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
    padding: 24px 15px 105px;
  }

  .page-header {
    align-items: flex-start;
    margin-bottom: 22px;
  }

  .page-header h1 {
    font-size: 30px;
  }

  .page-header p {
    font-size: 12px;
  }

  .back-button {
    min-height: 42px;
    padding: 0 13px;
    font-size: 11px;
  }

  .form-card {
    padding: 20px;
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .info-column {
    grid-template-columns: 1fr;
  }

  /* Same fixed bottom nav as Dashboard/Tasks/Subjects */
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
    min-height: 55px;
    border: none;
    border-radius: 11px;
    background: transparent;
    color: #7b879b;
    padding: 5px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    font-family: inherit;
    font-size: 9px;
    font-weight: 800;
  }

  .mobile-nav-item.active {
    color: #2f63ed;
  }

  .mobile-nav-icon {
    font-size: 17px;
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


/* =========================================
   SMALL PHONE
========================================= */

@media (max-width: 480px) {

  .page-header {
    display: block;
  }


  .back-button {
    margin-top: 16px;
  }


  .form-card {
    padding: 17px;

    border-radius: 16px;
  }


  .card-header {
    align-items:
      flex-start;
  }


  .form-actions {
    flex-direction:
      column-reverse;
  }


  .cancel-button,
  .save-button {
    width: 100%;
  }


  .status-info {
    padding: 13px;
  }

}

</style>