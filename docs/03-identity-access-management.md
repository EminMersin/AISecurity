# 03 - Identity ve Access Management

## Identity Nedir?

Identity, bir aktörün sistem tarafından tanınmasını sağlayan kimlik bilgisidir. AI sistemlerinde identity sadece insan kullanıcı değildir.

Identity türleri:

- **Human identity:** Gerçek kullanıcı hesabı.
- **Service identity:** Bir uygulama veya servis adına çalışan kimlik.
- **Workload identity:** Cloud workload veya otomasyonun kullandığı kimlik.
- **Agent identity:** AI agent akışındaki mantıksal veya teknik kimlik.
- **Managed identity:** Cloud sağlayıcının yönettiği servis kimliği.

## Access Management Nedir?

Access management, hangi identity'nin hangi kaynağa, hangi koşullarda, hangi işlem için erişebileceğini belirler.

Temel kavramlar:

- Authentication: Kim olduğunu doğrulama
- Authorization: Ne yapabileceğini belirleme
- RBAC: Role göre yetki verme
- ABAC: Attribute bazlı yetki verme
- Least privilege: Sadece gereken minimum yetki
- Just-in-time access: Geçici ve süreli yetki
- Privileged access: Yüksek etkili yönetici yetkileri

## Conditional Access

Conditional Access, erişim kararını sadece kullanıcı adı/şifreye göre değil; kullanıcı, cihaz, lokasyon, risk seviyesi, uygulama ve oturum koşullarına göre verir.

Örnek politika:

```text
Eğer kullanıcı privileged role taşıyorsa
ve yönetim paneline dış ağdan erişiyorsa
MFA zorunlu olsun
ve cihaz compliant değilse erişim engellensin.
```

AI sistemlerinde kullanım:

- Agent yönetim paneline erişimde MFA zorunlu kılma
- Tool yönetimi için sadece güvenilir cihazlardan erişim
- RAG index yönetimini privileged role ile sınırlama
- Kritik tool çağrılarını onaylı lokasyon veya güvenilir ağ ile sınırlandırma

## Agent Identity Problemi

AI agent bir kullanıcı adına mı hareket ediyor, yoksa kendi servis kimliğiyle mi çalışıyor? Bu karar güvenlik modelini doğrudan etkiler.

Karar matrisi:

| Model | Avantaj | Risk |
| --- | --- | --- |
| User delegated access | Kullanıcı yetkisi korunur | Token sızıntısı etkili olur |
| Shared service account | Basit kurulum | İzlenebilirlik zayıf, yetki fazla olabilir |
| Per-agent identity | İzlenebilir ve sınırlandırılabilir | Operasyonel yönetim gerekir |
| Just-in-time token | Yetki süresi sınırlı | Uygulama karmaşıklığı artar |

## Uygulamalı Çalışma

1. Bir AI agent için erişeceği kaynakları listeleyin.
2. Her kaynak için okuma/yazma/silme ihtiyacını ayırın.
3. Agent'ın kendi identity'si mi yoksa kullanıcı delegated yetkisi mi kullanacağını seçin.
4. Conditional Access ile hangi koşulların uygulanacağını yazın.
5. Loglarda hangi identity bilgisinin tutulacağını belirleyin.

Devam: [Lab 04 - Identity Access Senaryosu](../labs/lab-04-identity-access-senaryosu.md)
