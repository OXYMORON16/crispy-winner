<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">  
        <ion-title>
          Upload
        </ion-title>
      </ion-toolbar>  
    </ion-header>
    <ion-content>
      <ion-card class="ion-margin-top">
        <ion-card-content>
          <ion-label>Company name</ion-label>
          <ion-input placeholder="Company name" v-model="jobDetails.companyName" clear-input />

          <ion-label>Company URL</ion-label>
          <ion-input v-model="jobDetails.companyUrl" placeholder="Company URL" clear-input />

          <ion-label>Job title</ion-label>
          <ion-input placeholder="Job title" v-model="jobDetails.jobTitle" clear-input />

          <ion-label>Job URL</ion-label>
          <ion-input placeholder="Job URL" v-model="jobDetails.jobUrl" clear-input />

          <ion-label>Job description</ion-label>
          <ion-textarea placeholder="Job description" v-model="jobDetails.description" />

          <ion-checkbox class="ion-margin-top" v-model="jobDetails.eligibility" /> 
          <ion-label> Eligibility criteria</ion-label>
          
          <ion-item lines="none" v-if="jobDetails.eligibility">
            <ion-label class="ion-margin-end">CGPA</ion-label> 
            <ion-input v-model="jobDetails.minCgpa" />
          </ion-item>
          
        </ion-card-content>
        <ion-button class="ion-margin" color="dark" shape="round" @click="uploadData">Upload</ion-button>
      </ion-card>
      <ion-button @click="openUploadCsvModal" fill="outline">Upload CSV</ion-button> 
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent } from "vue";
import { doc, setDoc } from "firebase/firestore"
import db from '@/firebase/init.js'
import UploadCsvModal from '@/components/UploadCsvModal.vue';    

import { IonInput, IonCheckbox, IonPage, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonContent, IonCard, IonCardContent, modalController, IonButton, IonTextarea, toastController } from '@ionic/vue';
export default defineComponent({
  name: 'UploadData',
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonLabel,
    IonItem,
    IonCard,
    IonCardContent,
    IonInput,
    IonCheckbox,
    IonButton,
    IonTextarea,
  },
  data() {
    return {
      jobDetails: {
        companyName: '',
        companyUrl: '',
        jobTitle: '',
        jobUrl: '',
        description: '',
        eligibility: false,
        minCgpa: 0
      } 
    }
  },
  methods: { 
    async uploadData(){
      let message;
      try {
        await setDoc(doc(db, 'Jobs', "job1"), this.jobDetails, { capital: true }, { merge: true });
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
    },
    async openUploadCsvModal(){
      const uploadCsvModal = await modalController.create({
        component: UploadCsvModal,
      });
      return uploadCsvModal.present();
    }
  }
})
</script>
<style scoped>
  ion-label {
    font-size: 18px;
  }

  ion-item > ion-input {
    --background: rgb(221, 219, 219);
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    max-width: 80px;
  }

  ion-input, ion-textarea {
    --background: rgb(221, 219, 219);
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  ion-card {
    max-width: 600px;
    margin: auto;
    margin-top: 16px;
  }
  
</style>
