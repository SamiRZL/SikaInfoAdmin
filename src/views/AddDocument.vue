<template>
    <div class="add-container">
        <div class="header">
            <div class="back-container">
                <router-link to="/documents">
                    <span> <font-awesome-icon class="icon-back" :icon="['fas', 'arrow-left']" />Retour</span>
                </router-link>
            </div>
            <p>Ajouts de Documents</p>
        </div>

        <ToastNotification :message="message" :isVisible="isVisible" :bgColor="bgc" />
        <form @submit.prevent="submitForm">
            <div class="wrapper-fields">
                <label for="langue">Langues :</label>
                <div class="select-container">
                    <select id="langue" v-model="document.language" required>
                        <option value="" selected disabled>Choisir une langue</option>
                        <option id="french" value="fr">
                            Français
                        </option>
                        <option id="arabe" value="ar">
                            Arabe
                        </option>
                    </select>
                </div>
            </div>
            <div class="wrapper-fields">
                <label for="aspect">Aspects :</label>
                <div class="select-container">
                    <select id="aspect" v-model="document.aspect" required>
                        <option value="" selected disabled>Choisir un aspect</option>
                        <option v-for="aspect in this.Store.aspectsList" :key="aspect._id" :value="aspect._id"
                            :disabled="aspect.language !== document.language">
                            {{ aspect.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="wrapper-fields">
                <label for="category">Catégories :</label>
                <div class="select-container">
                    <select id="category" v-model="document.category" required>
                        <option value="" selected disabled>Choisir une categorie</option>
                        <option v-for="category in this.Store.categoriesList" :key="category._id" :value="category._id"
                            :disabled="category.language !== document.language">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="wrapper-fields">
                <label for="title">Nom :</label>
                <input placeholder="Entrer un nom" v-model="document.title" type="text" id="title" required />
            </div>


            <div class="wrapper-fields">
                <label for="pdf">Pdf :</label>
                <input id="pdf" type="file" @change="handleImageChange" />
            </div>

            <div v-if="!isLoading" class="btn-wrapper">
                <span></span>

                <button type="submit">Ajouter</button>
                <router-link to="/documents"><button class="cancel-btn">Annuler</button></router-link>
            </div>
            <div v-else class="btn-wrapper">
                <button class="loader-btn">
                    <LoaderSpinner :color="white" />
                </button>
                <button class="loader-btn cancel-btn">Annuler</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import LoaderSpinner from "../components/LoaderSpinner.vue";
import ToastNotification from "../components/ToastNotification.vue";
import { useAuthStore } from "../store/index";


export default {
    components: { LoaderSpinner, ToastNotification },
    data() {
        return {
            document: {
                category: "",
                title: "",
                aspect: "",
                language: "",
                pdf: ""
            },
            isLoading: false,
            isVisible: false,
            message: "",
            bgc: "",
        };
    },

    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    methods: {
        submitForm() {
            this.isLoading = true;
            let formData = new FormData();
            formData.append("category", this.document.category);
            formData.append("title", this.document.title);
            formData.append("aspect", this.document.aspect);
            formData.append("language", this.document.language);
            if (this.document.pdf) {
                formData.append("pdf", this.document.pdf);
            }
            axios
                .post("https://sika-info-server.vercel.app/documents/upload-document", formData, {
                    withCredentials: true,
                })
                .then(() => {
                    this.document.category = "";
                    this.document.title = "";
                    this.document.aspect = "";
                    this.document.language = "";
                    this.document.pdf = null;

                    // Set success message and display it
                    this.message = "Document ajouté avec succès!";
                    this.bgc = "success";
                    this.isVisible = true;
                })
                .catch((error) => {
                    console.error("Error submitting blog post", error);
                    this.message = "Une erreur est survenue lors de l'ajout du document.";
                    this.bgc = "error";
                    this.isVisible = true;
                })
                .finally(() => (this.isLoading = false));
        },
        handleImageChange(event) {
            this.document.pdf = event.target.files[0];
        }
    },
    mounted() {
        this.Store.fetchAspects();
        this.Store.fetchCategories();
    },
};
</script>
<style scoped>
.add-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    color: #343637;
    font-family: "Roboto";
    font-style: normal;
    width: 100%;
    gap: 2rem;
    height: auto;
}




form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 3rem;
    width: 30%;
}

.wrapper-fields {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    width: 100%;
}

label {
    margin-left: 3px;
}

.header {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;


    p {
        font-weight: 800;
        font-size: 2rem;
        color: #0090FF;

    }
}

input {
    width: 100%;
    padding: 0.7rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
}

input:focus {
    outline-color: #2196f3;
}

textarea {
    width: 90%;
    padding: 0.7rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);

    &:focus {
        outline-color: #2196f3;
    }
}

.array-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.icon {
    background: red;
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    padding: 2px;
    cursor: pointer;
}

.icon:hover {
    opacity: 0.85;
}

.btn-wrapper {
    width: 70%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin: auto;
    margin-bottom: 2rem;
}

.btn-wrapper a {
    width: 100%;
}

.btn-wrapper span {
    color: #2196f3;
    height: 10px;
    margin-bottom: 7px;
}

button {
    width: 100%;
    height: 50px;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    background: #2196f3;
    font-weight: 500;
    color: #fff;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.85;
    }
}

.loader-btn {
    opacity: 0.85;
    cursor: not-allowed;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cancel-btn {
    background: red !important;
}

.btn-container {
    width: 100%;
    display: flex;
    justify-content: start;
    margin-top: 5px;
}

.btn-container button {
    height: 40px !important;
    background: #53b9ab;
    width: 90% !important;
}

.select-container {
    width: 100%;
    padding: 0.7rem 0.1rem;
    border-radius: 7px;
    background: #fff;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
    display: flex;
    justify-content: start;
}

select {
    width: 97%;
    border: none;
    outline: none;
    cursor: pointer;
    height: 100%;

}

.back-container {
    display: flex;
    position: absolute;
    left: 5%;
    top: 0;
    color: #2196f3;
}

.back-container span {
    font-size: 1rem;
    color: #2196f3;


    &:hover {
        text-decoration: underline;

    }
}

.icon-back {
    margin-right: 5px;
}
</style>
