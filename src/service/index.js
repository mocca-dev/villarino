export const fetchTimeTables = async req => {
  const { timeId, way, seasson, dayOfWeek } = req;
  const resp = await fetch(
    `/api/timetables/${timeId}/${way}/${seasson}/${dayOfWeek}`
  );
  const { status } = resp;
  const data = await resp.json();
  if (status !== 400) {
    return { status, data };
  } else {
    const { error } = data;
    return { status, data: { timetables: [], error } };
  }
};
