import { createRouter, createWebHistory } from "vue-router";

import WelcomePage from "@/views/WelcomePage.vue";
import AccountBookPage from "@/views/AccountBookPage.vue";
import SaveMapPage from "@/views/SaveMapPage.vue";
import GroupPage from "@/views/GroupPage.vue";
import CommunityPage from "@/views/CommunityPage.vue";
import MyPage from "@/views/MyPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import FindIdPwPage from "@/views/FindIdPwPage.vue";
import Confirm from '@/components/Confirm.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: WelcomePage },
        { path: "/account-book", component: AccountBookPage, children: [
            {
                path: "add",
                component: () => import("@/views/accountbook/AccbookAddView.vue")
            },
            {
                path: "all",
                component: () => import("@/views/accountbook/AccbookAllListView.vue")
            },
            {
                path: "daily",
                component: () => import("@/views/accountbook/AccbookDailyListView.vue")
            },
            {
                path: "detail",
                component: () => import("@/views/accountbook/AccbookDetailView.vue")
            },
        ] },
        // { path: "/save-map", component: SaveMapPage },
        // { path: "/group", component: GroupPage, 

        { path: "/", component: WelcomePage,meta: {hideMenu: true}},
        { path: "/account-book", component: AccountBookPage, children: [], meta: {hideMenu: true} },
        { path: "/save-map", component: SaveMapPage, meta: {hideMenu: true} },
        { path: "/group", component: GroupPage, redirect: "/group/my",
            children: [
                {
                    path: "my",
                    component: () => import("@/views/group/GroupMyView.vue")
                },

                {
                    path: "join",
                    component: () => import("@/views/group/GroupJoinView.vue")
                },

                {
                    path: "pending",
                    component: () => import("@/views/group/GroupPendingView.vue")

                },

                {
                    path: "create",
                    component: () => import("@/views/group/GroupCreateView.vue")
                }
            ] },

        { path: "/my", component: MyPage, children: [
            {
                path: "",
                component: () => import("@/views/my/MyInfoPage.vue")
            },

            {
                path: "asset",
                component: () => import("@/views/my/MyAssetView.vue")
            },

            {
                path: "expend",
                component: () => import("@/views/my/MyExpendView.vue")
            },

            {
                path: "review",
                component: () => import("@/views/my/MyReviewView.vue")
            },

            {
                path: "scrap",
                component: () => import("@/views/my/MyScrapView.vue")
            },

            {
                path: "write",
                component: () => import("@/views/my/MyWriteView.vue")
            },

            {
                path: "edit-info",
                component: () => import("@/views/my/MyInfoEditView.vue")
            },



        ]},
        { path: "/community", component: CommunityPage, redirect: "/community/free-board",
            children: [
                {
                    path: "free-board",
                    component: () => import("@/views/community/CommunityFreeBoardView.vue")
                },

                {
                    path: "my",
                    component: () => import("@/views/community/CommunityMyView.vue")
                },

                {
                    path: "scrap",
                    component: () => import("@/views/community/CommunityScrapView.vue")

                }
            ]
},

        { path: "/login", component: LoginPage, meta: {hideHeader:true, hideMenu:true} },
        { path: "/signup", component: SignupPage, meta: {hideHeader:true, hideMenu:true}},
        { path: "/find", component: FindIdPwPage, meta: {hideHeader:true, hideMenu:true}},
        { path: '/confirm', component: Confirm,  meta: {hideHeader:true, hideMenu:true}}
    ],
})

export default router;