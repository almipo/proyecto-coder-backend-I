const socket = io();


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const productId = event.target.dataset.id;
        
       
        fetch(`/realtimeproducts/${productId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);  
        })
        .catch(error => {
            console.error("Error al eliminar el producto:", error);
        });
    }
});


socket.on("updateProducts", (productsDb) => {
    const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";

  productsDb.forEach((product) => {
    const productHTML = `
          <div class="container">
            <div class="c1">
            <h3>${product.title}</h3>
            </div>
            <p class="c2">${product.description}</p>
            <p class="c3">Precio: $${product.precio}</p>
            <p class="c4">Código: ${product.code}</p>
            ${
              product.stock
                ? `<p class="hayStock c5">Stock: ${product.stock} unidades</p>`
                : `<p class="noHayStock c5">Stock: ${product.stock} unidades</p>`
            }
        <button class="c6 delete-button" data-id="${product.id}" type="button">Eliminar Producto</button>
          </div>
            `;
            
    productsContainer.innerHTML += productHTML;
});
});

