window.onload = function () {
  var body = document.getElementsByTagName("body");
  body[0].style.backgroundColor = "#FFFF00	";

  const elm = document.querySelector('[aria-label="プロフィール"]');
  console.log(elm.href.slice(20));
  const twitter_id = elm.href.slice(20);

  // https://twitter.com/fxxk_slot 20

  // popup.htmlのinput要素に書いたテキストを取得
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg.send);
  });
};
