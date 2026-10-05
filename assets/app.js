const items = [
  "LLM, transformer ve token mantığını kendi cümlelerimle açıklayabiliyorum.",
  "Context window limitinin güvenlik ve veri sızıntısı etkisini açıklayabiliyorum.",
  "Embedding ve RAG akışını küçük bir örnekle kurabiliyorum.",
  "Function calling/tool calling risklerini listeleyebiliyorum.",
  "MCP'nin hangi problemi çözdüğünü ve risklerini açıklayabiliyorum.",
  "Human, workload, service ve agent identity farklarını biliyorum.",
  "RBAC, least privilege ve conditional access ilişkisini kurabiliyorum.",
  "Pentest raporundaki bir bulguyu yeniden üretebiliyorum.",
  "AI agent için pentest -> analiz -> advice akışını tasarlayabiliyorum.",
  "Bir AI sistemi için threat model dokümanı çıkarabiliyorum."
];

const key = "ai-security-learning-checklist";
const saved = JSON.parse(localStorage.getItem(key) || "{}");
const list = document.querySelector("#checklist");

items.forEach((item, index) => {
  const row = document.createElement("label");
  row.className = "check";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(saved[index]);

  const text = document.createElement("span");
  text.textContent = item;

  if (input.checked) row.classList.add("done");

  input.addEventListener("change", () => {
    saved[index] = input.checked;
    localStorage.setItem(key, JSON.stringify(saved));
    row.classList.toggle("done", input.checked);
  });

  row.append(input, text);
  list.append(row);
});

document.querySelector("#reset").addEventListener("click", () => {
  localStorage.removeItem(key);
  window.location.reload();
});
