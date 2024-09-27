<template>
    <div class="save-map-root">

        <!-- 지도 뷰 -->
        <div id="map"></div>

        <!-- 장소 검색 뷰 -->
        <SearchAddress />

        <!-- 마커 카테고리 선택 버튼 -->
        <SaveMapMarkerCategoryList @changeMarker="changeMarker" />

        <!-- 가게 상세보기 Modal -->
        <StoreDetailModal v-if="storeDetailId" :storeDetailId="storeDetailId" @closeModal="closeModal" />
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
let visitedMarkers = [];          // 방문한 가게 마커 배열
let visitedOverlays = [];         // 방문한 가게 오버레이 배열
let costAvgMarkers = [];          // 1인소비금액 마커 배열
let costAvgOverlays = [];         // 1인소비금액 오버레이 배열

const storeDetailId = ref("");      // 가게 상세보기 할 가게의 id

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
        clearVisitedMarker();
        clearCostAvgMarker();
    } else if (targetMarkerId === "visited") {
        clearGoodStoreMarker();
        displayVisitedMarker();
        clearCostAvgMarker();
    } else if (targetMarkerId === "costAvg") {
        clearGoodStoreMarker();
        clearVisitedMarker();
        displayCostAvgMarker();
    } else {

        // 하나도 선택되지 않은 상태 => 지도에 있는 마커를 모두 제거
        clearGoodStoreMarker();
        clearVisitedMarker();
        clearCostAvgMarker();
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
        storeDetailId.value = "1";
    });

    return marker;
}

const createOverlay = (markerType, position, overlayText) => {
    let styles = `
                    padding: 5px;
                    position: relative;
                    bottom: 58px;
                    font-size: 12px;
                    color: white;
                    border-radius: 5px;
                    `;

    // 마커 타입 별로 배경 색상 설정
    let backgroundColor = "";
    if (markerType === "GOOD_STORE") backgroundColor = "#9AE09F";
    else if (markerType === "VISITED") backgroundColor = "#1D566E";
    else if (markerType === "COST_AVG") backgroundColor = "#101424"
    styles += `background-color: ${backgroundColor};`

    // 오버레이 content 설정
    const content = `<div style="${styles}">${overlayText}</div>`

    return new kakao.maps.CustomOverlay({ position, content });
}

const createMarkerImage = (imageSrc) => new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(42, 42));

const makeMarkerList = (markerType, mapData) => {
    mapData.forEach(mapItem => {

        const { position, overlayText } = mapItem;

        // 마커에 들어갈 이미지 생성
        let imageSrc = "/src/assets/icons/";
        if (markerType === "GOOD_STORE") imageSrc += "marker-good-store.svg";
        else if (markerType === "VISITED") imageSrc += "marker-visited.svg";
        else if (markerType === "COST_AVG") imageSrc += "marker-cost-avg.svg";
        
        const markerImage = createMarkerImage(imageSrc);

        // 마커 1개 생성
        const marker = createMarker(position, markerImage);

        // 커스텀 오버레이 추가
        const overlay = createOverlay(markerType, position, overlayText);

        // 지도에 마커, 오버레이 추가
        marker.setMap(mapInstance);
        overlay.setMap(mapInstance);

        // 마커 배열에서도 관리되도록 추가
        if (markerType === "GOOD_STORE") {
            goodStoreMarkers.push(marker);
            goodStoreOverlays.push(overlay);
        } else if (markerType === "VISITED") {
            visitedMarkers.push(marker);
            visitedOverlays.push(overlay);
        } else if (markerType === "COST_AVG") {
            costAvgMarkers.push(marker);
            costAvgOverlays.push(overlay);
        }
    })
}

const displayGoodStoreMarker = async () => {

    // 1. 착한가격업소 리스트를 fetch
    const response = await fetch("http://localhost:8080/map-stores?isGood=true");
    const data = await response.json();

    // 2. 가져온 데이터로 지도용 데이터 생성
    const mapData = data.map(item => ({
        overlayText: item.goodPrice.toLocaleString(),
        position: new kakao.maps.LatLng(item.latitude, item.longitude)
    }));

    // 3. 마커 데이터 생성
    makeMarkerList('GOOD_STORE', mapData);
}

const displayVisitedMarker = async () => {
    const response = await fetch("http://localhost:8080/map-stores?visited=true");
    const data = await response.json();

    // 가져온 데이터로 지도용 데이터 생성
    const mapData = data.map(item => ({
        overlayText: `${item.visitCnt}회 방문`,
        position: new kakao.maps.LatLng(item.latitude, item.longitude)
    }));

    makeMarkerList("VISITED", mapData);
}

const displayCostAvgMarker = async () => {
    const response = await fetch("http://localhost:8080/map-stores?isExistAvg=true");
    const data = await response.json();

    // 가져온 데이터로 지도용 데이터 생성
    const mapData = data.map(item => ({
        overlayText: `1인당 ${item.onePersonCostAvg.toLocaleString()}원 소비`,
        position: new kakao.maps.LatLng(item.latitude, item.longitude)
    }));

    makeMarkerList("COST_AVG", mapData);
}

const clearGoodStoreMarker = () => {
    goodStoreMarkers.forEach(marker => marker.setMap(null));
    goodStoreMarkers = [];
    goodStoreOverlays.forEach(overlay => overlay.setMap(null));
    goodStoreOverlays = [];
}

const clearVisitedMarker = () => {
    visitedMarkers.forEach(marker => marker.setMap(null));
    visitedMarkers = [];
    visitedOverlays.forEach(overlay => overlay.setMap(null));
    visitedOverlays = [];
}

const clearCostAvgMarker = () => {
    costAvgMarkers.forEach(marker => marker.setMap(null));
    costAvgMarkers = [];
    costAvgOverlays.forEach(overlay => overlay.setMap(null));
    costAvgOverlays = [];
}

const closeModal = () => {
    storeDetailId.value = "";
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