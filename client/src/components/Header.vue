<template>
    <header class="header">
        <div class="container">
            <nav class="header__nav">
                <RouterLink to="/">Go to Home</RouterLink>
                <RouterLink to="/login">Go to login</RouterLink>
                <RouterLink to="/registration">Go to registration</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
}

.header__nav {
    display: flex;
    gap: 0.5rem;
}
</style>>