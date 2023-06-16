import { defineStore } from "pinia";
import { usePage } from "@inertiajs/vue3";
import { ref } from "vue";

export const createAppStore = defineStore('appStore', () => {
    const currentUser = ref([])
    const jetstream = ref([])
    function assignPropsFromInertia() {
        currentUser.value = usePage().props.currentUser
        jetstream.value = usePage().props.jetstream
    }

    return {
        currentUser,
        jetstream,
        assignPropsFromInertia,
    }
})
