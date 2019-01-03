<template>
    <div id="app">

    </div>
</template>

<script>
import LS from './../../../r-localstorage/dist/local-storage.esm.js';

export default {
    data() {
        return {
            //
        };
    },
    watch: {
        //
    },
    mounted() {
        // const k = 'demo-bbb';
        // LS.set(k, 'bbb');
        // const a = LS.get('demo-aaa');
        // console.log(a);
        // console.log(a.timestampSaved);
        // console.log(a.value);
        // console.log(new Date(a.timestampSaved));
        console.log(LS.getSurplusCapacityKb());
    },
    methods: {
        //
    }
};
</script>

<style>

</style>