<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>  
        <ion-title>
          Company details
        </ion-title>
      </ion-toolbar>  
    </ion-header>
    <ion-content>
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
        <ion-button class="ion-margin-bottom ion-margin-start">View elligible candidates</ion-button>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent } from "vue";

import { IonPage, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonChip, IonButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
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
    IonButton,
    IonCardTitle
  },
  data() {
    return {
        
    }
  },
  
})
</script>
<style scoped>
  .companies {
    max-width: 400px;
    margin: auto;
  }
</style>
