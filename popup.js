// これは、popup.htmlに設定するやつ
let button = document.getElementById("store_btn");
let twitter_id = document.getElementById("twitter_id");
let saved_id = document.getElementById("saved_id");
button.addEventListener("click", buttonClick);

/**
 * 
 * @returns localstrageへ登録IDをJSONで保存する。
 */
function buttonClick() {
  if (twitter_id.value == "") {
    return false;
  }

  let str = twitter_id.value.trim();

  // ＠が文頭にあったら消す。
  renamed_id = str.replace(/^@/, "");

  let twitter_id_json = localStorage.getItem("twitter_id_json");

  // twitter_id_jsonが存在する場合。
  if (JSON.parse(twitter_id_json)) {
    let arr = JSON.parse(twitter_id_json);
    if (arr.includes(renamed_id)) {
      return;
    }
  } else {
    let array = [];
    let json = JSON.stringify(array, undefined, 1);
    localStorage.setItem("twitter_id", json);
    twitter_id_json = localStorage.getItem("twitter_id");
  }

  // Json->Array
  const twitter_id_array = JSON.parse(twitter_id_json);
  twitter_id_array.push(renamed_id);

  // Array -> Jsonで保存。
  const to_store_json = JSON.stringify(twitter_id_array);
  localStorage.setItem("twitter_id_json", to_store_json);

  // content.jsに渡す処理。
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      send: renamed_id,
    });
  });

  // input欄を空に。
  twitter_id.value = "";
  return false;
}
