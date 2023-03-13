<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">  
        <ion-title>
          Job openings
        </ion-title>
      </ion-toolbar>  
    </ion-header>
    <ion-content>
      <ion-segment v-model="segmentSelected" color="dark" value="openings">
        <ion-segment-button value="openings">
          <ion-label>Openings</ion-label>
        </ion-segment-button>
        <ion-segment-button value="applied">
          <ion-label>Applied</ion-label>
        </ion-segment-button>
      </ion-segment>
      <div class="ion-margin-top" v-if="segmentSelected === 'openings'">
      <div class="companies">
      <ion-card v-for="i = 1 in 10" :key="i">
        <ion-card-header>
          <ion-card-title>
            Company name
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item lines="none">
            <ion-label class="ion-text-wrap">
              <h2>Position</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </ion-label>
          </ion-item>
          <ion-chip>HTML/CSS</ion-chip>
          <ion-chip>JavaScript</ion-chip>
          <ion-chip>TypeScript</ion-chip>
          <ion-chip>React</ion-chip>
          <ion-chip>Redux</ion-chip>
        </ion-card-content>
      </ion-card>
      </div>
      </div>
      <div class="ion-margin-top" v-if="segmentSelected === 'applied'">
      <div class="companies">
      <ion-card v-for="i = 1 in 10" :key="i">
        <ion-card-header>
          <ion-card-title>
            <ion-item lines="none">
              Job-Title
              <ion-badge color="danger" slot="end">Rejected</ion-badge>
            </ion-item>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item lines="none">
            <ion-label class="ion-text-wrap">
              <h2>Position</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </ion-label>
          </ion-item>
          <ion-chip>HTML/CSS</ion-chip>
          <ion-chip>JavaScript</ion-chip>
          <ion-chip>TypeScript</ion-chip>
          <ion-chip>React</ion-chip>
          <ion-chip>Redux</ion-chip>
        </ion-card-content>
      </ion-card>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { doc, setDoc } from "firebase/firestore"
import db from '@/firebase/init'

import { IonPage, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonChip, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegment, IonSegmentButton, IonBadge } from '@ionic/vue';
export default defineComponent({
  name: 'StudentDashboard',
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonToolbar,
    IonLabel,
    IonItem,
    IonChip,
    IonCardTitle,
    IonSegment,
    IonSegmentButton,
    IonBadge,
  },
  data() {
    return {
        segmentSelected:'openings',
    }
  }
})
</script>
<style scoped>
  .companies {
    max-width: 400px;
    margin: auto;
  }
  
  ion-card-header ion-item {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
  }
</style>
