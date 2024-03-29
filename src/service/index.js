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

export const fetchHoliday = async () => {
  const resp = await fetch(`/api/holidays`);
  const { status } = resp;

  if (status !== 400) {
    const data = await resp.json();
    return data;
  } else {
    return null;
  }
};

export const sendMail = async req => {
  const resp = await fetch(`/api/send-mail`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await resp.json();
  return data.status === "ok";
};
