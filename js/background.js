const images = ["bg01.jpg", "bg02.jpg", "bg03.jpg", "bg05.jpg", "bg06.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImageBox = document.querySelector(".img_wp");
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

bgImageBox.appendChild(bgImage);

const appId = "588189";
const accessKey = "RZIK2xwOOUC-Hvm3gyMQr_5nZjpKWyC-vn5OQvuyJg4";
const secretKey = "A1D8lzvUlo91O9dc8aR7pMMy7PMVBfXSrh0-0etq5-E";

// 요청할 이미지의 URL을 생성하는 함수
function getImageUrl(width, height) {
    return `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=nature&orientation=landscape&fit=clip&width=${width}&height=${height}`;
}

// 이미지를 가져와서 화면에 표시하는 함수
function fetchImage() {
    const imgWidth = 800; // 이미지의 폭
    const imgHeight = 600; // 이미지의 높이

    // 이미지 URL을 생성
    const imageUrl = getImageUrl(imgWidth, imgHeight);

    // Fetch API를 사용하여 이미지 요청 보내기
    fetch(imageUrl)
        .then(response => {
            // 응답 데이터를 JSON 형식으로 파싱
            return response.json();
        })
        .then(data => {
            // JSON 데이터에서 이미지 URL 추출
            const imageUrl = data.urls.regular;

            // 이미지를 화면에 표시
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            document.body.appendChild(imageElement);
        })
        .catch(error => {
            console.log('Error fetching image:', error);
        });
}