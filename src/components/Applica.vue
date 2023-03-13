<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon :icon="close" />
        </ion-button>
      </ion-buttons>
      <ion-title>Upload CSV</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item lines="none">
      <ion-label>Job openings</ion-label>
      <ion-label class="ion-text-right ion-padding-end">{{ file.name }}</ion-label>
      <input @change="getFile" ref="file" class="ion-hide" type="file" id="inputFile"/>
      <label for="inputFile">Upload</label>
    </ion-item>

    <ion-list>
      <ion-item>
        <ion-label>Company name</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.companyName">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Company URL</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.companyUrl">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Job ID</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.jobId">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Job title</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.jobTitle">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>job URL</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.jobUrl">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>job description</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.description">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Minimum CGPA</ion-label>
        <ion-select interface="popover" v-if="content.length" placeholder = "Select" v-model="fieldMapping.minCgpa">
          <ion-select-option :key="index" v-for="(prop, index) in Object.keys(content[0])">{{ prop }}</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="uploadData">
        <ion-icon :icon="cloudUploadOutline" />
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>
<script>
import { IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonButtons, modalController, IonSelect, IonSelectOption, IonList, IonFab, IonFabButton, toastController } from "@ionic/vue";
import { defineComponent } from "vue";
import Papa from 'papaparse'
import { addOutline, arrowForwardOutline, close, cloudUploadOutline } from 'ionicons/icons';
import { doc, setDoc } from "firebase/firestore";
import db from "@/firebase/init";
export default defineComponent({
  name: "UploadCsvModal",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonList,
    IonFab,
    IonFabButton
  },
  data() {
    return {
      file: {},
      content: [],
      fieldMapping: {
        companyName: '',
        companyUrl: '',
        jobId: '',
        jobTitle: '',
        jobUrl: '',
        description: '',
        eligibility: false,
        minCgpa: 0
      },
    }
  },
  methods: {
    async uploadData(){
      let message = "Data uploaded successfully.";
      this.content.map(async (job) => {
        const jobDetails = {
          companyName: job[this.fieldMapping.companyName],
          companyUrl: job[this.fieldMapping.companyUrl],
          jobTitle: job[this.fieldMapping.jobTitle],
          jobId: job[this.fieldMapping.jobId],
          jobUrl: job[this.fieldMapping.jobUrl],
          description: job[this.fieldMapping.description],
          eligibility: job[this.fieldMapping.minCgpa] ? true : false,
          minCgpa: job[this.fieldMapping.minCgpa]
        }
        try {
          await setDoc(doc(db, 'Jobs', jobDetails.jobId), jobDetails);
        } catch(err) {
          console.error(err);
          message = "Something went wrong."
        }
      });
      this.closeModal();
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
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
    getFile(event) {
      const file = event?.target.files[0];
      if(file){
        this.file = file;
        this.parseFile();
      }
    },
    async parseFile(){
      await this.parseCsv(this.file).then(res => {
        this.content = res;
      })
    },
    async parseCsv(file, options) {
      return new Promise ((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            if (results.errors.length) {
              reject(results.error)
            } else {
              resolve(results.data)
            }
          },
          ...options
        });
      })
    },
  },
  setup() {
    return {
      addOutline,
      arrowForwardOutline,
      close,
      cloudUploadOutline
    }
  }
})
</script>
<style scoped>
main {
  max-width: 732px;
  margin: var(--spacer-sm) auto 0; 
}
ion-button{
  margin: var(--spacer-base) var(--spacer-sm);
}
label {
  cursor: pointer;
}
</style>
F