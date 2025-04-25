// --- 資料庫 ---
// 這裡我們用一個簡單的 JavaScript 物件來模擬資料庫
// 鍵 (key) 是搜尋詞 (小寫)，值 (value) 是包含圖片 URL 的陣列
const artData = {
    "梵谷": [
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", title: "星夜 (Starry Night)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/528px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg", title: "自畫像 (Self-Portrait)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/486px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg", title: "向日葵 (Sunflowers)" }
    ],
    "莫內": [
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/600px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg", title: "印象·日出 (Impression, soleil levant)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg/600px-Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg", title: "睡蓮 (Water Lilies)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Claude_Monet_-_Monet%27s_garden_at_Argenteuil.jpg/600px-Claude_Monet_-_Monet%27s_garden_at_Argenteuil.jpg", title: "阿讓特伊花園 (Monet's garden at Argenteuil)" }
    ],
    "印象派": [ // 包含多位畫家的作品
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/600px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg", title: "印象·日出 (莫內)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pierre-Auguste_Renoir_-_Bal_du_moulin_de_la_Galette_-_Google_Art_Project.jpg/600px-Pierre-Auguste_Renoir_-_Bal_du_moulin_de_la_Galette_-_Google_Art_Project.jpg", title: "煎餅磨坊的舞會 (雷諾瓦)" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", title: "星夜 (梵谷 - 後印象派)" }, // 雖然梵谷是後印象派，但常被一起提及
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/600px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg", title: "舞蹈課 (竇加)" }
    ],
    "畢卡索": [
        { url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/491px-Les_Demoiselles_d%27Avignon.jpg", title: "亞維農的少女 (Les Demoiselles d'Avignon)" },
        { url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/800px-PicassoGuernica.jpg", title: "格爾尼卡 (Guernica)" }
    ],
    "立體派": [
        { url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/491px-Les_Demoiselles_d%27Avignon.jpg", title: "亞維農的少女 (畢卡索)" },
        { url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Juan_Gris_-_Portrait_of_Picasso_-_Google_Art_Project.jpg/488px-Juan_Gris_-_Portrait_of_Picasso_-_Google_Art_Project.jpg", title: "畢卡索肖像 (胡安·格里斯)" }
    ],
    // --- 你可以在這裡添加更多畫家或畫風 ---
    // "畫家名稱小寫": [ { url: "圖片網址1", title: "圖片標題1" }, { url: "圖片網址2", title: "圖片標題2" }, ... ],
    // "畫風名稱小寫": [ { url: "圖片網址1", title: "圖片標題1" }, { url: "圖片網址2", title: "圖片標題2" }, ... ],
};

// --- 程式邏輯 ---
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultImage = document.getElementById('resultImage');
const messageArea = document.getElementById('messageArea');
const imageInfo = document.getElementById('imageInfo'); // 獲取顯示圖片資訊的元素

searchButton.addEventListener('click', searchArt);
searchInput.addEventListener('keypress', function(event) {
    // 允許按 Enter 鍵觸發搜尋
    if (event.key === 'Enter') {
        searchArt();
    }
});

function searchArt() {
    const searchTerm = searchInput.value.trim().toLowerCase(); // 獲取輸入值，去除前後空白，轉為小寫

    // 清空上次結果
    resultImage.style.display = 'none'; // 隱藏圖片
    resultImage.src = ""; // 清除圖片來源
    imageInfo.textContent = ""; // 清除圖片資訊
    messageArea.textContent = ""; // 清除訊息

    if (!searchTerm) {
        messageArea.textContent = "請輸入畫家或畫風名稱。";
        return; // 如果沒輸入，就停止執行
    }

    // 在 artData 中查找匹配的鍵
    if (artData.hasOwnProperty(searchTerm)) {
        const images = artData[searchTerm]; // 獲取對應的圖片陣列

        if (images && images.length > 0) {
            // 隨機選擇一張圖片
            const randomIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomIndex]; // 獲取包含 url 和 title 的物件

            // 顯示圖片和資訊
            resultImage.src = selectedImage.url;
            resultImage.alt = `${searchTerm} 的隨機圖片：${selectedImage.title}`; // 設定替代文字
            resultImage.style.display = 'block'; // 顯示圖片
            messageArea.textContent = ""; // 清空提示訊息
            imageInfo.textContent = selectedImage.title; // 顯示圖片標題

        } else {
            // 理論上如果 key 存在，陣列不應為空，但以防萬一
             messageArea.textContent = `找到 "${searchInput.value}" 的分類，但沒有可用的圖片。`;
        }
    } else {
        // 如果找不到匹配的鍵
        messageArea.textContent = `抱歉，找不到關於 "${searchInput.value}" 的圖片。請嘗試其他關鍵字 (例如：梵谷, 印象派)。`;
        imageInfo.textContent = ""; // 清除圖片資訊
    }
}