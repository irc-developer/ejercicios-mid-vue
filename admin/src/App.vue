<script setup lang="ts"></script>

<template>
    <div>
        <header>
            <div class="wrapper">
                <h3>Admin</h3>

                <nav>
                    <RouterLink to="/users">Usuarias</RouterLink>
                </nav>
            </div>
        </header>

        <RouterView />
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
