<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>
          {{ jobs[0]?.companyName }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-card v-for="job in jobs" :key="job.jobId">
        <ion-card-header>
          <ion-card-title>
            {{ job.companyName }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item lines="none">
             <ion-label>
              <p class="overline">{{ job.jobId }}</p>
              <h1>{{ job.jobTitle }}</h1>
              <p class="ion-text-wrap">{{ job.description }}</p>
            </ion-label>
          </ion-item>
          <ion-item detail button lines="full">
            <ion-label>Job applications</ion-label>
            <ion-note slot="end">34 applications</ion-note>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent } from "vue";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from "@ionic/vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/firebase/init";

export default defineComponent({
  name: "CompanyDashboard",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonNote
  },
  ionViewWillEnter(){
    this.fetchJobsByCompany();
  },
  data(){
    return {
      jobs: [],
      applications: {
        F0D4FC259C: [{
          branch: "CS",
          cgpa:"8",
          password: "1234567",
          resume: { "name": "Harsh Mishra", "email": "contact@harshcasper.com", "phone": "+91-9799053844", "skills": [ "Jupyter", "Flask", "Selenium", "Pandas", "Nltk", "Python", "Mysql", "Sql", "Tensorflow", "Cloud", "Ai", "Polyglot", "Apis", "Linux", "Django", "Technical", "Scipy", "Saas", "Coding", "Pytest", "Docker", "Machine learning", "Technical skills", "Github", "Computer science", "Engineering", "Javascript", "C++", "Ux", "Aws" ], "education": [ { "name": "Sathyabama Institute of Science and Technology", "dates": [ "July 2021", "March 2022" ], "date_start": "July 2021", "date_end": "March 2022" }, { "name": "School of Computing Winner" }, { "name": "Sathyabama Institute of Science and Technology Bachelor of Engineering", "dates": [ "August 2018", "December 2022" ], "date_start": "August 2018", "date_end": "December 2022" } ], "experience": [ { "title": "Development Engineer", "dates": [ "January 2022" ], "organization": "HackerRank" }, { "title": "Software Development Engineer", "dates": [ "January 2022" ], "organization": "HackerRank" }, { "title": "Software Engineer", "dates": [ "July 2021", "September 2021" ], "date_start": "July 2021", "date_end": "September 2021", "location": "Labs", "organization": "Quansight" }, { "title": "Software Engineer Intern", "dates": [ "July 2021", "September 2021" ], "date_start": "July 2021", "date_end": "September 2021", "location": "Labs", "organization": "Quansight" }, { "title": "Community Manager", "organization": "Moja global" } ] },
          role: "student",
          studentId: "12345678",
          username: "Disha",
          status: 'pending'
        }]
      }
    }
  },
  methods: {
    async fetchJobsByCompany(){
      const q = query(collection(db, "Jobs"), where("companyName", "==", "Birdeye "));
      const jobs = await getDocs(q);
      jobs.forEach((job) => {
        this.jobs.push(job.data());
      });
      console.log(this.jobs);
    }
  },
})
</script>
<style scoped>
  .overline {
    font-weight: 500 !important;
    font-size: 10px !important;
    line-height: 16px !important;
    letter-spacing: 1.5px;
    color: #666;
    text-transform: uppercase !important;
  }

  ion-card {
    max-width: 400px;
    margin: auto;
  }
</style>
