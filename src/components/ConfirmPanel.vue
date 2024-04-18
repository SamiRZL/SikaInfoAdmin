<template>
    <div v-if="isShown" class="confirm-container">
        <div class="confirm-delete">
            <h3>Êtes vous sure de vouloir supprimer cet élément ?</h3>

            <div class="btn-container">
                <button @click="deleteElement(this.id)">Supprimer</button>
                <button @click="this.closeConfirm()" class="btn-no">Annuler</button>
            </div>
        </div>
    </div>
</template>
<script>
//import LoaderComponent from './LoaderComponent';

export default {
    name: "ConfirmPanel",

    props: {
        isShown: Boolean,
        id: String,
        closeConfirm: Function,
        deleteElement: Function
    },
    data() {
        return {
        };
    },

    methods: {

    },
};
</script>
<style scoped>
body {
    overflow-y: hidden;
}

.confirm-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(128, 128, 128, 0.568);
    z-index: 2000;
    overflow-y: hidden;
    position: fixed;
}

h3 {
    color: #343637;
    font-style: normal;
    font-size: 1.25rem;
}

.btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 3rem;
}

button {
    width: 20%;
    height: 40px;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: none;
    background: #2196f3;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.85;
    }
}

.btn-no {
    background: red;
}

.confirm-delete {
    display: flex;
    padding: 1rem;
    border-radius: 10px;
    flex-direction: column;

    justify-content: space-around;
    align-items: center;
    background: #f4f7fe;
    border: 2px solid #edeff2;
    width: 40%;
    height: 30%;
}
</style>
