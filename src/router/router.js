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
                path: "",
                component: () => import("@/views/accountbook/AccbookAllListView.vue")
            },
            {
                path: "daily/:date",
                component: () => import("@/views/accountbook/AccbookDailyListView.vue")
            },
            {
                path: "detail/:id",
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
                    component: () => import("@/views/group/MyGroups.vue")
                },

                {
                    path: "join",
                    component: () => import("@/views/group/GroupSignUp.vue")
                },

                {
                    path: "pending",
                    component: () => import("@/views/group/GroupSignUpStatus.vue")

                },

                {
                    path: "create",
                    component: () => import("@/views/group/GroupCreate.vue")
                },
                {
                    path: "intro",
                    component: () => import("@/views/group/GroupIntro.vue")
                },
                {
                    path: "posts",
                    component: () => import("@/views/group/GroupPosts.vue")
                },
                {
                    path: "dopost",
                    component: () => import("@/views/group/PostCreate.vue")
                },
                {
                    path: "accbook",
                    component: () => import("@/views/group/GroupAccBook.vue")
                },
                {
                    path: "community/:postId",
                    component: () => import("@/views/group/GroupCommunityDetail.vue")
                },
                {
                    path: "manage",
                    component: () => import("@/views/group/SignUpManage.vue")
                }
            ] },

        { path: "/my", component: MyPage, redirect: "/my", children: [
            {
                path: "",
                component: () => import("@/views/my/MyInfoView.vue")
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
                path: "review/add",
                component: () => import("@/views/my/MyReviewAddView.vue")
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
                path: "write/:id",
                component: () => import("@/views/my/MyWriteDetailView.vue")
            },

            {
                path: "edit-info",
                component: () => import("@/views/my/MyInfoEditView.vue")
            },

            {
                path: "asset/add",
                component: () => import("@/views/my/AssetAddView.vue")
            },

            {
                path: "asset/:id-modify",
                component: () => import("@/views/my/AssetEditView.vue")
            },
            {
                path: "expend/add",
                component: () => import("@/views/my/AddExpendView.vue")
            },
            {
                path: "expend/:id",
                component: () => import("@/views/my/ModifyExpendView.vue")
            }
        ]},
        { path: "/community", component: CommunityPage, redirect: "/community/free-board",
            children: [
                {
                    path: "free-board",
                    component: () => import("@/views/community/CommunityFreeBoardView.vue")
                },
                {
                    path: "free-board/:id",
                    component: () => import("@/views/community/CommunityPostDetailView.vue")
                },
                {
                    path: "free-board/createPost",
                    component: () => import("@/views/community/CommunityCreatePostView.vue")
                }, 
                {
                    path: "free-board/editPost/:id",
                    component: () => import("@/views/community/CommunityCreatePostView.vue")
                },
                {
                    path: "free-board/:postId/comments",
                    component: () => import("@/views/community/CommunityPostDetailView.vue") 
                },
            

                {
                    path: "my/:id", 
                    component: () => import("@/views/community/CommunityPostDetailView.vue") 
                },

                {
                    path: "scrap",
                    component: () => import("@/views/community/CommunityScrapView.vue")

                },
                {
                    path: "scrap/:id",
                    component: () => import("@/views/community/CommunityPostDetailView.vue")
                },
            ]
},

        { path: "/login", component: LoginPage, meta: {hideHeader:true, hideMenu:true} },
        { path: "/signup", component: SignupPage, meta: {hideHeader:true, hideMenu:true}},
        { path: "/find", component: FindIdPwPage, meta: {hideHeader:true, hideMenu:true}},
        { path: '/confirm', component: Confirm,  meta: {hideHeader:true, hideMenu:true}}
    ],
})

export default router;