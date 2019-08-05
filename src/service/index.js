export const fetchTimeTables = async req => {
  const { timeId, way, seasson, dayofweek } = req;
  const resp = await fetch(
    `http://localhost:5000/timetables/${timeId}/${way}/${seasson}/${dayofweek}`
  );
  const { status } = resp;

  if (status !== 400) {
    const data = await resp.json();
    return { status, data };
  } else {
    return { status, data: [] };
  }
};
