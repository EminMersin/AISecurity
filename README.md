# AI Security Öğrenme ve Uygulama Rehberi

Bu repo, AI security alanına girişten uygulamalı agent güvenliği ve threat modeling çalışmalarına kadar ilerleyen bir öğrenme yoludur. Amaç sadece kavramları açıklamak değil; her konu için kurulabilir araçlar, küçük laboratuvarlar, kontrol listeleri ve doğrulama çıktıları üretmektir.

GitHub Pages için hazırdır. Ana interaktif sayfa: [`index.html`](index.html)

## Hedef Kitle

- AI agent, LLM ve RAG sistemlerinin güvenlik risklerini öğrenmek isteyenler
- Identity, access management ve conditional access tarafını AI sistemleriyle ilişkilendirmek isteyenler
- Pentest raporlarını teknik olarak doğrulamak ve AI destekli analiz/advice akışını anlamak isteyenler
- AI sistemleri için threat model çıkarabilecek seviyeye gelmek isteyen güvenlik veya yazılım ekipleri

## Öğrenme Yol Haritası

1. **AI ve LLM temelleri**
   - LLM nasıl çalışır?
   - Transformer nedir?
   - Context window nedir?
   - Embedding nedir?
   - RAG nedir ve neden ortaya çıktı?

2. **AI agent mimarisi**
   - Agent, tool/function call ve workflow kavramları
   - MCP nedir?
   - Agent yetki sınırları, tool abuse ve excessive agency riskleri

3. **Identity ve access management**
   - Human identity, workload identity, service principal, managed identity
   - RBAC, least privilege, permission boundary
   - Conditional Access ve Zero Trust mantığı

4. **Pentest temelleri ve rapor doğrulama**
   - Giriş seviyesi pentest metodolojisi
   - Bulguların yeniden üretimi
   - Kanıt, etki, risk, öneri ayrımı
   - AI agent ile pentest -> analiz -> advice akışı

5. **AI threat modeling**
   - Sistem sınırları ve veri akışları
   - Trust boundary, asset, threat actor, abuse case
   - OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF eşleştirmesi

## Repo Yapısı

```text
.
├── index.html
├── README.md
├── docs/
│   ├── 01-ai-llm-temelleri.md
│   ├── 02-agent-mimarisi.md
│   ├── 03-identity-access-management.md
│   ├── 04-pentest-ve-rapor-dogrulama.md
│   ├── 05-ai-threat-modeling.md
│   └── kaynaklar.md
├── labs/
│   ├── lab-01-local-llm-agent.md
│   ├── lab-02-rag-ve-embedding.md
│   ├── lab-03-function-calling-riskleri.md
│   ├── lab-04-identity-access-senaryosu.md
│   └── lab-05-pentest-raporu-dogrulama.md
└── templates/
    ├── pentest-rapor-dogrulama-checklist.md
    └── threat-model-template.md
```


## Aktif Öğrenme Sayfaları

- `index.html`: Dashboard ve öğrenme modülü girişleri.
- `viewer.html`: Markdown içerikleri okunabilir HTML arayüzünde açar.
- `workbench.html`: Quiz, threat model canvas, pentest checker ve risk simülasyonları.
- `learn.html`: Rol bazlı öğrenme yolu, arama, kavram sözlüğü, lab senaryosu üretici ve ilerleme raporu.

## Hızlı Başlangıç

Bu site build gerektirmez. GitHub Pages ayarlarında repo root klasörünü yayın kaynağı olarak seçmek yeterlidir.

Yerelde görüntülemek için:

```bash
cd AISecurity
python3 -m http.server 8000
```

Sonra tarayıcıdan:

```text
http://localhost:8000
```

## Beklenen Çıktılar

Bu çalışmanın sonunda aşağıdaki çıktıları üretebilmelisiniz:

- AI agent mimarisi diyagramı
- Bir RAG sisteminin risk analizi
- Function/tool calling için güvenlik kontrol listesi
- Identity ve access management matrisi
- Pentest raporu doğrulama notları
- AI sistemi için threat model dokümanı

## Ana Kaynaklar

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [MITRE ATLAS](https://atlas.mitre.org/)
- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- [OWASP Web Security Testing Guide](https://wstg.owasp.org/)
- [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
- [Microsoft Entra Conditional Access](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access)
- [OpenAI Function Calling Guide](https://developers.openai.com/api/docs/guides/function-calling)
- [OpenAI Embeddings Guide](https://developers.openai.com/api/docs/guides/embeddings)
- [Model Context Protocol](https://modelcontextprotocol.io/)
