
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import DocumentsPage from '../views/DocumentsPage.vue';
import AspectsPage from '../views/AspectsPage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import AddDocument from '../views/AddDocument.vue';
import AddAspect from '../views/AddAspect.vue';
import AddCategory from '../views/AddCategory.vue';
import UpdateAspect from '../views/UpdateAspect.vue';
import UpdateDocument from '../views/UpdateDocument.vue';
import UpdateCategory from '../views/UpdateCategory.vue';
//import About from '../views/About.vue';

const routes = [
    {
        path: "/",
        name: "login",
        component: LoginPage,
        meta: { showSidebar: false }
    },
    {
        path: "/aspects",
        name: "AspectsPage",
        component: AspectsPage,
        //  meta: { showSidebar: false }
    },
    {
        path: "/documents",
        name: "DocumentsPage",
        component: DocumentsPage,
        //  meta: { showSidebar: false }
    },
    {
        path: "/categories",
        name: "CategoriesPage",
        component: CategoriesPage,
        //  meta: { showSidebar: false }
    },
    {
        path: "/add-document",
        name: "AddDocumentPage",
        component: AddDocument,
        //  meta: { showSidebar: false }
    },
    {
        path: "/add-aspect",
        name: "AddAspectPage",
        component: AddAspect,
        //  meta: { showSidebar: false }
    },
    {
        path: "/add-category",
        name: "AddCategoryPage",
        component: AddCategory,
        //  meta: { showSidebar: false }
    },
    {
        path: "/update-document/:id",
        name: "UpdateDocumentPage",
        component: UpdateDocument,
        //  meta: { showSidebar: false }
    },
    {
        path: "/update-aspect/:id",
        name: "UpdateAspectPage",
        component: UpdateAspect,
        //  meta: { showSidebar: false }
    },
    {
        path: "/update-category/:id",
        name: "UpdateCategoryPage",
        component: UpdateCategory,
        //  meta: { showSidebar: false }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;





