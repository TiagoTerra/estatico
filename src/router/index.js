import { createWebHistory, createRouter } from "vue-router";
import { Buffer } from 'buffer';

const routes = [
    {
        path: "/helloworld",
        component: () => import('../components/HelloWorld.vue'),
    },
    {
        // path: "/home",
        // component: () => import('../components/WelcomeView.vue'),
        // meta: { breadcrumb: "Home" }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {

    if (to.fullPath != '/') {
        if (localStorage.token != null) {
            console.log(from);
            console.log(to);

            const jwtPayload = parseJwt(localStorage.token);
            if (jwtPayload.exp < Date.now() / 1000) {
                // token expired
                deleteTokenFromLocalStorage();
                next("/");
            }
            next();
        } else {
            next("/");
        }
    }
    else {
        next();
    }

})

function deleteTokenFromLocalStorage() {
    localStorage.removeItem("token");
}
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const currentUser = getCurrentUser() // Implemente esta função para obter o usuário atual

//   if (requiresAuth && !currentUser) {
//     next('/login') // Redirecionar para a página de login se não estiver autenticado
//   } else {
//     next() // Continuar a navegação
//   }
// })

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export default router;