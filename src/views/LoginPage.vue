<template>
    <div class="login-page">
        <div class="login-container">
            <div class="title-container">
                <h1>Login to your account</h1>
                <font-awesome-icon class="icon" :icon="['fas', 'user-tie']" />
            </div>
            <form @submit.prevent="submit">
                <div class="input-wrapper">
                    <label for="email">Email</label>
                    <input v-model="email" placeholder="Enter your email" id="email" required type="text">
                </div>
                <div class="input-wrapper">
                    <label for="password">Password</label>
                    <input v-model="password" placeholder="*********" id="password" required type="text">
                </div>
                <button v-if="!loading" type="submit">Login</button>
                <button class="loading-btn" v-else>
                    <LoaderSpinner :color="white" />
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LoaderSpinner from "../components/LoaderSpinner"
import { useAuthStore } from "../store/index";

export default {
    name: "LoginPage",
    components: {
        LoaderSpinner
    },
    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    data() {
        return {
            loading: false,
            email: "",
            password: "",
        };
    },
    methods: {
        submit() {
            this.loading = true;
            let user = {
                email: this.email,
                password: this.password,
            };
            axios.post("https://sika-info-server.vercel.app/users/loginUser", user, { withCredentials: true })
                .then((response) => {
                    console.log("user logged successfully");
                    this.Store.user.firstname = response.data.data.firstname;
                    this.Store.user.lastname = response.data.data.lastname;
                    this.loading = false;
                    this.$router.push({
                        path: '/documents',
                        // query: { id: this.project._id },
                    });
                })
                .catch((error) => { console.log("error logging user", error); this.loading = false; })
        }

    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: start;
    margin-left: 20%;
}

.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 3rem 1rem;
    flex-direction: column;
    gap: 3.5rem;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    gap: 2rem;
}

input {
    width: 100%;
    padding: 0.8rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #BBBBBB;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
}

label {
    font-weight: 600;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    gap: 5px;
}

button {
    width: 100%;
    padding: 0.7rem 2rem;
    font-size: 1.3rem;
    background: #0090FF;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 7px;
    margin-top: 2rem;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }
}

.loading-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.icon {
    width: 20px;
    height: 20px;
}

h1 {
    font-size: 1.7rem;
    font-weight: 600;
}
</style>
