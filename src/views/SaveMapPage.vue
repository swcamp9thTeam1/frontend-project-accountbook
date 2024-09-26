<template>
    <div class="save-map-root">

        <!-- 지도 뷰 -->
        <div id="map"></div>

        <!-- 장소 검색 뷰 -->
        <SearchAddress />

        <!-- 마커 카테고리 선택 버튼 -->
        <SaveMapMarkerCategoryList @changeMarker="changeMarker" />

        <!-- 가게 상세보기 Modal -->
        <StoreDetailModal v-show="storeDetailId" :storeDetailId="storeDetailId" @closeModal="closeModal" />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import SearchAddress from "@/components/savemap/SearchAddress.vue";
import SaveMapMarkerCategoryList from "@/components/savemap/SaveMapMarkerCategoryList.vue";
import StoreDetailModal from "@/components/savemap/StoreDetailModal.vue";

const { VITE_KAKAO_JAVASCRIPT_KEY } = import.meta.env;

let mapInstance = null;
let goodStoreMarkers = [];        // 착한가격업소 마커 배열
let goodStoreOverlays = [];       // 착한가격업소 오버레이 배열

const storeDetailId = ref();      // 가게 상세보기 할 가게의 id

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

    mapInstance = new kakao.maps.Map(container, options);       // 지도 생성 및 객체 리턴

    addControls();
}

/* 지도에 컨트롤 추가 */
const addControls = () => {
    const zoomControl = new kakao.maps.ZoomControl();         // 줌 컨트롤

    // 지도에 추가해야 지도에 표시된다.
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
}

/**
 * 새로운 마커 카테고리가 선택되었을 때 동작할 함수
 * @param targetMarkerId 클릭한 마커 카테고리 id
 */
const changeMarker = (targetMarkerId) => {
    if (targetMarkerId === "goodStore") {
        displayGoodStoreMarker();
    } else if (targetMarkerId === "visited") {
        clearGoodStoreMarker();
    } else if (targetMarkerId === "costAvg") {
        clearGoodStoreMarker();
    } else {

        // 하나도 선택되지 않은 상태 => 지도에 있는 마커를 모두 제거
        clearGoodStoreMarker();
    }
}

/* 지도에 올라갈 마커 1개 생성하는 함수 */
const createMarker = (position, image) => {
    const marker = new kakao.maps.Marker({ 
        position,
        image,
        clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        storeDetailId.value = 1;
    });

    return marker;
}

const createPriceOverlay = (position, price) => {
    const content = `<div style="
        padding: 5px; 
        background-color: #9AE09F; 
        position: relative; 
        bottom: 58px;
        font-size: 12px;
        color: white;
        border-radius: 5px;
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, .25);
        ">${price.toLocaleString()}</div>`

    return new kakao.maps.CustomOverlay({ position, content });
}

const createMarkerImage = (imageSrc) => new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(42, 42));

const displayGoodStoreMarker = async () => {

    // 1. 착한가격업소 리스트를 fetch
    const response = await fetch("http://localhost:8080/good-stores");
    const data = await response.json();

    // 2. 가져온 데이터로 지도용 데이터 생성
    const mapData = data.map(item => ({
        price: item.price,
        position: new kakao.maps.LatLng(item.latitude, item.longitude)
    }));

    // 3. 포지션 리스트로 마커 생성
    mapData.forEach(mapItem => {

        const { position, price } = mapItem;

        // 마커에 들어갈 이미지 생성
        const imageSrc = "/src/assets/icons/marker-good-store.svg";
        const markerImage = createMarkerImage(imageSrc);

        // 마커 1개 생성
        const marker = createMarker(position, markerImage);

        // 커스텀 오버레이 추가 (착한가격 표시)
        const priceCustomOverlay = createPriceOverlay(position, price);

        // 지도에 마커, 오버레이 추가
        marker.setMap(mapInstance);
        priceCustomOverlay.setMap(mapInstance);

        // 마커 배열에서도 관리되도록 추가
        goodStoreMarkers.push(marker);
        goodStoreOverlays.push(priceCustomOverlay);
    })
}

const clearGoodStoreMarker = () => {
    goodStoreMarkers.forEach(marker => marker.setMap(null));
    goodStoreMarkers = [];
    goodStoreOverlays.forEach(overlay => overlay.setMap(null));
    goodStoreOverlays = [];
}

const closeModal = () => {
    storeDetailId.value = null;
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