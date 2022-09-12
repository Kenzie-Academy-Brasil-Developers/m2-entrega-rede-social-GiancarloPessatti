class Api {

    static URLbase = `https://m2-rede-social.herokuapp.com/api`

    static IdUsuario = localStorage.getItem("Kenzie:Id")

    static token = localStorage.getItem("Kenzie:Token")

    static headers = {

        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`

    }

    static async cadastro(usersCadastro) {

        return await fetch(`${this.URLbase}/users/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(usersCadastro)
        })

            .then(resp => resp.json())
    }

    static async login(userslogin) {

        await fetch(`${this.URLbase}/users/login/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(userslogin),
        })
            .then(resp => resp.json())
            .then(resp => {
                localStorage.setItem("Kenzie:Id", resp.user_uuid)
                localStorage.setItem("Kenzie:Token", resp.token)
                console.log(resp)
                return resp
            })
            .catch(err => console.log(err))
    }

    static async PegarTodosCadastros() {

        return await fetch(`${this.URLbase}/users/`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
    }

    static async SeguirUsuario(IDfollower) {
        return await fetch(`${this.URLbase}/users/follow/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(IDfollower)
        })
            .then(resp => resp.json())
    }

    static async TodosPosts() {

        return await fetch(`${this.URLbase}/posts/`, {
            method: "GET",
            headers: this.headers

        })
            .then(resp => resp.json())

    }

    static async criarNovoPost(poster) {
        await fetch(`${this.URLbase}/posts/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(poster)
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))
    }

    static async Unfollow(id) {
        await fetch(`${this.URLbase}/users/unfollow/${id}`, {
            method: "DELETE",
            headers: this.headers
        })
    }

    static async darLike(Idpost) {
        await fetch(`${this.URLbase}/likes/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(Idpost)
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))
    }

    static async tirarLike(Idpost) {
        await fetch(`${this.URLbase}/likes/${Idpost}`, {
            method: "DELETE",
            headers: this.headers
        })
    }
}
export { Api }