export const fetchTimeTables = async (req) => {
  const { timeId, way, seasson, dayOfWeek } = req;
  // const resp = await fetch(
  //   `/api/timetables/${timeId}/${way}/${seasson}/${dayOfWeek}`
  // );
  // const { status } = resp;
  const status = 200;
  // const data = await resp.json();
  const data = {
    timetables: [
      '00:00',
      '00:20',
      '00:40',
      '10:00',
      '10:20',
      '10:40',
      '11:00',
      '11:20',
      '11:40',
      '12:00',
      '12:20',
      '12:40',
      '13:00',
      '13:20',
      '13:40',
      '14:00',
      '14:20',
      '14:40',
      '15:00',
      '15:20',
      '15:40',
      '16:00',
      '16:20',
      '16:40',
      '17:01',
      '17:20',
      '17:40',
      '18:00',
      '18:20',
      '18:40',
      '19:00',
      '19:20',
      '19:40',
      '20:00',
      '20:20',
      '20:40',
      '21:00',
      '21:20',
      '21:40',
      '22:00',
      '22:20',
      '22:40',
      '23:00',
      '23:20',
      '23:40',
    ],
  };

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

export const sendMail = async (req) => {
  const resp = await fetch(`/api/send-mail`, {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await resp.json();
  return data.status === 'ok';
};
