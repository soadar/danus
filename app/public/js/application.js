
window.addEventListener("load", (event) => {
  const year = document.querySelector("#year");
  if (year) {
    year.innerHTML = new Date().getFullYear();
  }

  const cards = document.querySelectorAll(".card")

  cards.forEach((element) => {
    element.addEventListener("click", async (event) => {
      prod = event.target.alt.toLowerCase();

      window.location.href = `/productos?products=${prod}`
      // const response = await fetch("/productos", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json; charset=UTF-8" },
      //   body: JSON.stringify({ flag: "lalala" })
      // });
      // console.log(response.status);
    });
  })


});
// const form = document.getElementById("form");
// if (form) {
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//   });
// };

