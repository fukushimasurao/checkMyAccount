// これは、popup.htmlに設定するやつ
let button = document.getElementById("store_btn");
let twitter_id = document.getElementById("twitter_id");
let twitter_bg = document.getElementById("twitter_bg");
let saved_id = document.getElementById("saved_id");
const table = document.getElementById("id_table");

button.addEventListener("click", buttonClick);

// 登録されているIDを表示する。
let str = "";
if ((arr = JSON.parse(getJsonFromLS("twitter_id_json")))) {
  arr.forEach(function (ele) {
    str += `<tr><td>${ele}</td></tr>`;
  });
  table.innerHTML = str;
}

/**
 * Formに入力された文字列をよしなに修正
 * @param {str} twitter_id formに入力されたID
 * @returns str
 */
function getTwitterIdFromForm(twitter_id) {
  return twitter_id.value.trim().replace(/^@/, "");
}

/**
 * localStorageから取得
 * @param {str} name
 * @returns
 */
function getJsonFromLS(name) {
  return localStorage.getItem(name);
}

/**
 * LocalStorageへ登録IDをJSONで保存する。
 * @returns bool
 */
function buttonClick() {
  // 空白なら処理しない。
  if (twitter_id.value == "") {
    return false;
  }
  // TODO
  // 色も剃りする

  // ＠が文頭にあったら消す。
  console.log(getTwitterIdFromForm(twitter_id));
  console.log(getJsonFromLS("twitter_id_json"));
  // twitter_id_jsonが存在する場合。
  if ((twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json")))) {
    if (twitter_id_array.includes(getTwitterIdFromForm(twitter_id))) {
      // 既存IDなら処理しない。
      return false;
    }
  } else {
    let arr = [];
    let json = JSON.stringify(arr, undefined, 1);
    localStorage.setItem("twitter_id_json", json);
    twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json"));
  }

  // Json->Array
  twitter_id_array.push(getTwitterIdFromForm(twitter_id));

  // 画面に表示
  //   twitter_id_array.forEach(function (ele) {
  //     str += `<tr><td>${ele}</td></tr>`;
  //   });
  //   table.innerHTML = str;

  //テーブル要素の一番下に追加する形にする。

  // Array -> Jsonで保存。
  const to_store_json = JSON.stringify(twitter_id_array);
  localStorage.setItem("twitter_id_json", to_store_json);

  // content.jsに渡す処理。
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      send: to_store_json,
    });
  });

  // input欄を空に。
  twitter_id.value = "";
  return false;
}
