import { createRouter, createWebHistory } from "vue-router";

import WelcomePage from "@/views/WelcomePage.vue";
import AccountBookPage from "@/views/AccountBookPage.vue";
import SaveMapPage from "@/views/SaveMapPage.vue";
import GroupPage from "@/views/GroupPage.vue";
import CommunityPage from "@/views/CommunityPage.vue";
import MyPage from "@/views/MyPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: WelcomePage },
        { path: "/account-book", component: AccountBookPage, children: [] },
        { path: "/save-map", component: SaveMapPage },
        { path: "/group", component: GroupPage },
        { path: "/community", component: CommunityPage },
        { path: "/my", component: MyPage },

    ],
})

export default router;