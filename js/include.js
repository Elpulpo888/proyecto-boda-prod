async function loadComponent(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("header", "/components/header.html");
loadComponent("footer", "/components/footer.html");
