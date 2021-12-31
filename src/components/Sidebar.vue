<template>
    <div class="side-bar">
        <div class="page-title">
            <span>Thành viên</span>
        </div>
        <ul class="list-members">
            <li v-for="email in getListEmailuser" v-bind:key="email">{{ email }}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'sidebar',
    computed: {
        ...mapGetters(['getListEmailuser'])
    }

}
</script>
