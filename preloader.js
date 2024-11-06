const

counter = 1,  //кол-во пикселей, которое проходит лого за кадр
speed = 1,  //частота кадров
widthDvd = 250,   //ширина лого
developeMode = true, //режим отладки 
blendTime = 1,    //время пропадания прелоадера после загрузки контента
drunk = 0,    //"пьяное" перемещение лого, где 0 - это выкл, любое другое положительное число - воздействие
logoSrc = 'img/dvd-vec-crop.svg',   //путь к изображению лого (относительный)
bgSrc = 'img/bg.jpg',    //путь к изображению фона (относительный)
gradientSettings = {
    gradientColors: ['blue', 'black', 'green'], //цвета градиента
    gradientRange: 'top'    //направление градиента
}


const relativePath = document.currentScript.src,
dvdContain = document.createElement('div');
dvdContain.style.position = 'fixed';
dvdContain.style.width = '100vw';
dvdContain.style.height = '100vh';
dvdContain.style.opacity = '1';
dvdContain.style.transition = `opacity ${blendTime}s, background-position ${drunk}s`;
dvdContain.style.backdropFilter = 'blur(10px)';
let bgSettings = `url(${new URL(logoSrc, relativePath).href}) 0/${widthDvd}px no-repeat, linear-gradient(to ${gradientSettings.gradientRange}, `;
for (let i = 0; i < gradientSettings.gradientColors.length; i++) {
    bgSettings += `${(gradientSettings.gradientColors[i]) + ((i + 1 == gradientSettings.gradientColors.length) ? '' : ', ')}`;
}
bgSettings += `), url(${new URL(bgSrc, relativePath).href}) center/cover #000`;
console.log(bgSettings);
dvdContain.style.background = bgSettings;
dvdContain.style.backgroundBlendMode = 'difference';
dvdContain.style.top = 0;
dvdContain.style.left = 0;
document.body.appendChild(dvdContain);
document.body.style.position = 'fixed';


let positionX = 0,
positionY = 0,
invertX = invertY = false;

function moving() {
    positionX += (invertX ? -1 : 1) * counter;
    positionY += (invertY ? -1 : 1) * counter;

    invertX = (positionX > dvdContain.offsetWidth - widthDvd) ? true : (positionX < 0) ? false : invertX;
    invertY = (positionY > dvdContain.offsetHeight - (widthDvd / 2)) ? true : ((positionY < 0)) ? false : invertY;

    dvdContain.style.backgroundPosition = `${positionX}px ${positionY}px, center, center`;
    
}

setInterval(() => {requestAnimationFrame(moving)}, speed);


if (!developeMode) {
    document.addEventListener('DOMContentLoaded',() => {
        dvdContain.style.opacity = '0';
        document.body.style.position = 'static';
        setTimeout(() => {
            dvdContain.style.display = 'none';
            document.body.removeChild(dvdContain);
        }, blendTime * 1000)
    })
}