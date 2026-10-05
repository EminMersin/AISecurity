# Lab 04 - Identity ve Access Senaryosu

## Amaç

AI agent için identity ve access management modelini tasarlamak.

## Senaryo

Bir AI agent pentest raporlarını okuyacak, bulguları analiz edecek ve Jira/GitHub üzerinde issue açacak. Agent ayrıca internal wiki'den düzeltme önerileri çekecek.

## Varlıklar

- Pentest raporları
- Internal wiki
- Issue tracker
- Kullanıcı hesapları
- Agent servis hesabı
- API tokenları

## Yapılacaklar

1. Her varlık için gereken erişim seviyesini yazın.
2. Agent identity modelini seçin.
3. Role ve permission matrisini çıkarın.
4. Conditional Access kurallarını yazın.
5. Audit log alanlarını belirleyin.

## Örnek Permission Matrisi

| Identity | Kaynak | Read | Write | Delete | Koşul |
| --- | --- | --- | --- | --- | --- |
| ai-pentest-agent | Pentest raporları | Evet | Hayır | Hayır | Sadece security workspace |
| ai-pentest-agent | Issue tracker | Evet | Evet | Hayır | Human approval sonrası |
| normal-user | Pentest raporları | Hayır | Hayır | Hayır | Yetki yok |

## Beklenen Çıktı

- Identity modeli
- Permission matrisi
- Conditional Access politikaları
- Audit gereksinimleri
- Risk ve kontrol listesi
