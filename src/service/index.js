export const fetchTimeTables = async (req) => {
  // const { timeId, way, seasson, dayOfWeek } = req;
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
  // const resp = await fetch(`/api/holidays`);
  // const { status } = resp;
  const status = 200;
  const data = [
    {
      motivo: 'Año Nuevo',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo',
      dia: 1,
      mes: 1,
      id: 'año-nuevo',
    },
    {
      motivo: 'Carnaval',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Carnaval',
      dia: 12,
      mes: 2,
      id: 'carnaval',
    },
    {
      motivo: 'Carnaval',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Carnaval',
      dia: 13,
      mes: 2,
      id: 'carnaval',
    },
    {
      motivo: 'Día Nacional de la Memoria por la Verdad y la Justicia',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_Nacional_de_la_Memoria_por_la_Verdad_y_la_Justicia',
      dia: 24,
      mes: 3,
      id: 'memoria-verdad-justicia',
    },
    {
      motivo: 'Viernes Santo Festividad Cristiana',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Viernes_Santo',
      dia: 29,
      mes: 3,
      id: 'viernes-santo',
    },
    {
      motivo: 'Feriado Puente Turístico',
      tipo: 'puente',
      info: 'https://es.wikipedia.org/wiki/Puente_festivo',
      dia: 1,
      mes: 4,
      id: 'puente-turistico',
    },
    {
      motivo: 'Día del Veterano y de los Caídos en la Guerra de Malvinas',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_del_Veterano_y_de_los_Ca%C3%ADdos_en_la_Guerra_de_Malvinas',
      dia: 2,
      mes: 4,
      id: 'veteranos-malvinas',
    },
    {
      motivo: 'Día del Trabajador',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_Internacional_de_los_Trabajadores',
      dia: 1,
      mes: 5,
      id: 'trabajador',
    },
    {
      motivo: 'Día de la Revolución de Mayo',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo',
      dia: 25,
      mes: 5,
      id: 'revolucion-mayo',
    },
    {
      motivo: 'Paso a la Inmortalidad del Gral. Don Martín Güemes',
      tipo: 'trasladable',
      original: '17-06',
      info: 'https://es.wikipedia.org/wiki/Mart%C3%ADn_Miguel_de_G%C3%BCemes',
      dia: 17,
      mes: 6,
      id: 'martin-guemes',
    },
    {
      motivo: 'Paso a la Inmortalidad del General Manuel Belgrano',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Bandera_(Argentina)',
      dia: 20,
      mes: 6,
      id: 'belgrano',
    },
    {
      motivo: 'Feriado Puente Turístico',
      tipo: 'puente',
      info: 'https://es.wikipedia.org/wiki/Puente_festivo',
      dia: 21,
      mes: 6,
      id: 'puente-turistico',
    },
    {
      motivo: 'Día de la Independencia',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Declaraci%C3%B3n_de_independencia_de_la_Argentina',
      dia: 9,
      mes: 7,
      id: 'independencia',
    },
    {
      motivo: 'Paso a la Inmortalidad del General José de San Martín',
      tipo: 'trasladable',
      original: '17-08',
      info: 'https://es.wikipedia.org/wiki/Jos%C3%A9_de_San_Mart%C3%ADn',
      dia: 19,
      mes: 8,
      id: 'san-martin',
    },
    {
      motivo: 'Feriado Puente Turístico',
      tipo: 'puente',
      info: 'https://es.wikipedia.org/wiki/Puente_festivo',
      dia: 11,
      mes: 10,
      id: 'puente-turistico',
    },
    {
      motivo: 'Día del Respeto a la Diversidad Cultural',
      tipo: 'trasladable',
      original: '12-10',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_del_Respeto_a_la_Diversidad_Cultural_(Argentina)',
      dia: 12,
      mes: 10,
      id: 'diversidad',
    },
    {
      motivo: 'Día de la Soberanía Nacional',
      tipo: 'trasladable',
      original: '20-11',
      info: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Soberan%C3%ADa_Nacional',
      dia: 18,
      mes: 11,
      id: 'soberania-nacional',
    },
    {
      motivo: 'Inmaculada Concepción de María',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Inmaculada_Concepci%C3%B3n',
      dia: 8,
      mes: 12,
      id: 'inmaculada-maria',
    },
    {
      motivo: 'Navidad',
      tipo: 'inamovible',
      info: 'https://es.wikipedia.org/wiki/Navidad',
      dia: 25,
      mes: 12,
      id: 'navidad',
    },
  ];

  if (status !== 400) {
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
