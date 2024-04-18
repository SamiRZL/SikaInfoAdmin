import { defineStore } from 'pinia';
import axios from 'axios';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            firstname: "",
            lastname: "",
        },
        categoriesList: [],
        aspectsList: []
    }),

    getters: {

    },

    actions: {


        fetchAspects() {
            axios.get("https://sika-info-server.vercel.app/aspects/all-aspects")
                .then((response) => {
                    this.aspectsList = response.data.aspects;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchCategories() {
            axios.get("https://sika-info-server.vercel.app/categories/all-categories")
                .then((response) => {
                    this.categoriesList = response.data.categories;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

    },
});