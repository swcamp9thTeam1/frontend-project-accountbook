<template>
    <div class="save-map-root">
        <div id="map"></div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";

const { VITE_KAKAO_JAVASCRIPT_KEY } = import.meta.env;

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        const script = document.createElement('script');
        /* global kakao */
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_JAVASCRIPT_KEY}&libraries=clusterer&autoload=false`;
        script.onload = () => kakao.maps.load(initMap);
        
        document.head.appendChild(script);
    }
})

const initMap = () => {
    const container = document.getElementById("map");
    const options = {                   // 지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(  // 지도의 중심좌표. (필수!!)
            37.498004414546934, 127.02770621963765
        ),      
	    level: 3                        // 지도의 레벨(확대, 축소 정도)
    };

    const mapInstance = new kakao.maps.Map(container, options);       // 지도 생성 및 객체 리턴

    /* 지도에 컨트롤 추가 */
    addControls(mapInstance);
}


const addControls = (mapInstance) => {
    const mapTypeControl = new kakao.maps.MapTypeControl();   // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤
    const zoomControl = new kakao.maps.ZoomControl();         // 줌 컨트롤

    // 지도에 추가해야 지도에 표시된다.
    mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
}
</script>

<style scoped>
.save-map-root {
    width: 100vw;
    height: 700px;

    #map {
        width: 100%;
        height: 100%;
    }
}
</style>