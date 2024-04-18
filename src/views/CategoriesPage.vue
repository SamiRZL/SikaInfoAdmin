<template>
    <ToastNotification :message="message" :isVisible="isVisible" :bgColor="bgc" />

    <ConfirmPanel :deleteElement="deleteCategory" :closeConfirm="closeConfirm" :isShown="isShown" :id="categoryId" />
    <div :style="{ overflowY: isShown ? 'hidden' : 'visible' }" class="categorys-container">
        <div class="header">
            Catégories
        </div>
        <div class="btn-section">
            <div class="filtering-container">
                <button @click="isShownDropdown = !isShownDropdown;">Filtrer
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#0090FF"
                            d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                </button>
                <input placeholder="Chercher une catégorie" v-model="inputSearch" type="text">
                <div v-if="isShownDropdown" class="dropdown">
                    <div class="inner-dropdown">
                        <h4>Par Langue :</h4>
                        <div class="categorys-wrapper">
                            <input type="radio" id="all" value="all" v-model="selectedLanguage">
                            <label for="all">Tout</label>
                            <input type="radio" id="french" value="fr" v-model="selectedLanguage">
                            <label for="french">Français</label>
                            <input type="radio" id="arabe" value="ar" v-model="selectedLanguage">
                            <label for="arabe">Arabe</label>

                        </div>

                    </div>


                </div>
            </div>
            <router-link to="/add-category"><button>Ajouter +</button></router-link>
        </div>
        <table v-if="!isLoading">
            <thead>
                <tr>
                    <th class="nom">Nom</th>
                    <th class="language">
                        Langue
                    </th>
                    <th class="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in filteredCategories" :key="category._id">
                    <td>{{ category.name }}</td>
                    <td>{{ category.language == 'ar' ? 'عربية' : 'français' }}</td>
                    <td class="actions-buttons">
                        <router-link :to="`/update-category/${category._id}`">
                            <svg class="icons  update " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                            </svg>
                        </router-link>

                        <svg @click="openConfirmDelete(category._id)" class="icons delete-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-else>
            <thead>
                <tr class="loading-tr">
                    <th></th>
                </tr>
            </thead>
            <tbody class="loading-body">
                <LoaderSpinner :color="blue" />
            </tbody>
        </table>
    </div>
</template>
<script>
import ToastNotification from "../components/ToastNotification.vue";
import LoaderSpinner from "../components/LoaderSpinner";
import axios from "axios"
import { useAuthStore } from "../store/index";
import ConfirmPanel from "@/components/ConfirmPanel.vue";


export default {
    name: "adminBlogs",
    components: {
        ToastNotification,
        LoaderSpinner,
        ConfirmPanel
    },
    data() {
        return {
            isShown: false,
            categoryId: "",
            isLoading: false,
            isShownDropdown: false,
            categoryFilters: [],
            categoryFiltered: [],
            selectedLanguage: 'all',
            inputSearch: ''
        };
    },
    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    methods: {
        deleteCategory(id) {
            axios
                .delete(`https://sika-info-server.vercel.app/categories/${id}`, { withCredentials: true })
                .then(() => {
                    console.log("Category deleted successfully");
                    this.message = "Catégorie supprimé avec succès !";
                    this.bgc = "success";
                    this.isVisible = true;
                    this.closeConfirm();
                    console.log("executed successfully function");
                    this.Store.fetchCategories();
                })
                .catch((error) => {
                    console.error("Error submitting category post", error);
                    this.message = "Une erreur est survenue lors de la suppression de la catégorie !";
                    this.bgc = "error";
                    this.isVisible = true;
                });
        },
        filterCategories() {
            // Filter categorys based on selected categorys and categories
            return this.Store.categoriesList.filter(category =>
                (!this.inputSearch || category?.name?.includes(this.inputSearch)) &&
                (this.selectedLanguage === 'all' || category.language === this.selectedLanguage)
            );
        },
        openConfirmDelete(id) {
            this.categoryId = id;
            this.isShown = true;
        },
        closeConfirm() {
            this.isShown = false;

        }
    },
    computed: {
        filteredCategories() {
            return this.filterCategories();
        },
    },
    mounted() {
        this.Store.fetchCategories();
    },
};
</script>
<style scoped>
.categorys-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    width: 80%;
}

.header {
    color: #0090FF;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 2rem;

}

.btn-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-spacing: 0;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);

}

thead {
    background: #0090FF;
    color: #fff;
}

tbody {
    background: #fff;
}

.loading-tr {
    background: #0090FF;
    height: 40px;
}

.loading-body {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

th {
    padding: 8px 10px;
    text-align: start;
    border-bottom: 1px solid #ddd;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
}



.actions {
    text-align: start;
    width: 5%;
}

.nom {
    width: 40%;
}


.language {
    width: 30%;
    position: relative;

}

td {
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
    font-weight: 500;
}

.icons {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    fill: #fff;
    border-radius: 2px;

    &:hover {
        opacity: 0.85;
    }
}



.update {
    background: #5bb98b;

}

.info {
    background: #0090FF;
    margin-left: 5px;
}

button {
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    background: #0090FF;
    font-weight: 500;
    font-size: 1rem;
    color: #fff;
    cursor: pointer;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.85;
    }
}

a {
    width: 15%;
}

.delete-icon {
    background: red;
    margin-left: 5px;
}

.name-case {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
}

.filter-icon {
    position: absolute;
    right: 96%;
    bottom: 5px;
    width: 15px;
    height: 15px;
    border-radius: 1px;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }
}

.filter-icon path {
    fill: #fff;
    border: 1px solid #ccc;

}

.dropdown {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1rem;
    left: 0;
    top: 100%;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);

    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 0.5rem 1rem;
    width: auto;
}

.inner-dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 5px;
    width: auto;
}

.categorys-wrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 7px;
    width: auto;



}

.input-checkbox {
    width: 20px !important;
}

.filtering-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 2rem;
    width: 45%;

    button {
        width: 30%;
        background: #E6F4FE;
        color: #0090FF;
        border: 1px solid #0090FF;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    svg {
        width: 15px;
        height: 15px;
        margin-top: 2px;
    }

    input {
        width: 70%;
        padding: 0.55rem 0.5rem;
        border-radius: 7px;
        border: 1px solid #BBBBBB;
        box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
    }
}
</style>
