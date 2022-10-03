const logout = document.querySelector(".logout");

logout?.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "/admin/login";
});
