# 02 - AI Agent Mimarisi

## Agent Nedir?

AI agent, bir hedefe ulaşmak için LLM çıktısını planlama, araç kullanma, dış sistemlerden veri alma ve adım adım karar verme akışıyla birleştiren sistemdir.

Basit agent döngüsü:

```text
Kullanıcı hedefi -> Planlama -> Tool seçimi -> Tool çağrısı -> Sonuç analizi -> Yeni adım veya final yanıt
```

## Function Calling / Tool Calling

Function calling, modelin doğrudan dış sisteme bağlanması değil; modelin yapılandırılmış bir tool çağrısı önermesidir. Uygulama bu çağrıyı doğrular, çalıştırır ve sonucu modele geri verir.

Güvenlik ilkeleri:

- Tool parametreleri schema ile sınırlandırılmalı
- Modelin önerdiği çağrı doğrudan güvenilir kabul edilmemeli
- Kritik işlemlerde human-in-the-loop kullanılmalı
- Tool sonucu untrusted data olarak işlenmeli
- Tool izinleri agent bazında en düşük yetki ile verilmeli

## MCP Nedir?

Model Context Protocol, AI uygulamalarının araçlara, kaynaklara ve dış sistemlere standart bir protokol üzerinden bağlanmasını hedefler. MCP, entegrasyonları düzenli hale getirir; fakat aynı zamanda yeni bir trust boundary oluşturur.

MCP riskleri:

- MCP server aşırı yetkili olabilir
- Tool açıklamaları prompt injection için kullanılabilir
- Resource erişimleri kullanıcı yetkisine göre filtrelenmeyebilir
- Agent, hangi tool'un güvenilir olduğunu ayırt edemeyebilir
- Loglarda hassas veri kalabilir

## Agent Güvenlik Soruları

- Agent hangi tool'lara erişebiliyor?
- Tool çağrıları kim adına yapılıyor?
- Agent kendi yetkisiyle mi, kullanıcı yetkisiyle mi işlem yapıyor?
- Tool çıktısı modele nasıl sunuluyor?
- Agent'ın işlem geçmişi nerede loglanıyor?
- Kritik aksiyonlar için onay mekanizması var mı?

## Pentest -> Analiz -> Advice Akışı

AI agent ile güvenlik analiz akışı şu şekilde tasarlanabilir:

1. **Pentest input:** Bulgular, kanıtlar, endpointler, payloadlar, ekran görüntüleri.
2. **Normalize etme:** Bulguyu başlık, etki, yeniden üretim adımı, kanıt ve öneri alanlarına ayırma.
3. **Doğrulama:** Kanıt yeterli mi, etki teknik olarak doğru mu, false positive olasılığı var mı?
4. **Risk eşleştirme:** OWASP, CVSS, MITRE ATLAS veya kurumsal risk matrisiyle eşleştirme.
5. **Advice üretme:** Geliştiriciye uygulanabilir teknik öneri, test adımı ve acceptance criteria yazma.

## Uygulamalı Çalışma

Bir agent için aşağıdaki tabloyu doldurun:

| Tool | Ne yapar? | Hangi yetki gerekir? | Kötüye kullanım senaryosu | Kontrol |
| --- | --- | --- | --- | --- |
| web_search | Dış kaynak arar | İnternet erişimi | Zararlı içeriği kaynak kabul eder | Kaynak allowlist |
| ticket_create | Ticket açar | Issue yazma | Yanlış ekip veya gizli veri | Onay ve veri maskeleme |
| shell_exec | Komut çalıştırır | Sistem erişimi | Komut enjeksiyonu | Sandbox ve denylist |

Devam: [Lab 03 - Function Calling Riskleri](../labs/lab-03-function-calling-riskleri.md)
