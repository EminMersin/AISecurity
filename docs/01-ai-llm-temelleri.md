# 01 - AI ve LLM Temelleri

## Amaç

Bu bölümün amacı LLM tabanlı sistemleri güvenlik bakış açısıyla okuyabilecek temel modeli oluşturmaktır. Bir güvenlik analisti için önemli olan sadece modelin metin üretmesi değil; hangi veriyi gördüğü, hangi bağlamla karar verdiği, hangi araçlara eriştiği ve çıktısının nerede kullanıldığıdır.

## LLM Nasıl Çalışır?

Large Language Model, verilen bağlama göre bir sonraki token olasılıklarını hesaplayan bir modeldir. Model doğrudan "gerçeği" bilmez; eğitim verisinden öğrendiği örüntülerle ve verilen context ile olası çıktılar üretir.

Güvenlik açısından çıkarım:

- Model çıktısı doğrulanmadan kritik kararlarda kullanılmamalıdır.
- Prompt içine giren veri, model davranışını etkileyebilir.
- Gizli veri context'e girerse model yanıtında, loglarda veya tool çağrılarında sızabilir.

## Transformer Nedir?

Transformer, modern LLM'lerin temel mimarisidir. Self-attention mekanizması ile tokenlar arasındaki ilişkiyi hesaplar. Bu sayede model uzun metinlerdeki bağlantıları takip edebilir.

Güvenlik açısından çıkarım:

- Model, instruction ve data ayrımını her zaman güvenilir şekilde yapamaz.
- Prompt injection, modelin instruction hiyerarşisini karıştırmasından yararlanır.
- Uzun context, daha fazla saldırı yüzeyi ve daha fazla veri sızıntısı riski doğurur.

## Context Window Nedir?

Context window, modelin aynı anda işleyebildiği token sınırıdır. Prompt, sistem mesajı, kullanıcı girdisi, RAG sonuçları, tool çıktıları ve konuşma geçmişi bu pencereye girer.

Kontrol soruları:

- Context'e hangi veri kaynakları giriyor?
- RAG sonucu güvenilir mi?
- Tool çıktısı model için instruction mı, veri mi?
- Gizli bilgi context'e giriyor mu?
- Context büyüdüğünde güvenlik politikaları kayboluyor mu?

## Embedding Nedir?

Embedding, metni sayısal vektöre dönüştürür. Benzer anlamdaki metinler vektör uzayında birbirine yakın olur. RAG sistemlerinde belge arama ve benzerlik hesaplama için kullanılır.

Riskler:

- Yanlış chunking sonucu kritik bağlam kaybolabilir.
- Hassas veri vektör veritabanında kalıcı hale gelebilir.
- Retrieval sonucu saldırgan tarafından manipüle edilmiş içerik getirebilir.
- Access control uygulanmayan vector store veri sızıntısına yol açabilir.

## RAG Nedir?

RAG, Retrieval-Augmented Generation demektir. Modelin eğitim verisiyle sınırlı kalmaması için dış kaynaklardan ilgili içerik çekilir ve model context'ine eklenir.

RAG neden ortaya çıktı?

- Modelin güncel olmayan bilgisini telafi etmek
- Kurumsal dokümanları modele bağlamak
- Kaynak gösterilebilir yanıt üretmek
- Fine-tuning yerine daha esnek bilgi güncelleme sağlamak

RAG güvenlik kontrolleri:

- Belge kaynağı doğrulanmalı
- Indexleme sırasında hassas veri sınıflandırılmalı
- Retrieval sonucu kullanıcı yetkisine göre filtrelenmeli
- Prompt injection içeren dokümanlar tespit edilmeli
- Yanıtlar kaynakla eşleştirilerek doğrulanmalı

## Uygulamalı Çalışma

1. Bir metni 3 parçaya bölün.
2. Her parça için "bu parça hangi kullanıcı rolüne gösterilebilir?" sorusunu cevaplayın.
3. Aynı metin için embedding/RAG akışında nerede access control uygulanması gerektiğini işaretleyin.
4. Bir prompt injection cümlesi ekleyin ve modelin bunu instruction olarak yorumlamaması için nasıl sarmalanması gerektiğini yazın.

Devam: [Lab 02 - RAG ve Embedding](../labs/lab-02-rag-ve-embedding.md)
