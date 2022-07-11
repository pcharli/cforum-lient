const urlApi =  "http://localhost/ingrwf10/forum/api/"


fetch(urlApi + 'posts')
.then( response => response.json())
.then( response => {
  console.log(response)


  response.data.forEach(function(item){
    let template = ''
    let dateAff = new Date(item.date)
    dateAff = dateAff.toLocaleDateString()
        template += `<details data-id="${item.id}">`
        template += `   <summary><strong>${item.titre}</strong> - par ${item.login} - le ${dateAff}</summary>`
        template += `<p>${item.contenu}</p>`
        template += `<h2>Les réponses</h2>`
        template += `<ul class="responses">`
        template += `</ul>`
        template += `</details>`

        document.querySelector('.list').innerHTML += template
        get_responses(item.id)
        })
    })
    .catch( error => console.log(error))

   function get_responses(id) {
    fetch(urlApi + `posts/${id}`)
        .then( response => response.json())
        .then( response => {
            let template = ''
            response.data.forEach(function(item){
                let dateAff = new Date(item.date)
                dateAff = dateAff.toLocaleDateString()
                template += `<li><strong>${item.titre}</strong> par ${item.login} - le ${dateAff}</li>`

            })
            document.querySelector(`[data-id="${id}"] .responses`).innerHTML += template
        })
        .catch( error => console.log(error))
   }