
# AppFellas Case 
Bu proje AppFellas için hazırlanmıştır. 3. taraflı uçuş apisi kullanılarak uçuş hizmetini simüle eden bir hizmet amaçlanmıştır


## Kurulum 

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/alibarandemir/appfellas-case.git
    ```
2. Client ve server klasörüne geçip gerekli bağımlılıkları yükleyin
```bash 
  cd client
  npm install
  cd server
  npm install
```
3. Serverı başlatın 
```bash 
    cd server
    npm run start
```
3. Clienti başlatın 
```bash 
    cd client
    npm run dev
```


    
## Proje Özellikleri
- Responsive ve sade bir tasarım
- Api
- 404 not found sayfası
- Component bazlı mimari
- 

  
## Teknolojiler

**Client:** React, React-router-dom, ant-design, Tailwindcss 

**Sunucu:** Nodejs, MongoDB, expressJS

  
## Uygulama Açıklamaları

Çalışmada benden beklenilen tüm özellikler yerine getirilmiştir.
  - Anasayfada Dokümanda belirtilen apiden sağlanılan bilgiler kullanılarak uçuşlar gösterilmiştir.
  - Uçuşlar hareket yönüne ve tarihe göre filtrelenebilmektedir.(Api max 3 gün aralık verdiği için clientte bu sınırlama kullanılmıştır. Kodda yorum satırı olarak belirtilmiştir)
  - Kullanıcıya UI deneyimi açısından veriler gelirken skeleton kullanılmıştır. (Ekran görüntülerinde mevcuttur).
  - Aynı uçuş 2 kez rezervasyon yapılamamaktadır kullanıcıya hata mesajı dönüyor bunun kontrolü backendde yapılmıştır.
  - Geçmiş tarihli bir gün için rezervasyon yapılamamaktadır.
  - Uçuşlarım sayfasında rezervasyon yapılan uçuşlar gösterilmektedir.
  - Rezervasyonlu uçuşlar tarihe ve fiyata göre sıralanabilmektedir.
  - Uçuşlarım sayfasında rezervasyonlu uçuşların toplam fiyatı kullanıcıya gösterilmiştir.
  - Benden beklenen bilgiler mongodbde tutulup uçuşlarım sayfasında bu tüm bilgiler gösterilmiştir.

## Ekran Görüntüleri
![ucuslarim](https://github.com/user-attachments/assets/06897b4d-9136-435f-a1aa-b1e2fd123ec1)

![homepage](https://github.com/user-attachments/assets/19f8c2a8-482f-40bb-adb9-8c4679bdccf5)
![404page](https://github.com/user-attachments/assets/854b9050-f7e5-4a1a-bd00-0ed5586ccd4c)
![Ekran görüntüsü 2024-09-24 174959](https://github.com/user-attachments/assets/d3ed6e3f-c932-48ab-b2c6-f8ac661bb78c)

![Ekran görüntüsü 2024-09-24 175347](https://github.com/user-attachments/assets/198e7f2e-5834-4415-8d45-8e8306c7f891)


