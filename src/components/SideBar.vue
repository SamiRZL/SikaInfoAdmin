<template>
    <aside class="sidebar-container">
        <div class="user-container">
            <svg xmlns="http://www.w3.org/2000/svg" class="admin-icon" viewBox="0 0 448 512">
                <path fill="#202020"
                    d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
            </svg>
            <h1>{{ this.Store.user.firstname }} {{ this.Store.user.firstname }}</h1>
        </div>
        <ul>
            <router-link to="/documents">
                <li
                    :class="`${this.$route.path.includes('/document') || this.$route.path.includes('/add-document') || this.$route.path.includes('/update-document') ? 'li-class active' : 'li-class'}`">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            :class="`${this.$route.path.includes('/documents') || this.$route.path.includes('/add-document') || this.$route.path.includes('/update-document') ? 'active-path' : 'path'}`"
                            d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                    </svg>
                    Documents
                </li>
            </router-link>
            <router-link to="/aspects">
                <li
                    :class="`${this.$route.path.includes('/aspects') || this.$route.path.includes('/add-aspect') || this.$route.path.includes('/update-aspect') ? 'li-class active' : 'li-class'}`">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            :class="`${this.$route.path.includes('/aspects') || this.$route.path.includes('/add-aspect') || this.$route.path.includes('/update-aspect') ? 'active-path' : 'path'}`"
                            d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                    </svg>Aspects
                </li>
            </router-link>
            <router-link to="/categories">
                <li
                    :class="`${this.$route.path.includes('/categories') || this.$route.path.includes('/add-category') || this.$route.path.includes('/update-category') ? 'li-class active' : 'li-class'}`">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            :class="`${this.$route.path.includes('/categories') || this.$route.path.includes('/add-category') || this.$route.path.includes('/update-category') ? 'active-path' : 'path'}`"
                            d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                    </svg>Categories
                </li>
            </router-link>
            <li class="logout"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#113264"
                        d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z" />
                </svg>Log out</li>
        </ul>
    </aside>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from "../store/index";


export default {
    data() {
        return {
            firstname: '',
            lastname: '',
        };
    },
    setup() {
        const Store = useAuthStore();
        return { Store };
    },
    components: {
    },
    methods: {
        getUser() {
            axios.get(`https://sika-info-server.vercel.app/users/loggedUser`, { withCredentials: true })
                .then((response) => {
                    console.log("user fetched", response.data)
                })
                .catch((error) => { console.log("error logging user", error); this.loading = false; })
        },
    },
    mounted() {
        this.getUser()
    }
};
</script>

<style scoped>
.sidebar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 5rem;
    padding: 4rem 2rem;
    background: #fff;
    width: 20%;
    position: fixed;
    height: 100%;
    border-right: 1px solid #ccc;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .1);

}

h1 {
    color: #202020;
}

.admin-icon {
    width: 30px;
    height: 30px;
}

svg {
    width: 25px;
    height: 25px;
    fill: #000;
}

.user-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 80%;
    padding-bottom: 3rem;
    border-bottom: 1px solid #ccc;
}

ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    justify-content: center;
    gap: 5px;
}

li {
    list-style-type: none;
    color: #113264;
    font-weight: 600;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;

    &:hover {
        background: #0090FF;
        color: #fff;
    }

}

a {
    width: 100%;
}


li:hover svg path {
    fill: #fff
}

.active {
    background: #0090FF;
    color: #fff;
}

.active-path {
    fill: #fff
}

.path {
    fill: #113264
}

.logout {
    margin-top: 5rem;

    &:hover {
        color: red;
        background: none;
    }

    &:hover svg path {
        fill: red
    }
}
</style>
