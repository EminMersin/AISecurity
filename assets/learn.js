const contentIndex = [
  { title: "AI ve LLM Temelleri", type: "Doküman", tags: "llm transformer context window embedding rag", url: "viewer.html?page=docs/01-ai-llm-temelleri.md", summary: "LLM, transformer, context, embedding ve RAG temel modeli." },
  { title: "Agent Mimarisi", type: "Doküman", tags: "agent function calling tool mcp excessive agency", url: "viewer.html?page=docs/02-agent-mimarisi.md", summary: "Agent döngüsü, tool calling ve MCP boundary riskleri." },
  { title: "Identity ve Access Management", type: "Doküman", tags: "identity iam rbac conditional access least privilege", url: "viewer.html?page=docs/03-identity-access-management.md", summary: "Human, workload, service ve agent identity modeli." },
  { title: "Pentest ve Rapor Doğrulama", type: "Doküman", tags: "pentest report validation false positive evidence retest", url: "viewer.html?page=docs/04-pentest-ve-rapor-dogrulama.md", summary: "Pentest bulgularını doğrulama ve kanıt kalitesi ölçme." },
  { title: "AI Threat Modeling", type: "Doküman", tags: "threat modeling abuse case asset trust boundary owasp atlas", url: "viewer.html?page=docs/05-ai-threat-modeling.md", summary: "AI sistemleri için threat actor, abuse case ve kontrol analizi." },
  { title: "Local LLM Agent Lab", type: "Lab", tags: "local agent tool security setup", url: "viewer.html?page=labs/lab-01-local-llm-agent.md", summary: "Yerel agent kurulumu ve tool sınırı gözlemi." },
  { title: "RAG ve Embedding Lab", type: "Lab", tags: "rag embedding vector store prompt injection", url: "viewer.html?page=labs/lab-02-rag-ve-embedding.md", summary: "Retrieval sonucu ve doküman seviyesinde erişim riski." },
  { title: "Function Calling Riskleri Lab", type: "Lab", tags: "function calling tool validation email exfiltration", url: "viewer.html?page=labs/lab-03-function-calling-riskleri.md", summary: "Tool parametre doğrulama ve veri sızıntısı kontrolü." },
  { title: "Identity Access Senaryosu", type: "Lab", tags: "identity access permission matrix conditional access", url: "viewer.html?page=labs/lab-04-identity-access-senaryosu.md", summary: "AI agent için permission matrisi ve audit modeli." },
  { title: "Pentest Rapor Doğrulama Lab", type: "Lab", tags: "idor evidence validation retest", url: "viewer.html?page=labs/lab-05-pentest-raporu-dogrulama.md", summary: "Bir bulgunun teknik doğrulama kalitesini ölçme." },
  { title: "Aktif Öğrenme Alanı", type: "Araç", tags: "quiz canvas simulator pentest rag agent", url: "workbench.html", summary: "Quiz, canvas, pentest checker ve risk simülatörleri." }
];

const glossary = [
  { term: "LLM", meaning: "Verilen context'e göre token olasılığı üreten büyük dil modeli.", risk: "Yanlış veya doğrulanmamış çıktı kritik kararlara taşınabilir.", url: "viewer.html?page=docs/01-ai-llm-temelleri.md" },
  { term: "Context Window", meaning: "Modelin aynı anda işleyebildiği prompt, geçmiş, tool çıktısı ve RAG içeriği sınırı.", risk: "Gizli veri context'e girerse yanıtta veya logda sızabilir.", url: "viewer.html?page=docs/01-ai-llm-temelleri.md" },
  { term: "Embedding", meaning: "Metni sayısal vektöre dönüştürerek anlam benzerliği aramayı sağlar.", risk: "Vector store hassas veri veya yetkisiz retrieval riski doğurur.", url: "viewer.html?page=docs/01-ai-llm-temelleri.md" },
  { term: "RAG", meaning: "Model yanıtını dış kaynaklardan getirilen içerikle destekleyen mimari.", risk: "Prompt injection içeren doküman context'e instruction gibi girebilir.", url: "viewer.html?page=labs/lab-02-rag-ve-embedding.md" },
  { term: "Function Calling", meaning: "Modelin yapılandırılmış tool çağrısı önermesi ve uygulamanın bunu çalıştırması.", risk: "Parametre doğrulanmazsa yetkisiz işlem veya veri sızıntısı oluşur.", url: "viewer.html?page=labs/lab-03-function-calling-riskleri.md" },
  { term: "MCP", meaning: "AI uygulamalarının tool ve kaynaklara standart protokolle bağlanmasını sağlar.", risk: "MCP server yeni bir trust boundary ve yetki yüzeyi oluşturur.", url: "viewer.html?page=docs/02-agent-mimarisi.md" },
  { term: "Agent Identity", meaning: "Agent'ın dış sistemlerde hangi kimlik ve yetkiyle işlem yaptığını tanımlar.", risk: "Paylaşılan veya geniş yetkili identity blast radius'u büyütür.", url: "viewer.html?page=docs/03-identity-access-management.md" },
  { term: "Threat Model", meaning: "Asset, actor, trust boundary, abuse case ve kontrollerin sistematik analizi.", risk: "Eksik model, AI özel risklerin test planına girmemesine neden olur.", url: "viewer.html?page=docs/05-ai-threat-modeling.md" }
];

const rolePlans = {
  starter: ["01 AI ve LLM Temelleri", "02 Agent Mimarisi", "Quiz çöz", "RAG simülasyonunu çalıştır", "Kavram sözlüğünden 8 terimi özetle"],
  security: ["Pentest ve Rapor Doğrulama", "Function Calling Riskleri Lab", "Pentest kontrol aracını kullan", "Threat Model Canvas doldur", "False positive kontrol raporu üret"],
  builder: ["Agent Mimarisi", "Identity ve Access Management", "RAG ve Embedding Lab", "Agent tool-calling simülasyonu", "Tool execution policy yaz"],
  architect: ["AI Threat Modeling", "Identity Access Senaryosu", "Threat Model Canvas", "Permission matrisi üret", "Final risk ve kontrol planı çıkar"]
};

const rolePlan = document.querySelector("#role-plan");
document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-role]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const plan = rolePlans[button.dataset.role];
    rolePlan.innerHTML = `<ol>${plan.map((item) => `<li>${item}</li>`).join("")}</ol>`;
  });
});
document.querySelector('[data-role="starter"]')?.click();

const search = document.querySelector("#site-search");
const results = document.querySelector("#search-results");
function renderResults(query = "") {
  const normalized = query.trim().toLowerCase();
  const matches = contentIndex.filter((item) => !normalized || `${item.title} ${item.type} ${item.tags} ${item.summary}`.toLowerCase().includes(normalized));
  results.innerHTML = matches.map((item) => `
    <article class="search-card">
      <span>${item.type}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <a href="${item.url}">Aç</a>
    </article>
  `).join("");
}
search?.addEventListener("input", (event) => renderResults(event.target.value));
renderResults();

const glossaryGrid = document.querySelector("#glossary-grid");
if (glossaryGrid) {
  glossaryGrid.innerHTML = glossary.map((item) => `
    <article class="glossary-card">
      <h3>${item.term}</h3>
      <p><strong>Tanım:</strong> ${item.meaning}</p>
      <p><strong>Güvenlik etkisi:</strong> ${item.risk}</p>
      <a href="${item.url}">İlgili içeriğe git</a>
    </article>
  `).join("");
}

const labTemplates = {
  rag: {
    title: "RAG Güvenliği Labı",
    risk: "Yetkisiz doküman retrieval'a girer veya prompt injection içeren doküman model davranışını etkiler.",
    tasks: ["3 doküman seç: public, confidential, malicious", "Her doküman için erişim rolü belirle", "Retrieval öncesi ACL kontrolünü yaz", "Model context'ine girecek içeriği instruction/data ayrımıyla sarmala"]
  },
  agent: {
    title: "Agent Tool Calling Labı",
    risk: "Agent geniş yetkiyle yanlış tool çağırır veya kullanıcı girdisini doğrulamadan aksiyona taşır.",
    tasks: ["Agent tool listesini çıkar", "Her tool için required permission yaz", "Kritik tool için human approval koşulu belirle", "Tool parametre schema ve denylist tasarla"]
  },
  identity: {
    title: "Identity ve Access Labı",
    risk: "Agent veya servis hesabı gereğinden fazla yetkiyle çalışır.",
    tasks: ["Human, service ve agent identity ayrımını yap", "Permission matrisi oluştur", "Conditional Access koşullarını yaz", "Audit log alanlarını belirle"]
  },
  pentest: {
    title: "Pentest Rapor Doğrulama Labı",
    risk: "Bulgu kanıtı eksik, etki abartılı veya false positive olabilir.",
    tasks: ["Bulgu başlığı ve endpoint'i yaz", "Request/response kanıtını kontrol et", "Farklı rollerle yeniden üret", "Retest acceptance criteria yaz"]
  }
};

const generateLab = document.querySelector("#generate-lab");
const labOutput = document.querySelector("#lab-output");
if (generateLab) {
  generateLab.addEventListener("click", () => {
    const data = Object.fromEntries(new FormData(document.querySelector("#lab-form")).entries());
    const lab = labTemplates[data.focus];
    const difficultyNotes = {
      beginner: "Komut veya kod yazmadan önce veri akışını ve riski sözlü olarak açıklayın.",
      intermediate: "En az bir test adımı ve bir kontrol önerisi üretin.",
      advanced: "Testi otomasyona dönüştürün ve kabul kriteri yazın."
    };
    const markdown = `# ${lab.title}\n\n## Zorluk\n${data.difficulty}\n\n## Beklenen Çıktı\n${data.output}\n\n## Ana Risk\n${lab.risk}\n\n## Görevler\n${lab.tasks.map((task) => `- ${task}`).join("\n")}\n\n## Ek Talimat\n${difficultyNotes[data.difficulty]}\n\n## Teslim Formatı\n- Teknik özet\n- Kanıt veya karar matrisi\n- Risk seviyesi\n- Önerilen kontrol\n- Retest veya doğrulama adımı\n`;
    labOutput.value = markdown;
  });
}

document.querySelector("#copy-lab")?.addEventListener("click", async () => copyText(labOutput, "#copy-lab"));

const checklistItems = [
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

const generateReport = document.querySelector("#generate-progress-report");
if (generateReport) {
  generateReport.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("ai-security-learning-checklist") || "{}");
    const quiz = localStorage.getItem("ai-security-quiz-score") || "Henüz yok";
    const threat = localStorage.getItem("ai-security-last-threat-model") || "Henüz threat model çıktısı yok.";
    const done = checklistItems.filter((_item, index) => saved[index]).length;
    const report = `# AI Security Öğrenme İlerleme Raporu\n\n## Genel Durum\n- Tamamlanan hedef: ${done}/${checklistItems.length}\n- Quiz skoru: ${quiz}\n\n## Checklist\n${checklistItems.map((item, index) => `- [${saved[index] ? "x" : " "}] ${item}`).join("\n")}\n\n## Son Threat Model Çıktısı\n\n${threat}\n`;
    document.querySelector("#progress-output").value = report;
  });
}

document.querySelector("#copy-progress-report")?.addEventListener("click", async () => copyText(document.querySelector("#progress-output"), "#copy-progress-report"));

async function copyText(textarea, buttonSelector) {
  await navigator.clipboard.writeText(textarea.value || "");
  const button = document.querySelector(buttonSelector);
  button.textContent = "Kopyalandı";
  setTimeout(() => button.textContent = "Kopyala", 1400);
}
