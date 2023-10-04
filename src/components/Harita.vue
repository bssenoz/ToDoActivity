<template>
  <div>
    <div id="google-map"></div>
  </div>
</template>

<script>
import { googleMapsApiKey } from '../google-maps-api-key'; 

export default {
  mounted() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = this.initMap;
  },
  methods: {
    initMap() {
      const map = new google.maps.Map(document.getElementById('google-map'), {
        center: { lat: 40, lng: 35 },
        zoom: 5,
      });
    },
  },
};
</script>

<style>
#google-map {
  width: 100%;
  height: 400px;
}
</style>
