export const isYesterday = date => {
  const objectDate = JSON.parse(date);

  const dateFromDB = new Date(objectDate);
  const dbMonth = dateFromDB.getMonth();
  const dbDay = dateFromDB.getDate();

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  if (dbMonth === todayMonth && dbDay === todayDay - 1) {
    return true;
  } else {
    return false;
  }
};

export const isToday = date => {
  const objectDate = JSON.parse(date);

  const dateFromDB = new Date(objectDate);
  const dbMonth = dateFromDB.getMonth();
  const dbDay = dateFromDB.getDate();

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  if (dbMonth === todayMonth && dbDay === todayDay) {
    return true;
  } else {
    return false;
  }
};
