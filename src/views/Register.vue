<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">  
        <ion-title>
          Register
        </ion-title>
      </ion-toolbar>  
    </ion-header>
  <ion-content :fullscreen="true">
    <ion-card class="ion-margin-top">
      <ion-card-content>
        <ion-segment v-model="segmentSelected" color="dark">
          <ion-segment-button value="recruiter">
            <ion-label>Recruiter</ion-label>
          </ion-segment-button>
          <ion-segment-button value="student">
            <ion-label>Student</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="ion-margin-top" v-if="segmentSelected === 'recruiter'">
          <ion-label>Username</ion-label>
          <ion-input placeholder="Username" position="stacked" v-model="username" />

          <ion-label>Company name</ion-label>
          <ion-input  position="stacked" placeholder="Company name" v-model="companyName" clear-input />
  
          <ion-label>Company URL</ion-label>
          <ion-input  position="stacked" placeholder="Company URL" v-model="companyUrl"  clear-input />
  
          <ion-label>Password</ion-label>
          <ion-input  position="stacked" placeholder="Password" v-model="password" type="password" clear-input />
        </div>

        <div class="ion-margin-top" v-if="segmentSelected === 'student'">
          <ion-label>Username</ion-label>
          <ion-input placeholder="Username" position="stacked" v-model="username" />

          <ion-label>Student ID</ion-label>
          <ion-input placeholder="Student ID" position="stacked" v-model="studentId" />

          <ion-label>Branch</ion-label>
          <ion-input  position="stacked" placeholder="branch" v-model="branch" clear-input />
  
          <ion-label>CGPA</ion-label>
          <ion-input  position="stacked" placeholder="CGPA" v-model="cgpa"  clear-input />

          <ion-label>Resume</ion-label>
          <ion-input  position="stacked" placeholder="Resume link" v-model="resume"  clear-input />
          <ion-note slot="helper"> publicly reachable URL to download the resume (pdf/docx/doc formats supported)</ion-note> <br>
  
          <ion-label>Password</ion-label>
          <ion-input  position="stacked" placeholder="Password" v-model="password" type="password" clear-input />
        </div>
      </ion-card-content>
      <ion-button color="dark" shape="round" class="ion-margin" @click="register">Register</ion-button>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script type="ts">
import { defineComponent } from "vue";
import { doc, setDoc } from "firebase/firestore"
import db from "@/firebase/init";
import { IonContent, IonPage, IonHeader, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonInput, IonSegment, IonSegmentButton, toastController, IonNote, IonButton } from '@ionic/vue';

export default defineComponent({
  name: 'Register',
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCard,
    IonCardContent,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonNote,
    IonButton
  },
  data(){
    return {
      username: "",  
      companyName: "",
      companyUrl: "",
      password: "",
      studentId: "",
      branch: "",
      cgpa: "",
      resume: "",
      segmentSelected: "recruiter",
    }
  },
  methods: {
    async register(){
      if(this.segmentSelected == 'student') {
        
        const myHeaders = new Headers();
        myHeaders.append("apikey", "4pX4e7Siw1B40lVx4RlvO4tdLCiQULF9");
        
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        };

        this.resume = this.resume.replaceAll(":","%3A").replaceAll("/", "%2F");
        
        let resume = {};

        await fetch(`https://api.apilayer.com/resume_parser/url?url=${this.resume}`, requestOptions)
        .then(response => response.text())
        .then(result => resume = result)
        .catch(error => console.log('error', error));
        const user = {
          username: this.username,
          studentId: this.studentId,
          branch: this.branch,
          cgpa: this.cgpa,
          resume: resume,
          role: 'student',
          password: this.password
        }
        let message;
        try {
          await setDoc(doc(db, 'User', this.username), user, { capital: true }, { merge: true });
          message = "Registered successfully."
        } catch(err) {
          console.error(err)
          message = "Something went wrong."
        }
        const toast = await toastController
        .create({
          message: message,
          duration: 3000,
          position: 'bottom',
          buttons: [{
            text: 'Dismiss',
            role: 'cancel'
          }]
        })
        return toast.present();
      } else {
        const user = {
          username: this.username,
          companyName: this.companyName,
          companyUrl: this.companyUrl,
          password: this.password,
          role: 'recruiter'
        }
        let message;
        try {
          await setDoc(doc(db, 'User', this.username), user, { capital: true }, { merge: true });
          message = "Data uploaded successfully."
        } catch {
          message = "Something went wrong."
        }
        const toast = await toastController
        .create({
          message: message,
          duration: 3000,
          position: 'bottom',
          buttons: [{
            text: 'Dismiss',
            role: 'cancel'
          }]
        })
        return toast.present();
      }
    }  
  }
})

</script>

<style scoped>

  ion-label {
    font-size: 18px;
  }

  ion-input, ion-textarea {
    --background: rgb(221, 219, 219);
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  ion-card {
    max-width: 500px;
    margin: auto;
    margin-top: 50px;
  }
</style>
