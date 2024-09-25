<template>
    <div class="save-map-root">

        <!-- 지도 뷰 -->
        <div id="map"></div>

        <!-- 장소 검색 뷰 -->
        <SearchAddress />

        <!-- 마커 카테고리 선택 버튼 -->
        <SaveMapMarkerCategoryList />
    </div>
</template>

<script setup>
import { onMounted } from "vue";

import SearchAddress from "@/components/SearchAddress.vue";
import SaveMapMarkerCategoryList from "@/components/SaveMapMarkerCategoryList.vue";

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
    const zoomControl = new kakao.maps.ZoomControl();         // 줌 컨트롤

    // 지도에 추가해야 지도에 표시된다.
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
}
</script>

<style scoped>
.save-map-root {
    width: 100vw;
    height: 700px;
    position: relative;

    #map {
        width: 100%;
        height: 100%;
    }
}
</style>