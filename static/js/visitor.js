const tbody = document.querySelector("tbody");
const buttonGroup = document.querySelector("#button-group");

// 폼 [등록] 버튼 클릭시
// - 테이블에 데이터 추가
function createVisitor() {
  console.log("click 등록 버튼");

  // 폼 선택
  const form = document.forms["visitor-form"];
  console.dir(form);
  console.log(form.name.value); // name input 값의 value
  console.log(form.comment.value); // comment input 값의 value
  console.log(form.name.value.length); // comment input 값의 value
  if (!form.name.value.length) {
    //!false 0: boolean false 0이외:true
    alert("이름 값을 넣어주세요");
    clearInput();
    return;
  }
  if (!form.comment.value.length) {
    alert("방명록에 값을 넣어주세요");
    clearInput();
    return;
  }

  if (form.name.value.length > 10) {
    alert("이름은 10자이하로 해주세요");
    clearInput();
    return;
  }
  // name input value의 길이가 10글자 이하일 때
  axios({
    method: "POST",
    url: "/visitor/write",
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      console.log(data); // {id: 8, name: 'ㅁㅁ', comment: 'ㅁㅁ'}

      const html = `
            <tr id="tr_${data.id}">
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.comment}</td>
              <td><button type="button" onclick="editVisitor('${data.id}');">수정</button></td>
              <td><button type="button" onclick="deleteVisitor(this, '${data.id}');">삭제</button></td>
            </tr>`;

      // 테이블에 추가된 정보를 "바로" 보여주기
      // data 객체에 담긴 값을 이용해서 tbody 태그의 자식으로 tr 한줄이 추가되는 코드
      // js: insertAdjacentHTML() -> 특정 요소에 html 코드 추가 가능
      // vs. innerHTML(): 기존 html 코드 지우고 덮어씌움
      // jquery: append()
      tbody.insertAdjacentHTML("beforeend", html); // ver.js
      // $('tbody').append(html); // ver. jquery
      clearInput();
    });
}

// 테이블에서 [수정]버튼 클릭시
// -(1) form input에 각각 이름과 방명록 값을 넣기
// -(2) [변경], [취소] 버튼 대체
async function editVisitor(id) {
  console.log("edit visitor!!!");
  console.log(id); //현재 행에대한 id(pk)
  // -(1) form input에 각각 이름과 방명록 값을 넣기
  // axios 응답 결과를 result 변수에 담고자 함(->동기처리가 필요)
  // 응답처리를 받고 result
  // (result 변수에 한 명에 대한 정보를 담아야 하니까)
  // ->axios처리를 기다렸다가 result라는 변수에 담아야함(동기처리)
  // ->async/await
  // await를 만나 프로미스가 처리될 때까지 기다려줌
  // axios작업을 기다려야
  // await async는세트
  let reault = await axios({
    method: "GET",
    url: `/visitor/get?id=${id}`,
  }).then((res) => {
    console.log("1: ", res.data);
    return res.data;
  });
  console.log("'2 방문자하나 조회 결과: ", reault);
  // {id: 1, name: '홍수정', comment: '내가 왔다'}

  // input버튼에 나타나도록
  const form = document.forms["visitor-form"];
  form.name.value = reault.name;
  form.comment.value = reault.comment;

  // -(2) [변경], [취소] 버튼 대체
  const html = `
        <button type = "button" onclick="editDo(${id});">변경</button>
        <button type = "button" onclick="editCancel();">취소</button>`;
  buttonGroup.innerHTML = html;
}
// 변경 버튼클릭
// -데ㅣ터 변경
function editDo(id) {
  const form = document.forms["visitor-form"];

  axios({
    method: "PATCH",
    url: "/visitor/edit",
    data: {
      id: id,
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      alert(data); //alert(''수정성공!!'')
      // // in jQuery
      // $(`#tr_${id}:nth-child(2)`).text(form.name.value);
      // $(`#tr_${id}:nth-child(3)`).text(form.comment.value);
      // children안에도 값을 넣을 수 있어
      // 요소의값에서 td선택할껀데 텍스트를 폼에 입력한 값으로 바꾸고

      // in JS

      const children = document.querySelector(`#tr_${id}`).children; //배열 크기 4 (tr 5개)
      console.log(children);
      children[1].textContent = form.name.value; //name
      children[2].textContent = form.comment.value; //comment

      // 취소 버튼 클릭시와 동일한 동작
      // -input초기화
      // 등록버튼 보이기
      editCancel();
    });
}
// [취소] 버튼 클릭시
// -input초기화
// -[등록] 버튼 보이기
function editCancel() {
  console.log("edit cancel");
  const html = `
        <button type="button" onclick="createVisitor();">등록</button>`;
  buttonGroup.innerHTML = html;
  // (1) input초기화
  clearInput();
}
// 삭제함수
function deleteVisitor(obj, id) {
  if (!confirm("정말 삭제하시겠습니까?")) {
    return;
  }
  console.log("click 삭제 버튼");
  console.log(obj);
  console.log(id);

  axios({
    method: "DELETE",
    url: "/visitor/delete",
    data: {
      id: id,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      alert(data); // alert('삭제 성공!!')

      // obj: 삭제버튼 자기자신
      // obj.parentElement.parentElement.remove();
      // closest() 메서드
      obj.closest(`#tr_${id}`).remove(); // 더 간편 ver
    });
}

// input초기화
function clearInput() {
  const form = document.forms["visitor-form"];
  form.name.value = "";
  form.comment.value = "";
}
