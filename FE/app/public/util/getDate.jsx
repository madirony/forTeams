export default function getDate(updatedAt) {
  // 현재 날짜 구하기
  let today = new Date();
  let todayMillisecond = new Date().getTime();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();

  // 채팅이 올라온 날짜(비교할 날짜) 구하기
  const update = new Date(updatedAt);
  const updateMillisecond = update.getTime();
  let updateMonth = update.getMonth() + 1;
  let updateDate = update.getDate();
  let updateHour = update.getHours();
  let updateMinute = update.getMinutes();

  // 같은 날이면 시간만 표시
  if (todayMonth === updateMonth && todayDate === updateDate) {
    const chatAt = `${updateHour}:${updateMinute}`;
    return chatAt;
    // console.log(chatAt);
  } else {
    // 다른 날이면 날짜까지 표시
    const chatAt = `${updateMonth}/${updateDate} ${updateHour}:${updateMinute}`;
    return chatAt;
    // console.log(chatAt);
  }
}
