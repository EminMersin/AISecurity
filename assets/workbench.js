const quizQuestions = [
  {
    question: "RAG sisteminde access control en kritik olarak nerede uygulanmalıdır?",
    options: ["Sadece final yanıtta", "Retrieval öncesi ve doküman seviyesinde", "Sadece model seçiminde"],
    answer: 1,
    explain: "Kullanıcının görmemesi gereken doküman retrieval aşamasında context'e girmemelidir."
  },
  {
    question: "Function calling güvenliğinde model çıktısı nasıl ele alınmalıdır?",
    options: ["Doğrudan çalıştırılabilir", "Untrusted input olarak doğrulanmalıdır", "Sadece loglanması yeterlidir"],
    answer: 1,
    explain: "Modelin önerdiği tool ve parametreler schema, policy ve gerekirse insan onayı ile kontrol edilmelidir."
  },
  {
    question: "Agent identity için en riskli yaklaşım hangisidir?",
    options: ["Per-agent scoped identity", "Just-in-time token", "Paylaşılan geniş yetkili servis hesabı"],
    answer: 2,
    explain: "Paylaşılan ve geniş yetkili hesaplar izlenebilirliği zayıflatır ve blast radius'u büyütür."
  },
  {
    question: "Prompt injection en çok hangi ayrımı bozmaya çalışır?",
    options: ["Instruction ve data ayrımı", "CSS ve HTML ayrımı", "CPU ve GPU ayrımı"],
    answer: 0,
    explain: "Zararlı içerik, veri gibi görünürken modele instruction gibi davranmasını söyleyebilir."
  },
  {
    question: "Pentest raporu doğrulamada en zayıf kanıt hangisidir?",
    options: ["Request/response ve rol bilgisi", "Sadece ekran görüntüsü", "Retest adımı ve beklenen sonuç"],
    answer: 1,
    explain: "Tek başına ekran görüntüsü yeniden üretilebilirlik ve server-side etkiyi kanıtlamak için zayıftır."
  }
];

const quizList = document.querySelector("#quiz-list");
if (quizList) {
  quizQuestions.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "quiz-card";
    card.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${index}" value="${optionIndex}"> ${option}`;
      card.append(label);
    });
    const explanation = document.createElement("p");
    explanation.className = "quiz-explain";
    explanation.hidden = true;
    card.append(explanation);
    quizList.append(card);
  });
}

const gradeQuiz = document.querySelector("#grade-quiz");
if (gradeQuiz) {
  gradeQuiz.addEventListener("click", () => {
    let score = 0;
    quizQuestions.forEach((item, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      const card = selected?.closest(".quiz-card") || document.querySelectorAll(".quiz-card")[index];
      const explanation = card.querySelector(".quiz-explain");
      const selectedValue = selected ? Number(selected.value) : -1;
      const correct = selectedValue === item.answer;
      if (correct) score += 1;
      card.classList.toggle("correct", correct);
      card.classList.toggle("wrong", !correct);
      explanation.hidden = false;
      explanation.textContent = `${correct ? "Doğru." : "Tekrar bak."} ${item.explain}`;
    });
    const result = `${score}/${quizQuestions.length}`;
    localStorage.setItem("ai-security-quiz-score", result);
    document.querySelector("#quiz-result").textContent = `Skor: ${result}`;
  });
}

const threatButton = document.querySelector("#generate-threat-model");
if (threatButton) {
  threatButton.addEventListener("click", () => {
    const data = Object.fromEntries(new FormData(document.querySelector("#threat-form")).entries());
    const markdown = `# ${data.system || "AI Threat Model"}\n\n## Sistem Amacı\n${data.purpose || "-"}\n\n## Korunan Assetler\n${toList(data.assets)}\n\n## Threat Actorlar\n${toList(data.actors)}\n\n## Trust Boundary'ler\n${toList(data.boundaries)}\n\n## Abuse Case'ler\n${toList(data.abuse)}\n\n## Kontroller\n${toList(data.controls)}\n\n## Test Planı\n${toList(data.tests)}\n\n## Kabul Kriterleri\n- Kritik tool çağrıları onay mekanizmasına bağlı.\n- RAG sonuçları kullanıcı yetkisine göre filtreleniyor.\n- Agent identity least privilege ile sınırlandırılmış.\n- Prompt injection, access control ve data leakage testleri tanımlı.\n`;
    const output = document.querySelector("#threat-output");
    output.value = markdown;
    localStorage.setItem("ai-security-last-threat-model", markdown);
  });
}

const copyThreat = document.querySelector("#copy-threat-model");
if (copyThreat) {
  copyThreat.addEventListener("click", async () => {
    const output = document.querySelector("#threat-output");
    await navigator.clipboard.writeText(output.value || "");
    copyThreat.textContent = "Kopyalandı";
    setTimeout(() => copyThreat.textContent = "Kopyala", 1400);
  });
}

const pentestChecks = [
  "Yeniden üretim adımları eksiksiz",
  "Kullanıcı rolü ve yetki seviyesi belli",
  "Request/response veya log kanıtı var",
  "Etki teknik ve iş etkisi olarak açıklanmış",
  "False positive kontrolü yapılmış",
  "Fix sonrası retest adımı yazılmış"
];

const pentestChecksEl = document.querySelector("#pentest-checks");
if (pentestChecksEl) {
  pentestChecks.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "check option-check";
    label.innerHTML = `<input type="checkbox" value="${index}"> <span>${item}</span>`;
    pentestChecksEl.append(label);
  });
}

const scorePentest = document.querySelector("#score-pentest");
if (scorePentest) {
  scorePentest.addEventListener("click", () => {
    const checked = document.querySelectorAll("#pentest-checks input:checked").length;
    const percent = Math.round((checked / pentestChecks.length) * 100);
    const level = percent >= 80 ? "Güçlü" : percent >= 50 ? "Orta" : "Zayıf";
    document.querySelector("#pentest-score").textContent = `${level} kanıt kalitesi: ${checked}/${pentestChecks.length} (${percent}%)`;
  });
}

const ragButton = document.querySelector("#run-rag-sim");
if (ragButton) {
  ragButton.addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".rag-doc:checked")].map((input) => input.value);
    const risks = [];
    if (selected.includes("secret")) risks.push("Hassas veri context'e girebilir. Document-level ACL gerekli.");
    if (selected.includes("malicious")) risks.push("Prompt injection içeren doküman instruction/data ayrımını bozabilir.");
    if (!selected.length) risks.push("Retrieval sonucu yok; yanıt kaynak göstermeden hallucination riski taşıyabilir.");
    if (selected.includes("public") && risks.length === 0) risks.push("Düşük risk: kaynak güvenilir ve public görünüyor.");
    document.querySelector("#rag-result").innerHTML = renderRisk("RAG sonucu", risks);
  });
}

const agentButton = document.querySelector("#run-agent-sim");
if (agentButton) {
  agentButton.addEventListener("click", () => {
    const permission = document.querySelector("#agent-permission").value;
    const approval = document.querySelector("#human-approval").checked;
    const validation = document.querySelector("#tool-validation").checked;
    const risks = [];
    if (permission === "admin") risks.push("Admin/API geniş yetki blast radius'u büyütür.");
    if (permission === "write") risks.push("Issue yazma yetkisi veri sızıntısı veya yanlış aksiyon riski doğurur.");
    if (!approval) risks.push("Kritik işlemde insan onayı yok.");
    if (!validation) risks.push("Tool parametreleri doğrulanmıyor; injection ve yanlış çağrı riski var.");
    if (!risks.length) risks.push("Düşük risk: yetki sınırlı, onay ve doğrulama var.");
    document.querySelector("#agent-result").innerHTML = renderRisk("Agent sonucu", risks);
  });
}

function toList(value) {
  const items = (value || "").split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "-";
}

function renderRisk(title, risks) {
  return `<strong>${title}</strong><ul>${risks.map((risk) => `<li>${risk}</li>`).join("")}</ul>`;
}
