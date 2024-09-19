document.addEventListener("DOMContentLoaded", function () {
    // Seleciona a lista onde os tópicos serão adicionados
    const topcsList = document.getElementById("topcs");

    // Seleciona todos os tópicos
    const topics = document.querySelectorAll(".topic");

    // Itera sobre os tópicos e cria os itens da lista
    topics.forEach(topic => {
        const id = topic.id; // Pega o ID do tópico
        const title = topic.querySelector("h2").textContent; // Pega o texto do título

        // Cria um novo item de lista para o tópico
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#${id}">${title}</a>`; // Link para o ID do tópico

        // Cria uma lista não ordenada para os sub-itens
        const subList = document.createElement("ul");

        // Seleciona todos os itens de lista dentro do tópico
        const subItems = topic.querySelectorAll(".list-item > li");

        // Itera sobre os sub-itens e cria links para eles
        subItems.forEach(subItem => {
            const subItemId = subItem.id; // Pega o ID do sub-item

            // Verifica se o sub-item tem elementos aninhados
            const hasNestedList = subItem.querySelector("ul");

            // Cria um novo item de lista para o sub-item
            const subListItem = document.createElement("li");
            if (hasNestedList) {
                // Se o sub-item tem uma lista aninhada, cria um link apenas para o ID
                subListItem.innerHTML = `<a href="#${subItemId}">${subItemId}</a>`;
            } else {
                // Se não, pega o texto completo
                const subItemText = subItem.innerHTML; // Pega o texto do sub-item
                subListItem.innerHTML = `<a href="#${subItemId}">${subItemText}</a>`;
            }

            // Anexa o sub-item à lista não ordenada
            subList.appendChild(subListItem);
        });

        // Anexa a lista de sub-itens ao item principal
        listItem.appendChild(subList);

        // Adiciona o item à lista principal
        topcsList.appendChild(listItem);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const topcs = document.querySelectorAll('#topcs > li');

    // Ativar o primeiro item da lista
    if (topcs.length > 0) {
        topcs[0].classList.add('active');

        // Ativar o primeiro subitem, se houver
        const firstUl = topcs[0].querySelector('ul');
        if (firstUl) {
            const firstSubItem = firstUl.querySelector('li');
            if (firstSubItem) {
                firstSubItem.classList.add('active');
            }
        }
    }

    topcs.forEach(li => {
        li.addEventListener('click', function () {
            // Remove a classe active de todos os li no nível superior
            topcs.forEach(item => item.classList.remove('active'));

            // Remove a classe active de todos os li dentro das ul
            const subItems = document.querySelectorAll('#topcs li ul li');
            subItems.forEach(subItem => subItem.classList.remove('active'));

            // Adiciona a classe active ao li clicado
            this.classList.add('active');

            // Ativa o primeiro li dentro da ul se houver
            const ul = this.querySelector('ul');
            if (ul) {
                const firstSubItem = ul.querySelector('li');
                if (firstSubItem) {
                    firstSubItem.classList.add('active');
                }
            }
        });
    });

    const subItems = document.querySelectorAll('#topcs li ul li');
    subItems.forEach(subItem => {
        subItem.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede que o evento clique suba para o li pai

            // Remove a classe active de todos os subItems
            subItems.forEach(item => item.classList.remove('active'));

            // Remove a classe active do pai
            const parentLi = this.closest('li');
            if (parentLi) {
                parentLi.classList.remove('active');
            }

            // Adiciona a classe active ao subItem clicado
            this.classList.add('active');
        });
    });
});




// fetch das minhas infos do git hub
fetch('https://api.github.com/users/vitoriaellen03')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let myProfile = document.getElementById('username')
        console.log(myProfile)
        myProfile.innerHTML = data.name

        let myImage = document.getElementById('avatar')
        console.log(myImage)
        myImage.src = data.avatar_url

        let myBio = document.getElementById('bio')
        console.log(myBio)
        myBio.innerHTML = data.bio

        let myLink = document.getElementById('link')
        console.log(myLink)
        myLink.href = data.html_url
    })




    function copiarTexto(elemento) {
        var campoTextoTemporario = document.createElement('textarea');
        campoTextoTemporario.value = elemento.textContent;

        document.body.appendChild(campoTextoTemporario);
        campoTextoTemporario.select();
        campoTextoTemporario.setSelectionRange(0, 99999); // Para dispositivos móveis

        document.execCommand('copy');
        document.body.removeChild(campoTextoTemporario);

        // Cria a mensagem de cópia e adiciona à div com a classe 'alert'
        var alertDiv = document.querySelector('.alert');
        if (alertDiv) {
            var copiedMessage = document.createElement('div');
            copiedMessage.textContent = 'Copiado!!! ✅';
            copiedMessage.classList.add('messege', 'active');

            alertDiv.appendChild(copiedMessage);

            setTimeout(function() {
                copiedMessage.classList.remove('active');
                alertDiv.removeChild(copiedMessage);
            }, 2000);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const codes = document.querySelectorAll('code');

        codes.forEach(code => {
            code.style.cursor = 'pointer'; // Indica que é clicável
            code.addEventListener('click', () => {
                copiarTexto(code); // Chama a função de copiar
            });
        });
    });
