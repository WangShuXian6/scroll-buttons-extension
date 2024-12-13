document.addEventListener('DOMContentLoaded', function() {
    const scrollDownInput = document.getElementById('scrollDown');
    const scrollUpInput = document.getElementById('scrollUp');
    const saveButton = document.getElementById('save');
    const status = document.getElementById('status');

    // 加载已保存的设置
    chrome.storage.sync.get(['scrollDownDistance', 'scrollUpDistance'], function(result) {
        scrollDownInput.value = result.scrollDownDistance || 500;
        scrollUpInput.value = result.scrollUpDistance || 500;
    });

    // 保存设置
    saveButton.addEventListener('click', function() {
        const scrollDown = parseInt(scrollDownInput.value, 10);
        const scrollUp = parseInt(scrollUpInput.value, 10);

        if (isNaN(scrollDown) || isNaN(scrollUp) || scrollDown < 0 || scrollUp < 0) {
            alert('请输入有效的滚动距离（非负整数）。');
            return;
        }

        chrome.storage.sync.set({
            scrollDownDistance: scrollDown,
            scrollUpDistance: scrollUp
        }, function() {
            status.style.display = 'block';
            setTimeout(() => {
                status.style.display = 'none';
            }, 2000);
        });
    });
});
