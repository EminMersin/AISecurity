# 05 - AI Threat Modeling

## Amaç

AI threat modeling, AI sisteminin nasıl çalıştığını, hangi varlıkları koruduğunu, hangi aktörlerle etkileştiğini ve hangi saldırı yollarına açık olduğunu sistematik şekilde analiz eder.

## Minimum Çıktılar

Bir AI threat model dokümanı şu bölümleri içermelidir:

- Sistem amacı
- Mimari özet
- Veri akışları
- Trust boundary'ler
- Asset listesi
- Identity ve yetki modeli
- Threat actor listesi
- Abuse case listesi
- Risk senaryoları
- Mevcut kontroller
- Eksik kontroller
- Test planı
- Kabul kriterleri

## AI Sistemlerinde Trust Boundary

Örnek boundary'ler:

- Kullanıcı arayüzü ile backend API arası
- Backend ile LLM provider arası
- Agent ile tool server arası
- RAG pipeline ile vector database arası
- MCP client ile MCP server arası
- Kurumsal veri kaynakları ile retrieval katmanı arası

## Asset Listesi

Korunması gereken varlıklar:

- Kullanıcı verisi
- API key ve tokenlar
- Sistem promptları
- Tool izinleri
- RAG dokümanları
- Vector database içeriği
- Agent işlem logları
- Pentest raporları
- Kimlik ve erişim politikaları

## Threat Actor Örnekleri

- Yetkisiz dış kullanıcı
- Düşük yetkili iç kullanıcı
- Kötü niyetli doküman yükleyici
- Kompromize servis hesabı
- Aşırı yetkili agent
- Supply chain üzerinden gelen zararlı tool veya MCP server

## AI Odaklı Abuse Case Örnekleri

| Abuse Case | Etki | Kontrol |
| --- | --- | --- |
| Prompt injection ile tool çağrısını yönlendirme | Yetkisiz işlem | Tool allowlist, onay, parametre doğrulama |
| RAG dokümanına zararlı instruction ekleme | Yanlış karar veya veri sızıntısı | İçerik tarama, kaynak güveni, instruction/data ayrımı |
| Agent identity ile fazla yetkili API çağrısı | Yetki yükseltme | Least privilege, scoped token |
| Vector store içinde hassas veri arama | Veri sızıntısı | Row/document level access control |
| MCP server üzerinden gizli kaynak okuma | Kurumsal veri sızıntısı | MCP server izin modeli ve audit |

## Framework Eşleştirme

- **OWASP LLM Top 10:** LLM uygulama risklerini kategorize etmek için kullanılır.
- **MITRE ATLAS:** AI sistemlerine yönelik adversary tekniklerini analiz etmek için kullanılır.
- **NIST AI RMF:** Govern, Map, Measure, Manage fonksiyonlarıyla risk yönetimi çerçevesi sağlar.
- **OWASP Threat Modeling Cheat Sheet:** Genel threat modeling sürecini yapılandırmak için kullanılır.

## Uygulamalı Çalışma

Bir AI pentest analiz agenti için threat model çıkarın:

1. Agent hangi girdileri alıyor?
2. Hangi tool'ları çağırıyor?
3. Hangi raporlara veya hassas verilere erişiyor?
4. Agent hangi identity ile işlem yapıyor?
5. Prompt injection nereden gelebilir?
6. RAG veya MCP kullanılıyorsa hangi boundary'ler oluşuyor?
7. En kötü 5 abuse case nedir?
8. Her abuse case için kontrol ve test adımı yazın.

Şablon: [Threat Model Template](../templates/threat-model-template.md)
