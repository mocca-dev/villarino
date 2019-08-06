export const fetchTimeTables = async req => {
  const { timeId, way, seasson, dayOfWeek } = req;
  const resp = await fetch(
    `http://localhost:5000/api/timetables/${timeId}/${way}/${seasson}/${dayOfWeek}`
  );
  const { status } = resp;

  if (status !== 400) {
    const data = await resp.json();
    return { status, data };
  } else {
    return { status, data: [] };
  }
};
