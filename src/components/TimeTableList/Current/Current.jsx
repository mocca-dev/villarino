
const Current = ({ i, current, noTimeTables }) =>
  i === current &&
  !noTimeTables && <div className="next-to-arrive">Próximo en llegar</div>;

export default Current;
