export const isYesterday = date => {
  const objectDate = JSON.parse(date);
  console.log('we jasonified our date', objectDate);

  const dateFromDB = new Date(objectDate);
  console.log('date from DB', dateFromDB);

  const dbMonth = dateFromDB.getMonth();
  console.log('dbmonth', dbMonth);
  const dbDay = dateFromDB.getDate();
  console.log('dbDay', dbDay);

  const today = new Date();
  console.log('today', today);

  console.log(today);
  const todayMonth = today.getMonth();
  console.log('todayMonth', todayMonth);

  const todayDay = today.getDate();
  console.log('todayDay', todayDay);

  if (dbMonth === todayMonth && dbDay === todayDay - 1) {
    return true;
  } else {
    return false;
  }
};

export const isToday = date => {
  const objectDate = JSON.parse(date);
  console.log('we jasonified our date', objectDate);

  const dateFromDB = new Date(objectDate);
  console.log('date from DB', dateFromDB);

  const dbMonth = dateFromDB.getMonth();
  console.log('dbmonth', dbMonth);
  const dbDay = dateFromDB.getDate();
  console.log('dbDay', dbDay);

  const today = new Date();
  console.log('today', today);

  console.log(today);
  const todayMonth = today.getMonth();
  console.log('todayMonth', todayMonth);

  const todayDay = today.getDate();
  console.log('todayDay', todayDay);

  if (dbMonth === todayMonth && dbDay === todayDay) {
    return true;
  } else {
    return false;
  }
};
