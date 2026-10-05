# AI Threat Model Template

## 1. Sistem Özeti

- Sistem adı:
- Amaç:
- Kullanıcılar:
- Kritik iş akışları:
- AI/LLM kullanım amacı:

## 2. Mimari

```text
Kullanıcı -> UI -> Backend API -> Agent Orchestrator -> LLM Provider
                                      |-> Tool Server
                                      |-> Vector Database
                                      |-> Internal Data Source
```

## 3. Veri Akışları

| Akış | Kaynak | Hedef | Veri tipi | Hassasiyet | Kontrol |
| --- | --- | --- | --- | --- | --- |

## 4. Trust Boundary'ler

- Boundary 1:
- Boundary 2:
- Boundary 3:

## 5. Asset Listesi

| Asset | Neden kritik? | Sahip | Koruma ihtiyacı |
| --- | --- | --- | --- |

## 6. Identity ve Yetki Modeli

| Identity | Kaynak | Yetki | Süre | Koşul |
| --- | --- | --- | --- | --- |

## 7. Threat Actor'lar

- Dış saldırgan:
- Düşük yetkili kullanıcı:
- Kötü niyetli iç kullanıcı:
- Kompromize servis hesabı:
- Zararlı doküman kaynağı:

## 8. Abuse Case'ler

| Abuse Case | Ön koşul | Etki | Mevcut kontrol | Eksik kontrol | Test |
| --- | --- | --- | --- | --- | --- |

## 9. AI Risk Eşleştirme

| Risk | OWASP LLM | MITRE ATLAS | Kontrol | Durum |
| --- | --- | --- | --- | --- |

## 10. Test Planı

- Prompt injection testi:
- RAG poisoning testi:
- Tool abuse testi:
- Access control testi:
- Data leakage testi:
- Logging ve monitoring testi:

## 11. Kabul Kriterleri

- [ ] Kritik tool çağrıları onaylı
- [ ] Agent en düşük yetki ile çalışıyor
- [ ] RAG sonuçları kullanıcı yetkisine göre filtreleniyor
- [ ] Hassas veri maskeleme uygulanıyor
- [ ] Prompt injection testleri geçiyor
- [ ] Audit loglar kim, ne, ne zaman, hangi tool bilgilerini içeriyor
