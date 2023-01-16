// inputフォーム
const taskValue = document.getElementsByClassName("task_value")[0];
const twitter_id = document.getElementById("twitter_id");

// button送信
const taskSubmit = document.getElementsByClassName("task_submit")[0];
const button = document.getElementById("store_btn");

// ul
const taskList = document.getElementsByClassName("task_list")[0];
const task_list = document.getElementById("task_list");

let del_button = document.getElementById("delete_btn");
let twitter_bg = document.getElementById("twitter_bg");
let saved_id = document.getElementById("saved_id");
const table = document.getElementById("id_table");

button.addEventListener("click", buttonClick);
button.addEventListener("click", delButtonClick);

// 登録されているIDを表示する。
let str = "";
if ((arr = JSON.parse(getJsonFromLS("twitter_id_json")))) {
  for (key in arr) {
    console.log(key + ": " + arr[key]);
    str += `<tr>
          <td>${arr[key]}</td>
        <td><button class="delete" id="delete_btn" data-id="${key}" >削除</button></td>
        </tr>`;
  }
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

  // twitter_id_jsonが存在する場合。(初回以降)
  if ((twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json")))) {
    if (twitter_id_array.includes(getTwitterIdFromForm(twitter_id))) {
      // 既存IDなら処理しない。
      return false;
    }

    // 初回利用、twitter_id_jsonが存在しない場合
  } else {
    let arr = [];
    let json = JSON.stringify(arr, undefined, 1);
    localStorage.setItem("twitter_id_json", json);
    twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json"));
  }

  // Json->Array
  twitter_id_array.push(getTwitterIdFromForm(twitter_id));
  //   console.log(getJsonFromLS("twitter_id_array" + twitter_id_array));

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

  window.location.reload();
  return false;
}

function delButtonClick() {
  alert("ddd");
}
