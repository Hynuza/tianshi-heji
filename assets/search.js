(() => {
  const input = document.getElementById("entry-filter");
  if (!input) return;

  const status = document.getElementById("search-status");
  const empty = document.getElementById("search-empty");
  const items = Array.from(document.querySelectorAll(".word-list li"));
  const groups = Array.from(document.querySelectorAll("section.group, section.weak"));
  const letterLinks = Array.from(document.querySelectorAll(".letter-nav a"));

  const total = items.length;

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;

    for (const li of items) {
      const hay = (li.textContent || "").toLowerCase();
      const match = !q || hay.includes(q);
      li.hidden = !match;
      if (match) shown += 1;
    }

    for (const group of groups) {
      const any = Array.from(group.querySelectorAll(".word-list li")).some((li) => !li.hidden);
      group.hidden = Boolean(q) && !any;
    }

    for (const a of letterLinks) {
      const id = (a.getAttribute("href") || "").slice(1);
      const section = id ? document.getElementById(id) : null;
      const li = a.closest("li");
      if (li) li.hidden = Boolean(q) && (!section || section.hidden);
    }

    if (status) {
      if (!q) {
        status.hidden = true;
        status.textContent = "";
      } else {
        status.hidden = false;
        status.textContent = `显示 ${shown} / ${total} 条`;
      }
    }

    if (empty) empty.hidden = !(q && shown === 0);
  };

  input.addEventListener("input", apply);
  input.addEventListener("search", apply);
})();
