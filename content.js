// 获取滚动距离配置，默认值为500
chrome.storage.sync.get(['scrollDownDistance', 'scrollUpDistance'], function(result) {
    const scrollDownDistance = result.scrollDownDistance || 500;
    const scrollUpDistance = result.scrollUpDistance || 500;

    // 创建向下滚动按钮
    const downButton = document.createElement('div');
    downButton.id = 'scroll-down-button';
    downButton.innerHTML = '&#x25BC;'; // 向下箭头
    downButton.title = '向下滚动';
    document.body.appendChild(downButton);

    // 创建向上滚动按钮
    const upButton = document.createElement('div');
    upButton.id = 'scroll-up-button';
    upButton.innerHTML = '&#x25B2;'; // 向上箭头
    upButton.title = '向上滚动';
    document.body.appendChild(upButton);

    // 点击事件处理
    downButton.addEventListener('click', () => {
        window.scrollBy({ top: scrollDownDistance, left: 0, behavior: 'smooth' });
    });

    upButton.addEventListener('click', () => {
        window.scrollBy({ top: -scrollUpDistance, left: 0, behavior: 'smooth' });
    });

    // 拖动功能
    makeDraggable(downButton);
    makeDraggable(upButton);
});

// 拖动函数
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    element.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = element.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            element.style.left = `${initialLeft + deltaX}px`;
            element.style.top = `${initialTop + deltaY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = 'auto';
        }
    });
}
