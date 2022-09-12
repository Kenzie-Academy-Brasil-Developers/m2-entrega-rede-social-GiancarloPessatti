import { Api } from "./models/api.js"
import { Modal } from "../scripts/models/modal.js"

class Login {

    static IrparaRegistro() {

        const botaoirpararegistro = document.getElementsByClassName("irpararegistro")[0]

        botaoirpararegistro.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divRegistro = document.getElementsByClassName("cadastro")[0]
            divRegistro.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")

        })

    }

    static Logar() {

        const botaoLogar = document.getElementsByClassName("logarlogin")[0]
        botaoLogar.addEventListener("click", () => {

            const token = localStorage.getItem("Kenzie:Token")
            if (!token) { }
            else if (token) {

                const divLogin = document.getElementsByClassName("login")[0]
                const divHomepage = document.getElementsByClassName("Homepage")[0]
                const sair = document.getElementsByClassName("sair")[0]
                const registrar = document.getElementsByClassName("registrar")[0]
                const irparalogin = document.getElementsByClassName("irparalogin")[0]

                sair.classList.toggle("show-modal")
                divHomepage.classList.toggle("show-modal")
                divLogin.classList.toggle("show-modal")
                registrar.classList.toggle("show-modal")
                irparalogin.classList.toggle("show-modal")

                Usuario.apresentar()

            }


        })

    }

    static BotaoHeader() {

        const botaoirparalogin = document.getElementsByClassName("irparalogin")[0]
        const botaoirpararegistro = document.getElementsByClassName("registrar")[0]
        botaoirparalogin.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divRegistro = document.getElementsByClassName("cadastro")[0]
            divRegistro.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")
            botaoirparalogin.classList.toggle("clicado")
            botaoirpararegistro.classList.toggle("clicado")

        })
        botaoirpararegistro.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divRegistro = document.getElementsByClassName("cadastro")[0]
            divRegistro.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")
            botaoirpararegistro.classList.toggle("clicado")
            botaoirparalogin.classList.toggle("clicado")


        })

    }

    static BotaoRegistrar() {



    }

    static irparaLogin() {

        const botaoirpararegistro = document.getElementsByClassName("irpara-login")[0]
        const botaovoltar = document.getElementsByClassName("voltar")[0]
        botaoirpararegistro.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divRegistro = document.getElementsByClassName("cadastro")[0]
            divRegistro.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")

        })
        botaovoltar.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divRegistro = document.getElementsByClassName("cadastro")[0]
            divRegistro.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")

        })

    }


}

class Usuario {

    static async Seguir() {

        const botoesseguir = document.querySelectorAll(".ulsugestoes li button")

        botoesseguir.forEach(function (botao) {

            botao.addEventListener("click", () => {

                botao.classList.toggle("seguindoclicado")
                botao.innerText = "Seguindo"
                const id = botao.id
                const body = {

                    following_users_uuid: id

                }

                Api.follow(body)

            })

        })

    }

    static criarcardsugestão(usuario) {

        const ul = document.getElementsByClassName("ulsugestoes")[0]

        const li = document.createElement("li")
        const div = document.createElement("div")
        const button = document.createElement("button")
        div.className = "perfilsite"
        button.innerText = "Seguir"
        button.id = usuario.uuid
        ul.append(li)
        li.append(div, button)

        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const divcarac = document.createElement("div")
        const h2 = document.createElement("h2")
        const h3 = document.createElement("h3")

        div.append(figure, divcarac)
        figure.append(img)
        divcarac.append(h2, h3)

        figure.className = "suafotoperfil"
        img.src = usuario.image
        divcarac.className = "suascaracteristicas"
        h2.innerText = usuario.username
        h3.innerText = usuario.work_at

        this.Seguir()

    }

    static criarposts(posts) {

        const arrayposts = posts.results
        arrayposts.forEach(function (post) {



            const usuario = post.author

            const ulposts = document.getElementById("ulposts")

            const li = document.createElement("li")
            const div = document.createElement("div")
            const tiulopost = document.createElement("h2")
            const brevedesc = document.createElement("p")
            const embaixo = document.createElement("div")

            div.className = "perfilsite"
            embaixo.className = "bottompost"
            tiulopost.innerText = post.title
            brevedesc.innerText = post.description

            ulposts.append(li)
            li.append(div, tiulopost, brevedesc, embaixo)

            const botaomodal = document.createElement("button")
            const coração = document.createElement("img")
            const contador = document.createElement("span")
            contador.id = post.uuid
            botaomodal.id = post.uuid
            embaixo.append(botaomodal, coração, contador)
            botaomodal.addEventListener("click", () => {

                const h2 = document.getElementById("h2modal")
                const h3 = document.getElementById("h3modal")
                const img = document.getElementById("imgmodal")
                const titulo = document.getElementById("titulomodal")
                const texto = document.getElementById("textomodal")

                img.src = usuario.image
                h2.innerText = usuario.username
                h3.innerText = usuario.work_at

                titulo.innerText = post.title
                texto.innerText = post.description

            })


            contador.innerText = post.likes.length
            coração.src = "./src/assets/heartBlack.png"
            coração.id = post.uuid
            botaomodal.setAttribute("data-control-modal", "modal-post")
            botaomodal.innerText = "Abrir Post"

            coração.addEventListener("click", () => {


                if (coração.src == "http://127.0.0.1:5500/m2-entrega-rede-social-GiancarloPessatti/src/assets/heartBlack.png") {
                    coração.src = "./src/assets/heartRed.png"
                    Api.darLike({ post_uuid: coração.id })
                    let numeroantigo = parseInt(contador.innerText)
                    contador.innerText = (numeroantigo + 1)
                } else if (coração.src == "http://127.0.0.1:5500/m2-entrega-rede-social-GiancarloPessatti/src/assets/heartRed.png") {

                    coração.src = "./src/assets/heartBlack.png"
                    Api.tirarLike(coração.id)
                    let numeroantigo = parseInt(contador.innerText)
                    contador.innerText = (numeroantigo - 1)
                }



            })

            const figure = document.createElement("figure")
            const img = document.createElement("img")
            const divcarac = document.createElement("div")
            const h2 = document.createElement("h2")
            const h3 = document.createElement("h3")

            div.append(figure, divcarac)
            figure.append(img)
            divcarac.append(h2, h3)

            figure.className = "suafotoperfil"
            img.src = usuario.image
            divcarac.className = "suascaracteristicas"
            h2.innerText = usuario.username
            h3.innerText = usuario.work_at

            Modal.alterandoModal()

        })




    }

    static fazerpost(){

        const buttonpostar = document.getElementById("botaopostar")
        buttonpostar.addEventListener("click",()=>{

            const titulopost = document.getElementById("inputpost").value
            const textopost = document.getElementById("seupost").value

            let body = {
                title: titulopost,
                description: textopost
            }
            Api.criarNovoPost(body)

        })

    }

    static async apresentar() {

        const meuuuid = localStorage.getItem("Kenzie:Id")

        const fotoperfilminha = document.getElementById("minhaimagem")
        const meunome = document.getElementById("meunome")
        const minhaprofissao = document.getElementById("minhaprofissao")
        const meuusuario = await Api.PegarUsuario(meuuuid)
        const spanseguidores = document.getElementById("meusseguidores")



        const sugestoes = await Api.PegarTodosCadastros()
        const posts = await Api.TodosPosts()
        const numeroaleatorio1 = Math.floor(Math.random() * 10)
        const numeroaleatorio2 = Math.floor(Math.random() * 10)
        const numeroaleatorio3 = Math.floor(Math.random() * 10)
        this.fazerpost()


        this.criarcardsugestão(sugestoes.results[numeroaleatorio1])
        this.criarcardsugestão(sugestoes.results[numeroaleatorio2])
        this.criarcardsugestão(sugestoes.results[numeroaleatorio3])
        this.criarposts(posts)


        fotoperfilminha.src = meuusuario.image
        meunome.innerText = meuusuario.username
        minhaprofissao.innerText = meuusuario.work_at
        spanseguidores.innerText = `${meuusuario.followers_amount} Seguidores`
    }

}

class Logar {

    static fazerLogin() {

        const botaoLogar = document.getElementsByClassName("logarlogin")[0]
        botaoLogar.addEventListener("click", () => {

            const login = document.getElementById("loginemail").value
            const senha = document.getElementById("loginpassword").value

            const bodylogin = {

                email: login,
                password: senha,

            }
            Api.login(bodylogin)

        })

    }

}

class Cadastrar {

    static cadastro() {

        const botaocadastrar = document.getElementsByClassName("RegistroRegistrar")[0]
        botaocadastrar.addEventListener("click", () => {

            this.CapturarDados()

        })

    }


    static CapturarDados() {

        const nome = document.getElementById("nomecadastro").value
        const senha = document.getElementById("cadastropassword").value
        const email = document.getElementById("cadastroemail").value
        const trabalho = document.getElementById("cadastrotrabalho").value
        const foto = document.getElementById("cadastrofoto").value
        const bodycadastro = {

            username: nome,
            email: email,
            password: senha,
            work_at: trabalho,
            image: foto

        }
        Api.cadastro(bodycadastro)

    }


}

class Homepage {

    static sair() {

        const botaosair = document.getElementsByClassName("sair")[0]
        botaosair.addEventListener("click", () => {

            const divLogin = document.getElementsByClassName("login")[0]
            const divHomepage = document.getElementsByClassName("Homepage")[0]
            const sair = document.getElementsByClassName("sair")[0]
            const registrar = document.getElementsByClassName("registrar")[0]
            const irparalogin = document.getElementsByClassName("irparalogin")[0]

            sair.classList.toggle("show-modal")
            divHomepage.classList.toggle("show-modal")
            divLogin.classList.toggle("show-modal")
            registrar.classList.toggle("show-modal")
            irparalogin.classList.toggle("show-modal")

            localStorage.clear()

        })

    }

}


Login.IrparaRegistro()
Login.irparaLogin()
Login.Logar()
Login.BotaoHeader()
Logar.fazerLogin()
Cadastrar.cadastro()
Homepage.sair()