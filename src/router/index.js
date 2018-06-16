import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/order',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/hotel',
                    component: resolve => require(['../components/page/hotel.vue'], resolve),
                    meta: { title: '酒店主页' }
                },
                {
                    // banner
                    path: '/catebanner',
                    component: resolve => require(['../components/page/cate-banner.vue'], resolve),
                    meta: { title: 'banner管理' }
                },
                {
                    // 美食菜谱
                    path: '/catelist',
                    component: resolve => require(['../components/page/cate-list.vue'], resolve),
                    meta: { title: '美食菜谱' }
                },
                {
                    // 客房服务
                    path: '/servicelist',
                    component: resolve => require(['../components/page/service-list.vue'], resolve),
                    meta: { title: '客房服务' }
                },
                {
                    // 菜品管理
                    path: '/catemangage',
                    component: resolve => require(['../components/page/cate-mangage.vue'], resolve),
                    meta: { title: '菜品管理' }
                },
                {
                    //服务产品管理
                    path: '/servicemangage',
                    component: resolve => require(['../components/page/service-mangage.vue'], resolve),
                    meta: { title: '服务管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            meta: { title : '铂尔曼'}
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
             meta: { title : '403'}
        },
        {
            path: '*',
            redirect: '/404',
            meta: { title : '404'}
        }
    ]
})
