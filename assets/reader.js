const pages = [
  ["README.md", "Başlangıç"],
  ["docs/01-ai-llm-temelleri.md", "AI ve LLM Temelleri"],
  ["docs/02-agent-mimarisi.md", "Agent Mimarisi"],
  ["docs/03-identity-access-management.md", "Identity ve Access"],
  ["docs/04-pentest-ve-rapor-dogrulama.md", "Pentest Doğrulama"],
  ["docs/05-ai-threat-modeling.md", "AI Threat Modeling"],
  ["labs/lab-01-local-llm-agent.md", "Lab 01 - Local Agent"],
  ["labs/lab-02-rag-ve-embedding.md", "Lab 02 - RAG"],
  ["labs/lab-03-function-calling-riskleri.md", "Lab 03 - Function Calling"],
  ["labs/lab-04-identity-access-senaryosu.md", "Lab 04 - Identity"],
  ["labs/lab-05-pentest-raporu-dogrulama.md", "Lab 05 - Rapor Doğrulama"],
  ["templates/threat-model-template.md", "Threat Model Şablonu"],
  ["templates/pentest-rapor-dogrulama-checklist.md", "Pentest Checklist"],
  ["docs/kaynaklar.md", "Kaynaklar"]
];

const params = new URLSearchParams(window.location.search);
const requestedPage = params.get("page") || "README.md";
const allowed = new Set(pages.map(([path]) => path));
const page = allowed.has(requestedPage) ? requestedPage : "README.md";
const statusEl = document.querySelector("#reader-status");
const contentEl = document.querySelector("#reader-content");
const menuEl = document.querySelector("#reader-menu");

renderMenu();
loadPage(page);

function renderMenu() {
  pages.forEach(([path, label]) => {
    const link = document.createElement("a");
    link.href = `viewer.html?page=${encodeURIComponent(path)}`;
    link.textContent = label;
    if (path === page) link.classList.add("active");
    menuEl.append(link);
  });
}

async function loadPage(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    const markdown = new TextDecoder("utf-8").decode(buffer);
    contentEl.innerHTML = markdownToHtml(markdown, path);
    statusEl.textContent = "Hazır";
    document.title = `${firstHeading(markdown) || "AI Security"} | Okuyucu`;
  } catch (error) {
    statusEl.textContent = "Hata";
    contentEl.innerHTML = `<h1>Sayfa yüklenemedi</h1><p>${escapeHtml(error.message)}</p>`;
  }
}

function markdownToHtml(markdown, currentPath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCode = false;
  let code = [];
  let inList = false;
  let inOrderedList = false;
  let inTable = false;

  const closeLists = () => {
    if (inList) html.push("</ul>");
    if (inOrderedList) html.push("</ol>");
    inList = false;
    inOrderedList = false;
  };

  const closeTable = () => {
    if (inTable) html.push("</tbody></table>");
    inTable = false;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        closeLists();
        closeTable();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      closeLists();
      closeTable();
      continue;
    }

    if (/^\|(.+)\|$/.test(line.trim())) {
      closeLists();
      const cells = line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
      const next = lines[i + 1] || "";
      const isSeparator = cells.every((cell) => /^:?-{3,}:?$/.test(cell));
      if (isSeparator) continue;
      if (!inTable) {
        const hasHeaderRule = /^\|?[\s:-]+\|[\s|:-]+$/.test(next);
        html.push("<table>");
        html.push(`<thead><tr>${cells.map((cell) => `<th>${formatInline(cell, currentPath)}</th>`).join("")}</tr></thead><tbody>`);
        inTable = true;
        if (hasHeaderRule) i += 1;
      } else {
        html.push(`<tr>${cells.map((cell) => `<td>${formatInline(cell, currentPath)}</td>`).join("")}</tr>`);
      }
      continue;
    }

    closeTable();

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeLists();
      const level = heading[1].length;
      html.push(`<h${level}>${formatInline(heading[2], currentPath)}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*-\s+(.+)$/);
    if (unordered) {
      if (!inList) {
        closeLists();
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${formatInline(unordered[1], currentPath)}</li>`);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      if (!inOrderedList) {
        closeLists();
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${formatInline(ordered[1], currentPath)}</li>`);
      continue;
    }

    closeLists();
    html.push(`<p>${formatInline(line, currentPath)}</p>`);
  }

  closeLists();
  closeTable();
  return html.join("\n");
}

function formatInline(value, currentPath) {
  let output = escapeHtml(value);
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = normalizeHref(href, currentPath);
    return `<a href="${safeHref}">${label}</a>`;
  });
  return output;
}

function normalizeHref(href, currentPath) {
  if (/^https?:\/\//.test(href)) return href;
  if (!href.endsWith(".md")) return href;
  const base = currentPath.includes("/") ? currentPath.split("/").slice(0, -1).join("/") : "";
  const combined = href.startsWith("../")
    ? href.replace("../", "")
    : base
      ? `${base}/${href}`
      : href;
  return `viewer.html?page=${encodeURIComponent(combined)}`;
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
