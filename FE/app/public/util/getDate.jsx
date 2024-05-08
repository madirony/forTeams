export default function getDate(updatedAt) {
  // 현재 날짜 구하기
  const today = new Date();
  const todayMillisecond = new Date().getTime();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  // 채팅이 올라온 날짜 구하기
  const update = new Date(updatedAt);
  const updateMillisecond = update.getTime();
  const updateMonth = update.getMonth() + 1;
  const updateDate = update.getDate();

  // 채팅이 올라온 시간을 구해 두 자리로 표시하기
  const tempHour = update.getHours();
  const updateHour = tempHour.toString().padStart(2, "0");
  const tempMinute = update.getMinutes();
  const updateMinute = tempMinute.toString().padStart(2, "0");

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
