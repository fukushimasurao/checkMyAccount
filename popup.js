// https://codelikes.com/javascript-localstorage/#toc13
// 参考

// inputフォーム
// const taskValue = document.getElementsByClassName("task_value")[0];
const t_id = document.getElementById("twitter_id");

// button送信
const taskSubmit = document.getElementById("store_btn");

// ul
const taskList = document.getElementById("task_list");

/**
 * Formに入力された文字列をよしなに修正
 * @param {str} twitter_id formに入力されたID
 * @returns str
 */
function trimID(t_id) {
  return t_id.value.trim().replace(/^@/, "");
}
// 追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  const twitter_id = trimID(t_id);
  addTasks(twitter_id);
  t_id.value = "";
});

// 追加ボタンを作成
const addTasks = (twitter_id) => {
  console.log("ddddddddd");
  //idが空白なら処理終了
  if (twitter_id == "") {
    return false;
  }

  // twitter_id_jsonが存在する場合。(初回以降)
  const alert = document.getElementById("alert");
  if ((twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json")))) {
    if (twitter_id_array.includes(twitter_id)) {
      // 既存IDなら処理しない。
      console.log("alert: ", alert);
      alert.innerHTML = "登録済みです。";
      return false;
    } else {
      alert.innerHTML = "";
    }

    // 初回利用、twitter_id_jsonが存在しない場合
  } else {
    let arr = [];
    let json = JSON.stringify(arr, undefined, 1);
    localStorage.setItem("twitter_id_json", json);
    twitter_id_array = JSON.parse(getJsonFromLS("twitter_id_json"));
  }

  // Json->Array
  twitter_id_array.push(twitter_id);

  // Array -> Jsonで保存。
  const to_store_json = JSON.stringify(twitter_id_array);
  localStorage.setItem("twitter_id_json", to_store_json);
  console.log("twitter_id_array" + localStorage.getItem("twitter_id_json"));

  // content.jsに渡す処理。
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      send: to_store_json,
    });
  });

  // 入力したタスクを追加・表示
  const listItem = document.createElement("li");
  const showItem = taskList.appendChild(listItem);
  showItem.innerHTML = twitter_id;

  // タスクに削除ボタンを付与
  const deleteButton = document.createElement("button");
  deleteButton.className = "del_btn";
  deleteButton.innerHTML = "削除";
  listItem.appendChild(deleteButton);

  // 削除ボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });

  //   window.location.reload();
  return false;
};

if ((twitter_id = JSON.parse(localStorage.getItem("twitter_id_json")))) {
  console.log("twitter_id_jsonあるよ");
  console.log(twitter_id);
  console.log(localStorage.removeItem(twitter_id[1]));

  for (key in twitter_id) {
    // 入力したタスクを追加・表示

    console.log(twitter_id[key]);
    console.log(key);
    const listItem = document.createElement("li");
    const showItem = taskList.appendChild(listItem);
    showItem.innerHTML = twitter_id[key];

    // タスクに削除ボタンを付与
    const deleteButton = document.createElement("button");
    deleteButton.className = "del_btn";
    deleteButton.innerHTML = "削除";
    listItem.appendChild(deleteButton);

    // 削除ボタンをクリックし、イベントを発動（タスクが削除）
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteTasks(deleteButton);
      localStorage.removeItem(twitter_id[key]);
    });
  }
}

// 削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest("li");
  taskList.removeChild(chosenTask);
};
