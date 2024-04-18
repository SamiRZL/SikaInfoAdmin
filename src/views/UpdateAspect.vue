<template>
    <div class="add-container">
        <div class="header">
            <div class="back-container">
                <router-link to="/aspects">
                    <span> <font-awesome-icon class="icon-back" :icon="['fas', 'arrow-left']" />Retour</span>
                </router-link>
            </div>
            <p>Modification d'Aspects</p>
        </div>

        <ToastNotification :message="message" :isVisible="isVisible" :bgColor="bgc" />
        <form @submit.prevent="submitForm">
            <div class="wrapper-fields">
                <label for="langue">Langues :</label>
                <div class="select-container">
                    <select id="langue" v-model="aspect.language" required>
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
                <label for="name">Nom :</label>
                <input placeholder="Entrer un nom" v-model="aspect.name" type="text" id="name" required />
            </div>




            <div v-if="!isLoading" class="btn-wrapper">
                <button type="submit">Modifier</button>
                <router-link to="/aspects"><button class="cancel-btn">Annuler</button></router-link>
            </div>
            <div v-else class="btn-wrapper">
                <!-- <span>Aspect en cours d'enregistrement... Veuillez patienter.</span>-->
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
            aspect: {
                name: "",
                language: ""
            },
            isLoading: false,
            isVisible: false,
            message: "",
            bgc: "",
            isLoadingPage: true,
        };
    },

    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    methods: {
        submitForm() {
            this.isLoading = true;
            let data = {
                name: this.aspect.name,
                language: this.aspect.language,
            };


            axios
                .put(`https://sika-info-server.vercel.app/aspects/${this.$route.params.id}`, data, {
                    withCredentials: true,
                })
                .then(() => {
                    this.$router.push({ path: "/aspects" });

                    // Set success message and display it
                    this.message = "Aspect modifié avec succès!";
                    this.bgc = "success";
                    this.isVisible = true;
                })
                .catch((error) => {
                    console.error("Error submitting blog post", error);
                    this.message = "Une erreur est apparue lors de l'enregistrement de l'aspect.";
                    this.bgc = "error";
                    this.isVisible = true;
                })
                .finally(() => (this.isLoading = false));
        },

        fetchAspect() {

            axios.get(`https://sika-info-server.vercel.app/aspects/${this.$route.params.id}`)
                .then((response) => {
                    this.aspect.language = response.data.language;
                    this.aspect.name = response.data.name;
                    this.isLoadingPage = false;
                })
                .catch((error) => { console.error(error); this.isLoadingPage = false; });
        },
    },
    mounted() {
        this.fetchAspect()
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
    overflow: visible;
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
