const deleteProduct = (productId) => {
  const csrfToken = document.querySelector('input[name="_csrf"]').value;
  const productElement = document.getElementById(productId);

